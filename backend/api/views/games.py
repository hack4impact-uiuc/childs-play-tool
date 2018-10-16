from api.models import Game, Ranking
from api.core import create_response, serialize_list
#from api.auth_tokens import token_required
from flask import Blueprint, request, jsonify
import json
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

    system = data["system"]
    age = data["age"]
    symptom = data["symptom"]

    if age is None or symptom is None:
        return create_response(status=400, message="Age and symptom are required")

    games = Game.query.filter(Game.symptom == symptom, Game.age == age)
    if games.count() == 0:
        return create_response(
            status=400, message="No appropriate games for the specified age and symptom"
        )
    if system is not None:
        games_by_system = Game.query.filter(Game.system == system)
        if games_by_system.count() == 0:
            return create_response(
                status=400, message="No appropriate games for this system"
            )
        else:
            games = games.intersect(games_by_system)
            if games.count() == 0:
                return create_response(
                    status=400,
                    message="No appropriate games for the specified age, symptom, and system",
                )
    return create_response(status=200, data={"games": [g.to_dict() for g in games]})


@games_page.route(GAMES_ID_URL, methods=["GET"])
def get_game_specific(game_id):
    game = Game.query.filter(Game.id == game_id)
    print(game)
    if game.count() == 0:
        return create_response(status=400, message="Game not found")
    else:
        return create_response(status=200, data={"game": serialize_list(game)})
