from api.models import db, Game, Ranking
from api.core import create_response, serialize_list, Mixin, logger
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
        
        #rankings = db.session.query(Ranking.rank, Ranking.game_id).order_by(Ranking.rank).filter(Ranking.system == system, Ranking.age == age, Ranking.symptom == symptom).subquery()
        #rankings = db.sessionn.query(Ranking.rank, Ranking.game_id).filter(Ranking.system == system, Ranking.age == age, Ranking.symptom == symptom).order_by(Ranking.rank)
        # rankings = rankings.subquery()
        # games = db.session.query(Game.name, Game.gender).filter(Game.system == system).subquery()
        # ranked_games = games.join(rankings)
        # logger.info(type(ranked_games))
        # logger.info(type(rankings))
        q = db.session.query(Game, Ranking).join(Ranking).filter(Ranking.system == system).all()
        print(q)
        #ranked_games = ranked_games.order_by(rank);
        '''
        for g in games:
            r = Ranking.query.filter(Ranking.game_id == g.id)
            ranked_games.append(r[0])
            ranked_games.sort(key=lambda x: x.rank, reverse=True)
            '''          
    return create_response(status=200, data={"games": serialize_list(q)})


@games_page.route(GAMES_ID_URL, methods=["GET"])
def get_game_specific(game_id):
    #game = Game.query.filter()
    game = Game.query.filter(Game.id == game_id)
    if game.count() == 0:
        return create_response(status=400, message="Game not found")
    else:
        #return create_response(data={"game": serialize_list(game)})
        return create_response(data={"game": serialize_list(game)})
