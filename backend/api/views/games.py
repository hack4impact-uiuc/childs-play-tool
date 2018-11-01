from api.models import db, Game, Ranking
from api.core import create_response, Mixin, logger
from flask import Blueprint, request, current_app as app
import xlrd
import math
import json
import requests
import re
from difflib import SequenceMatcher
from collections import defaultdict

games_page = Blueprint("games", __name__)

GLOBAL_POST_URL = "/"
GAMES_URL = "/games"
GAMES_ID_URL = "/games/<int:game_id>"

SYMPTOM_NUMBER = 6
AGE_NUMBER = 2
FULL_COLUMN_NUMBER = 5
NUMBER_RANKINGS = 25


@games_page.route(GAMES_URL, methods=["GET"])
def get_games():

    # age, symptom required
    # system optional
    data = request.args

    if data.get("age") is None or data.get("symptom") is None:
        return create_response(status=400, message="Age and symptom are required")

    age = data["age"]
    symptom = data["symptom"]

    rankings = Ranking.query.filter(Ranking.symptom == symptom, Ranking.age == age)
    if rankings.count() == 0:
        return create_response(
            status=400, message="No appropriate games for the specified age and symptom"
        )

    if "system" in data:
        system = data["system"]
        rankings = rankings.filter(Ranking.system == system)
        if rankings.count() == 0:
            return create_response(
                status=400,
                message="This system has no appropriate games for the specified age and symptom",
            )

        ranked_games = (
            db.session.query(
                Game.name,
                Game.id,
                Game.description,
                Game.thumbnail,
                Game.image,
                Game.gender,
                Ranking.rank,
            )
            .join(Ranking)
            .filter(
                Ranking.system == system, Ranking.symptom == symptom, Ranking.age == age
            )
            .order_by(Ranking.rank)
            .all()
        )

        ranked_games = [
            dict(zip(ranked_game.keys(), ranked_game)) for ranked_game in ranked_games
        ]

        return create_response(status=200, data={"games": {system: ranked_games}})

    else:
        systems = {}
        for system in Game.system.type.enums:
            ranked_games_by_system = (
                db.session.query(
                    Game.name,
                    Game.id,
                    Game.description,
                    Game.thumbnail,
                    Game.image,
                    Game.gender,
                    Ranking.rank,
                )
                .join(Ranking)
                .filter(
                    Ranking.system == system,
                    Ranking.symptom == symptom,
                    Ranking.age == age,
                )
                .order_by(Ranking.rank)
                .all()
            )
            systems[system] = [
                dict(zip(ranked_game.keys(), ranked_game))
                for ranked_game in ranked_games_by_system
            ]

        return create_response(status=200, data={"games": systems})


@games_page.route(GAMES_ID_URL, methods=["GET"])
def get_game_specific(game_id):
    game = Game.query.filter(Game.id == game_id)
    if game.count() == 0:
        return create_response(status=400, message="Game not found")
    else:
        return create_response(data={"game": game.first().to_dict()})


