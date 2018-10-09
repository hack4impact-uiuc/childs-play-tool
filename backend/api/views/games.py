from api import app, db
from api.models import Game
from api.utils import create_response, row_constructor
from api.auth_tokens import token_required
from flask import Blueprint, request, jsonify
import json
from collections import defaultdict


mod = Blueprint("games", __name__)

GLOBAL_POST_URL = "/"
GAMES_URL = "/games"
GAMES_ID_URL = "/games/<int:game_id>"


@app.route(GAMES_URL, methods=["GET"])
def get_games():

    # age, ailment required
    # system optional
    data = request.args

    system = data["system"]
    age = data["age"]
    ailment = data["ailment"]

    if age is None or ailment is None:
        return create_response(status=400, message="Age and ailment are required")

    games = Game.query.filter(Game.ailment == ailment, Game.age == age)
    if games.count() == 0:
        return create_response(
            status=400, message="No appropriate games for the specified age and ailment"
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
                    message="No appropriate games for the specified age, ailment, and system",
                )
    return create_response({"games": [g.to_dict() for g in games]})


@app.route(GAMES_ID_URL, methods=["GET"])
def get_game_specific():
    game = Game.query.filter(Game.id == id)
    if game.count() == 0:
        return create_response(status=400, message="Game not found")
    else:
        return create_response({"game": [g.to_dict() for g in games]})
