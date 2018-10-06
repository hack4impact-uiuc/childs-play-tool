from api import db
from api.utils import Mixin
from sqlalchemy.dialects.postgresql import JSON
from flask_sqlalchemy import SQLAlchemy
import datatime

class Game(db.model):
	__tablename__ = 'game'

	id = db.Column(db.Integer, unique=True, primary_key=true)
	name = db.Column(db.String, nullable=False)
	system = db.Column(db.String, nullable=False)
	gender = db.Columnn(db.String, nullable=False)
	# age can be string or even boolean?
	age = db.Column(db.Boolean, nullable=False)
	ailment = db.Column(db.String, nullable=False)

	def __repr__(self):
        return '<name {}>'.format(self.name)

class Ranking(db.model):
	__tablename__ = 'ranking'

	id = db.Column(db.Integer, unique=True, primary_key=true)
	age = db.Column(db.Boolean, nullable=False)
	system = db.Column(db.String, nullable=False)
	ailment = db.Column(db.String, nullable=False)
	game_id = db.Column(db.Integer, db.ForeignKey("game_id", ondelete="SET NULL"), nullable=False)
	rank = db.Column(db.Integer, nullable=False)

	def __repr__(self):
    	return '<ranking {}>'.format(self.rank)