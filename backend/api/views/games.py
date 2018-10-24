from api.models import db, Game, Ranking
from api.core import create_response, serialize_list, Mixin, logger
from flask import Blueprint, request, jsonify
import json
import requests
from keys import keys
from collections import defaultdict
import base64

games_page = Blueprint("games", __name__)

GLOBAL_POST_URL = "/"
GAMES_URL = "/games"
GAMES_ID_URL = "/games/<int:game_id>"

@games_page.route(GAMES_URL, methods=["GET"])
def get_games():

    get_giantbomb_data('Minecraft','PlayStation Vita')
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

def get_giantbomb_data(game_name, game_system):
    headers =   {
        'User-Agent' : 'childs-play',
    }
    gb_url = "http://www.giantbomb.com/api/search/?"
    gb_params = {'api_key': keys['api_key'], 
                'resources': 'game', 
                'query': game_name,
                'field_list' : 'name,image,api_detail_url,id,platforms,deck',
                'format' : 'json'}
    gb_dict = {}
    gb_data = requests.get(url=gb_url, params=gb_params, headers=headers).json()
    if len(gb_data['results']) == 0:
        return gb_dict
    for result in gb_data['results']:
        if game_name.lower() == result['name'].lower():
            for platform in result['platforms']:
                if game_system.lower() == platform['name'].lower():
                    gb_dict['description'] = result['deck']
                    gb_dict['thumbnail'] = result['image']['icon_url']
                    gb_dict['image']= result['image']['small_url']
                    #gb_dict['thumbnail'] = base64.b64encode(requests.get(icon_url)).json()
                    #gb_dict['image'] = base64.b64encode(requests.get(small_url)).json()
                    print(gb_dict)
                    return gb_dict

    #      Our systems          Giantbomb systems
    # "PlayStation Vita", same
    # "Xbox One", same
    # "PlayStation 4", same
    # "Nintendo Switch", same
    # "Nintendo 3DS", same
    # "Apple iOS", "iPhone"
    # "Android", same
    # "PlayStation VR", None
    # "HTC VIVE", None
    # "Oculus Rift", None

# @games_page.route(GLOBAL_POST_URL, methods["POST"])
# def post_game():
#     data = request.get_json()
#     # requires age, symptom, system, gender
#     gb_data = requests.get(url)