@games_page.route(GAMES_URL, methods=["POST"])
def post_games():
    if "file" not in request.files:
        return create_response(status=400, message="File not provided")
    db.drop_all()
    db.create_all()
    file = request.files["file"]
    book = xlrd.open_workbook(file_contents=file.read())

    # Entering the games into database
    id = 0
    for sheet in book.sheets():
        # Each sheet has the system name at the top
        system = sheet.cell(0, 1).value
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
                name = str(sheet.cell(current_row, 2 * age_index + 1).value)
                # Iterates through the rankings of a specific symptom and category until the end
                while name != "":
                    # Checks if the game has already been entered into the database
                    same_game = Game.query.filter(
                        Game.name == name, Game.system == system
                    )
                    if same_game.count() == 0:
                        game = {}
                        game["system"] = system
                        game["name"] = name
                        game["gender"] = sheet.cell(
                            current_row, 2 * age_index + 2
                        ).value
                        game["id"] = id
                        id = id + 1
                        # API extra information stuff
                        extra_data = get_giantbomb_data(name)
                        game["thumbnail"] = extra_data["thumbnail"]
                        game["image"] = extra_data["image"]
                        game["description"] = extra_data["description"]
                        g = Game(game)
                        db.session.add(g)
                    current_row += 1
                    # Breaks out of the loop if we have reached the end of the sheet
                    if current_row == sheet.nrows:
                        break
                    name = str(sheet.cell(current_row, 2 * age_index + 1).value)
                # If the sheet only has one age category
                if sheet.ncols < FULL_COLUMN_NUMBER:
                    count += 2
                    db.session.commit()
                    break
                # If we are on the first age category, reset row to beginning row of the age category
                if age_index == 0:
                    current_row = initial_row
                count += 1
                db.session.commit()

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
                    system_symptom_age = sheet.cell(start_row, 1 + 2 * age_index).value
                    if system_symptom_age == "Oculus Rift (Short Term) - 13 and Above":
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
                        )
                        if len(name) != 0:
                            game_id = Game.query.filter(Game.name == name).first().id
                            ranking_id = id
                            id = id + 1
                            ranking = {}
                            ranking["id"] = ranking_id
                            ranking["age"] = age
                            ranking["system"] = system
                            ranking["symptom"] = symptom
                            ranking["game_id"] = game_id
                            ranking["rank"] = rank
                            r = Ranking(ranking)
                            db.session.add(r)
    db.session.commit()
    return create_response(status=201, message="Database updated")


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

    gb_data = requests.get(url=gb_url, params=gb_params, headers=headers).json()
    if gb_data.text == "mock":
        return gb_dict

    if len(gb_data["results"]) != 0:
        best_match = gb_data["results"][0]
        best_similarity = 0
        # look for closest match
        for result in gb_data["results"]:
            similarity = SequenceMatcher(
                None, game_name.lower(), result["name"].lower()
            ).ratio()
            if similarity > best_similarity:
                best_match = result
                best_similarity = similarity
        if best_match["deck"] is not None:
            gb_dict["description"] = best_match["deck"]
        if best_match["image"]["icon_url"] is not None:
            gb_dict["thumbnail"] = best_match["image"]["icon_url"]
        if best_match["image"]["small_url"] is not None:
            gb_dict["image"] = best_match["image"]["small_url"]

    while (
        gb_dict["description"] == ""
        and gb_dict["image"] == ""
        and gb_dict["thumbnail"] == ""
        and modified_name != ""
    ):
        # remove last word and retry
        split_modified = modified_name.split(" ")
        remove_last = ""
        for i in range(len(split_modified) - 1):
            remove_last = remove_last + split_modified[i] + " "
        modified_name = remove_last.strip()

        gb_params["query"] = modified_name
        gb_data = requests.get(url=gb_url, params=gb_params, headers=headers).json()

        if len(gb_data["results"]) != 0:
            best_match = gb_data["results"][0]
            best_similarity = 0
            for result in gb_data["results"]:
                # look for closest match
                similarity = SequenceMatcher(
                    None, game_name.lower(), result["name"].lower()
                ).ratio()
                if similarity > best_similarity:
                    best_match = result
                    best_similarity = similarity
            if best_match["deck"] is not None:
                gb_dict["description"] = best_match["deck"]
            if best_match["image"]["icon_url"] is not None:
                gb_dict["thumbnail"] = best_match["image"]["icon_url"]
            if best_match["image"]["small_url"] is not None:
                gb_dict["image"] = best_match["image"]["small_url"]
    return gb_dict


def simplify_name(search_name):
    modified_search = re.sub("[\(\[].*?[\)\]]", "", search_name)
    modified_search = modified_search.strip()
    punctuations = "`~!@#$%^&*()_-+={[}]|\:;'<,>.?/"
    no_punct = ""
    for char in modified_search:
        if char not in punctuations:
            no_punct = no_punct + char
    modified_search = no_punct
    return modified_search
