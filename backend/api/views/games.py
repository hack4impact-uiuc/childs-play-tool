from api.models import db, Game, Ranking
from api.core import create_response, serialize_list, Mixin, logger
from flask import Blueprint, request
import xlrd
import math

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
            db.session.query(Game.name, Game.gender, Ranking.rank)
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
                db.session.query(Game.name, Game.gender, Ranking.rank)
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
    print(game.first())
    if game.count() == 0:
        return create_response(status=400, message="Game not found")
    else:
        return create_response(data={"game": serialize_list(game)[0]})

@games_page.route(GAMES_URL, methods=["POST"])
def post_games():
    if 'file' not in request.files:
        return create_response(status=400, message="File not provided")
    db.drop_all()
    db.create_all()
    file = request.files["file"]
    book = xlrd.open_workbook(file_contents=file.read())

    # Entering the games into database
    id = 0
    for sheet in book.sheets():
        # Each sheet has the system name at the top
        system = sheet.cell(0,1).value
        count = 0
        current_row = 0
        # Exit out of the while loop when it has iterated through all categories on the page
        # SYMPTOM_NUMBER = 6
        while (count != 2 * SYMPTOM_NUMBER):
            #Iterate through white space to where the ranking begins, at ranking = 1
            while (sheet.cell(current_row, 0).value != 1):
                current_row += 1
            initial_row = current_row
            # Iterates through the two age categories that are side by side in the spread sheet
            # AGE_NUMBER = 2
            for age_index in range(AGE_NUMBER):
                name = str(sheet.cell(current_row, 2 * age_index + 1).value)
                # Iterates through the rankings of a specific symptom and category until the end
                while (name != ""):
                    # Checks if the game has already been entered into the database
                    same_game = Game.query.filter(Game.name == name, Game.system == system)
                    if (same_game.count() == 0):
                        game = {}
                        game["system"] = system
                        game["name"] = name
                        game["gender"] = sheet.cell(current_row, 2 * age_index + 2).value
                        game["id"] = id
                        id = id + 1
                        # API extra information stuff
                        extra_data = get_giantbomb_data(name, system)
                        game["thumbnail"] = extra_data["thumbnail"]
                        game["image"] = extra_data["image"]
                        game["description"] = extra_data["description"]
                        g = Game(game)
                        db.session.add(g)
                    current_row += 1
                    # Breaks out of the loop if we have reached the end of the sheet
                    if (current_row == sheet.nrows):
                        break
                    name = str(sheet.cell(current_row, 2 * age_index + 1).value)
                # If the sheet only has one age category
                if (sheet.ncols < FULL_COLUMN_NUMBER):
                    count += 2
                    db.session.commit()
                    break
                # If we are on the first age category, reset row to beginning row of the age category
                if (age_index == 0):
                    current_row = initial_row
                count += 1
                db.session.commit()
            
    #Entering the rankings into the database
    id = 0
    for sheet in book.sheets():
        system = sheet.cell(0,1).value
        start_row = 0       
        for symptom_index in range(SYMPTOM_NUMBER):
            start_row = start_row + 1
            while sheet.cell(start_row, 0).value != "Rank":
                start_row = start_row + 1    
            for age_index in range(AGE_NUMBER):              
                if 1 + 2 * age_index < sheet.ncols and len(sheet.cell(start_row, 1 + 2 * age_index).value) != 0:
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
                        name = str(sheet.cell(start_row + 1 + game_index, 1 + 2 * age_index).value)
                        if (len(name) != 0):
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
