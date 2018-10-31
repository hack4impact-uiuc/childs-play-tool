from api.models import db, Game, Ranking
from api.core import create_response, serialize_list, Mixin, logger
from flask import Blueprint, request, jsonify
import json
from collections import defaultdict
from sqlalchemy import func


mod = Blueprint('search', __name__)

SEARCH_URL = '/search'

@app.route(SEARCH_URL, method=['GET'])
def search_game_by_name():
	data = request.args

	games = []

	if data.get('name') is None:
		return create_response(status=400, message='Title of game is required')
	name = data.get('name')
	print(name)
	games = Game.query.filter.(func.lower(Game.name).contains(name.lower()))
	if games.count() == 0:
		return create_response(status=400, message='No games available with specified name')

	return create_response({'games': [g.to_dict() for g in games]})

