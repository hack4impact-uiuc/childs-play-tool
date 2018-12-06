from api.models import db, Game, Ranking, Update
from api.core import create_response, Mixin, Auth
from flask import Blueprint, request, current_app as app
import xlrd
import math
import json
import requests
import re
from difflib import SequenceMatcher
from collections import defaultdict
from datetime import datetime

games_page = Blueprint("games", __name__)

GLOBAL_POST_URL = "/"
GAMES_URL = "/games"
GAMES_ID_URL = "/games/<int:game_id>"
GAMES_ALL_URL = "/games/all"
GAMES_INCOMPLETE_URL = "/games/incomplete"

SYMPTOM_NUMBER = 6
AGE_NUMBER = 2
FULL_COLUMN_NUMBER = 5
NUMBER_RANKINGS = 25


@games_page.route(GAMES_URL, methods=["GET"])
@Auth.authenticate
def get_games():

    # age, symptom required
    # system optional
    data = request.args

    age = data.get("age")
    symptom = data.get("symptom")

    if age is None or symptom is None:
        return create_response(status=400, message="Age and symptom are required.")

    ranked_games = (
        db.session.query(
            Game.id,
            Game.name,
            Game.system,
            Game.gender,
            Game.description,
            Game.thumbnail,
            Game.image,
            Game.current,
            Ranking.rank,
        )
        .join(Ranking)
        .filter(Ranking.symptom == symptom, Ranking.age == age)
        .order_by(Ranking.rank)
    )

    if ranked_games.count() == 0:
        return create_response(
            status=400, message="No matching games for the specified age and symptom."
        )

    system = data.get("system")
    if system is not None:
        ranked_games = ranked_games.filter(Game.system == system)
        gender = data.get("gender")
        if gender is not None:
            if gender == "Male" or gender == "Female":
                ranked_games = ranked_games.filter(
                    (Game.gender == gender) | (Game.gender == "Both")
                )
            else:
                ranked_games = ranked_games.filter(Game.gender == gender)
            if ranked_games.count() == 0:
                return create_response(
                    status=400,
                    message="This system has no matching games for the specified age, symptom, and gender.",
                )
        if ranked_games.count() == 0:
            return create_response(
                status=400,
                message="This system has no matching games for the specified age and symptom.",
            )
        ranked_games_dict = [
            get_game_dict(ranked_game) for ranked_game in ranked_games.all()
        ]
        return create_response(status=200, data={"games": {system: ranked_games_dict}})

    else:
        gender = data.get("gender")
        if gender is not None:
            if gender == "Male" or gender == "Female":
                ranked_games = ranked_games.filter(
                    (Game.gender == gender) | (Game.gender == "Both")
                )
            else:
                ranked_games = ranked_games.filter(Game.gender == gender)
            if ranked_games.count() == 0:
                return create_response(
                    status=400,
                    message="No matching games for the specified age, symptom, and gender.",
                )
        if ranked_games.count() == 0:
            return create_response(
                status=400,
                message="No matching games for the specified age and symptom.",
            )
        systems = {}
        for system in Game.system.type.enums:
            ranked_games_by_system = ranked_games.filter(Game.system == system)
            if ranked_games_by_system.count() > 0:
                systems[system] = [
                    get_game_dict(ranked_game)
                    for ranked_game in ranked_games_by_system.all()
                ]
        return create_response(status=200, data={"games": systems})


@games_page.route(GAMES_ID_URL, methods=["GET"])
@Auth.authenticate
def get_game_specific(game_id):
    game = Game.query.filter(Game.id == game_id)
    if game.count() == 0:
        return create_response(status=400, message="Game not found.")
    else:
        return create_response(data={"game": get_game_dict(game.first())})


