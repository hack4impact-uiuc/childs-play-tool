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
    NUMBER_RANKING = 25
    NUMBER_CATEGORIES = 12
    BEGIN_SPACE = 3
    CATEGORY_SPACE = 28
    i = 0
    for sheet in book.sheets():
        system = sheet.cell(0,1).value
        count = 0
        current_row = 0
        while (count != 12):
            while (sheet.cell(current_row, 0).value != 1):
                current_row += 1
            initial_row = current_row
            for age_index in range(2):
                name = sheet.cell(current_row, 2 * age_index + 1).value
                while (name != ""):
                    same_game = Game.query.filter(Game.name == name, Game.system == system)
                    if (same_game.count() == 0):
                        # extra_data = get_giantbomb_data(name, system)
                        game = {}
                        game["system"] = system
                        game["name"] = name
                        game["gender"] = sheet.cell(current_row, 2 * age_index + 2).value
                        game["id"] = i
                        i = i + 1
                        # game["thumbnail"] = extra_data["thumbnail"]
                        # game["image"] = extra_data["image"]
                        # game["description"] = extra_data["description"]
                        g = Game(game)
                        print(game["id"])
                        db.session.add(g)
                    current_row += 1
                    if (current_row == sheet.nrows):
                        break
                    name = sheet.cell(current_row, 2 * age_index + 1).value
                if (sheet.ncols < 5):
                    count += 2
                    db.session.commit()
                    break
                if (age_index == 0):
                    current_row = initial_row
                count += 1
                db.session.commit()
                
        '''
        add games
        '''
        i = 0
        for sheet in book.sheets():
            system = sheet.cell(0,1).value
            start_row = 0        
            for symptom_index in range(6):
                for age_index in range(2):
                    start_row = start_row + 1
                    while sheet.cell(2 + 28 * symptom_index, 1 + 2 * age_index).value != "Rank":
                        start_row = start_row + 1                    
                    #print("system index")
                    if 1 + 2 * age_index < sheet.ncols and len(system_symptom_age = sheet.cell(start_row, 1 + 2 * age_index).value) != 0:
                        system_symptom_age = sheet.cell(start_row, 1 + 2 * age_index).value
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
                        for game_index in range(25):
                            #print(game_index)
                            #print(3 + 28 * symptom_index + game_index)
                            #print(sheet.cell(3 + 28 * symptom_index + game_index, 1 + 2 * age_index).value)
                            #print("rank index")
                            rank = int(sheet.cell(start_row + 1 + game_index, 0).value)
                            #print("name index")
                            name = sheet.cell(start_row + 1 + game_index, 1 + 2 * age_index).value
                            if (len(name) != 0):
                                game_id = Game.query.filter(Game.name == name).first().id                    
                                #print("put id")
                                ranking_id = i
                                i = i + 1
                                ranking = {}
                                ranking["id"] = ranking_id
                                ranking["age"] = age
                                ranking["system"] = system
                                ranking["symptom"] = symptom
                                ranking["game_id"] = game_id
                                ranking["rank"] = rank
                                r = Ranking(ranking)
                                db.session.add(r)
                                print(ranking["id"])
        '''
        for each grouping of 25 (unique):
            for each game:
                if game not in database:
                    use helper method on game name & system to get description, image, etc.
                    (get_giantbomb_data(name, system))
                    create Game object
                    db.add(game)
            db.commit()
            for each game:
                find Game object with same name and system using query
                create Ranking object
                db.add(ranking)
            db.commit() (maybe)
        '''
    db.session.commit()
    return create_response(status=201, message="Database updated")
