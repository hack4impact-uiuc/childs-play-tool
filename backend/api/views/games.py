from api.models import db, Game, Ranking
from api.core import create_response, serialize_list, Mixin, logger
from flask import Blueprint, request, jsonify
import json
import xlrd

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
    book = xlrd.open_workbook(file)
    for sheet_index in range(len(book.sheets)):
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
    return create_response(status=201, message="Database updated")