@games_page.route(GAMES_ALL_URL, methods=["GET"])
@Auth.authenticate
def get_games_all():
    systems = {}
    for system in Game.system.type.enums:
        games_by_system = (
            Game.query.filter(Game.system == system).order_by(Game.name).all()
        )
        if len(games_by_system) > 0:
            systems[system] = [get_game_dict(game) for game in games_by_system]
    return create_response(status=200, data={"games": systems})


@games_page.route(GAMES_URL, methods=["POST"])
@Auth.authenticate
def post_games():
    try:
        file = request.files.get("file")
        if file is None:
            update = {}
            update["time"] = datetime.now()
            update["valid"] = False
            u = Update(update)
            db.session.add(u)
            db.session.commit()
            return create_response(status=400, message="File not provided.")
        book = xlrd.open_workbook(file_contents=file.read())
        # Entering the games into database
        id = 0
        # dictionary to store ids of current games and tags of old games
        game_info_dict = {}
        for sheet in book.sheets():
            # Each sheet has the system name at the top
            system = str(sheet.cell(0, 1).value).strip()
            game_info_dict[system] = {}
            count = 0
            current_row = 0
            # Exit out of the while loop when it has iterated through all categories on the page
            # SYMPTOM_NUMBER = 6
            while count != 2 * SYMPTOM_NUMBER:
                # Iterate through white space to where the ranking begins, at ranking = 1
                while sheet.cell(current_row, 0).value != 1:
                    current_row += 1
                initial_row = current_row
                # Iterates through the two age categories that are side by side in the spread sheet
                # AGE_NUMBER = 2
                for age_index in range(AGE_NUMBER):
                    name = str(sheet.cell(current_row, 2 * age_index + 1).value).strip()
                    # Iterates through the rankings of a specific symptom and category until the end
                    while name != "":
                        # Checks if the game has already been found
                        if name.lower() not in game_info_dict[system]:
                            game = {}
                            game["system"] = system
                            game["name"] = name
                            game["gender"] = str(
                                sheet.cell(current_row, 2 * age_index + 2).value
                            ).strip()
                            game["id"] = id
                            # API extra information stuff
                            extra_data = get_giantbomb_data(name)
                            game["thumbnail"] = extra_data["thumbnail"]
                            game["image"] = extra_data["image"]
                            game["description"] = extra_data["description"]
                            game["current"] = True
                            g = Game(game)
                            db.session.add(g)
                            game_info_dict[system][name.lower()] = {"id": id}
                            id = id + 1
                        current_row += 1
                        # Breaks out of the loop if we have reached the end of the sheet
                        if current_row == sheet.nrows:
                            break
                        name = str(
                            sheet.cell(current_row, 2 * age_index + 1).value
                        ).strip()
                    # If the sheet only has one age category
                    if sheet.ncols < FULL_COLUMN_NUMBER:
                        count += 2
                        break
                    # If we are on the first age category, reset row to beginning row of the age category
                    if age_index == 0:
                        current_row = initial_row
                    count += 1
        # query returns previous state
        old_games = db.session.query(Game).all()
        for old_game in old_games:
            # if game has not been found in new spreadsheet
            if old_game.name.lower() not in game_info_dict[old_game.system]:
                old_game_dict = old_game.to_dict()
                old_game_dict["id"] = id
                old_game_dict["current"] = False
                id = id + 1
                # define tags for ranking purposes
                game_info_dict[old_game.system][old_game.name.lower()] = {
                    "ages": [
                        age[0]
                        for age in db.session.query(Ranking.age)
                        .distinct(Ranking.age)
                        .filter(Ranking.game_id == old_game.id)
                        .all()
                    ],
                    "symptoms": [
                        symptom[0]
                        for symptom in db.session.query(Ranking.symptom)
                        .distinct(Ranking.symptom)
                        .filter(Ranking.game_id == old_game.id)
                        .all()
                    ],
                }
                g = Game(old_game_dict)
                db.session.add(g)
        # delete before flushing
        db.session.query(Ranking).delete()
        db.session.query(Game).delete()
        # flushing pushes changes to database but does not persist them
        db.session.flush()
        # Entering the rankings into the database
        id = 0
        for sheet in book.sheets():
            system = sheet.cell(0, 1).value
            start_row = 0
            for symptom_index in range(SYMPTOM_NUMBER):
                start_row = start_row + 1
                while sheet.cell(start_row, 0).value != "Rank":
                    start_row = start_row + 1
                for age_index in range(AGE_NUMBER):
                    if (
                        1 + 2 * age_index < sheet.ncols
                        and len(sheet.cell(start_row, 1 + 2 * age_index).value) != 0
                    ):
                        system_symptom_age = sheet.cell(
                            start_row, 1 + 2 * age_index
                        ).value
                        if (
                            system_symptom_age
                            == "Oculus Rift (Short Term) - 13 and Above"
                        ):
                            symptom = "Bored (Short Term)"
                            age = "13 and Older"
                        else:
                            descriptors = system_symptom_age.split("-")
                            symptom = descriptors[1].strip()
                            if symptom == "Pain Management":
                                symptom = "Pain"
                            elif symptom == "Calming":
                                symptom = "Anxiety/Hyperactivity"
                            elif symptom == "Cheering":
                                symptom = "Sadness"
                            elif symptom == "Fuzzy":
                                symptom = "Cognitive Impairment"
                            age = descriptors[2].strip()
                            if age == "13 and Above":
                                age = "13 and Older"
                        for game_index in range(NUMBER_RANKINGS):
                            rank = int(sheet.cell(start_row + 1 + game_index, 0).value)
                            name = str(
                                sheet.cell(
                                    start_row + 1 + game_index, 1 + 2 * age_index
                                ).value
                            ).strip()
                            if len(name) != 0:
                                # fetch id from dict
                                game_id = game_info_dict[system][name.lower()]["id"]
                                ranking = {}
                                ranking["id"] = id
                                ranking["age"] = age
                                ranking["symptom"] = symptom
                                ranking["game_id"] = game_id
                                ranking["rank"] = rank
                                r = Ranking(ranking)
                                db.session.add(r)
                                id = id + 1
        # iterate through all games defined as "old" (not current)
        old_games = db.session.query(Game).filter(Game.current == False).all()
        for old_game in old_games:
            old_game_dict = old_game.to_dict()
            # create rankings behind all other for all age/symptom combinations
            for age in game_info_dict[old_game.system][old_game.name.lower()]["ages"]:
                for symptom in game_info_dict[old_game.system][old_game.name.lower()][
                    "symptoms"
                ]:
                    ranking = {}
                    ranking["id"] = id
                    ranking["age"] = age
                    ranking["symptom"] = symptom
                    ranking["game_id"] = old_game_dict["id"]
                    ranking["rank"] = 26
                    r = Ranking(ranking)
                    db.session.add(r)
                    id = id + 1
        db.session.commit()
        return create_response(status=201, message="Database updated.")
    except:
        db.session.rollback()
        update = {}
        update["time"] = datetime.now()
        update["valid"] = False
        u = Update(update)
        db.session.add(u)
        db.session.commit()
        return create_response(status=400, message="Invalid file format.")


