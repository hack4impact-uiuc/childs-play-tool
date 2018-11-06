from api.models import db, Game, Ranking
from api.core import create_response, serialize_list, Mixin, logger
from flask import Blueprint, request, jsonify
import json
import requests
from collections import defaultdict
from sqlalchemy import func


search_page = Blueprint("search_page", __name__)

SEARCH_GAMES_URL = "/search/games"


@search_page.route(SEARCH_GAMES_URL, methods=["GET"])
def search_game_by_name():
    data = request.args
    all_empty = True

    if data.get("name") is None:
        return create_response(status=400, message="Title of game is required")
    name = data.get("name")
    games = Game.query.filter(func.lower(Game.name).contains(name.lower()))
    systems = {}
    for system in Game.system.type.enums:
        games_by_system = games.filter(Game.system == system).all()
        if len(games_by_system) != 0:
            systems[system] = [game.to_dict() for game in games_by_system]
            all_empty = False
    if all_empty:
        return create_response(
            status=400, message="No games available with specified name"
        )

    return create_response(status=200, data={"games": systems})