def get_giantbomb_data(game_name):
    headers = {"User-Agent": "childs-play"}
    gb_url = "http://www.giantbomb.com/api/search/?"
    modified_name = simplify_name(game_name)
    gb_params = {
        "api_key": app.config["GIANTBOMB_KEY"],
        "resources": "game",
        "query": modified_name,
        "field_list": "name,image,api_detail_url,id,platforms,deck",
        "format": "json",
    }

    gb_dict = {}
    gb_dict["description"] = ""
    gb_dict["thumbnail"] = ""
    gb_dict["image"] = ""
    should_remove = False
    while (
        gb_dict["description"] == ""
        and gb_dict["image"] == ""
        and gb_dict["thumbnail"] == ""
        and modified_name != ""
    ):
        # remove last word and retry
        if should_remove:
            split_modified = modified_name.split(" ")
            modified_name = " ".join(split_modified[:-1])
            gb_params["query"] = modified_name
        gb_data = requests.get(url=gb_url, params=gb_params, headers=headers).json()

        if len(gb_data["results"]) != 0:
            best_match = gb_data["results"][0]
            best_similarity = 0
            for result in gb_data["results"]:
                # look for closest match
                similarity = SequenceMatcher(
                    None, simplify_name(game_name.lower()), result["name"].lower()
                ).ratio()
                if similarity > best_similarity:
                    best_match = result
                    best_similarity = similarity
            if best_match["deck"] is not None:
                gb_dict["description"] = best_match["deck"]
            if best_match["image"]["small_url"] is not None:
                image_url = best_match["image"]["small_url"]
                gb_dict["image"] = image_url
                gb_dict["thumbnail"] = image_url.replace("small", "tiny", 1)
        should_remove = True
    return gb_dict


def simplify_name(search_name):
    modified_search = re.sub("[\(\[].*?[\)\]]", "", search_name)
    modified_search = modified_search.strip().lower()
    if "edition" in modified_search:
        if ":" in modified_search:
            modified_search = modified_search[0 : modified_search.rfind(":")]
        elif "-" in modified_search:
            modified_search = modified_search[0 : modified_search.rfind("-")]
    if "for " in modified_search and modified_search.rfind("for ") != 0:
        modified_search = modified_search[0 : modified_search.rfind("for ")]
    punctuations = "`~!@#$%^&*()_-+={[}]|\:;'<,>.?/"
    no_punct = ""
    for char in modified_search:
        if char not in punctuations:
            no_punct = no_punct + char
    modified_search = no_punct
    return modified_search.strip()


def get_game_dict(game):
    try:
        game_dict = game._asdict()
    except:
        game_dict = game.to_dict()
    ages = [
        age[0]
        for age in db.session.query(Ranking.age)
        .distinct(Ranking.age)
        .filter(Ranking.game_id == game_dict["id"])
        .all()
    ]
    symptoms = [
        symptom[0]
        for symptom in db.session.query(Ranking.symptom)
        .distinct(Ranking.symptom)
        .filter(Ranking.game_id == game_dict["id"])
        .all()
    ]
    tags = {}
    tags["ages"] = ages
    tags["symptoms"] = symptoms
    game_dict["tags"] = tags
    return game_dict


@games_page.route(GAMES_ID_URL, methods=["PUT"])
@Auth.authenticate
def edit_game(game_id):
    game = Game.query.get(game_id)
    if game is None:
        return create_response(status=400, message="Game not found")
    data = request.form

    if data is None:
        return create_response(status=400, message="No changes made")

    # Edit the description, image, and thumbnail
    description = data.get("description")
    image = data.get("image")
    thumbnail = data.get("thumbnail")

    if description is not None:
        game.description = description
        db.session.commit()

    if image is not None:
        game.image = image
        db.session.commit()

    if thumbnail is not None:
        game.thumbnail = thumbnail
        db.session.commit()
    # DO NOT REMOVE PRINT STATEMENT
    print(game)

    return create_response(
        data={"game": get_game_dict(game)}, message="Game successfully edited"
    )


@games_page.route(GAMES_INCOMPLETE_URL, methods=["GET"])
@Auth.authenticate
def get_incomplete_games():
    systems = {}
    for system in Game.system.type.enums:
        missing_description = Game.query.filter(
            Game.system == system, Game.description == ""
        )
        missing_image = Game.query.filter(Game.system == system, Game.image == "")
        games_by_system = (
            missing_description.union(missing_image).order_by(Game.name).all()
        )
        if len(games_by_system) > 0:
            systems[system] = [get_game_dict(game) for game in games_by_system]
    return create_response(status=200, data={"games": systems})
