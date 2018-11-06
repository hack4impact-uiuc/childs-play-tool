from api.core import Mixin
from .base import db
from .enums import ages, symptoms, systems


class Ranking(Mixin, db.Model):
    """Ranking Table."""

    __tablename__ = "ranking"

    id = db.Column(db.Integer, unique=True, primary_key=True)
    age = db.Column(ages, nullable=False)
    system = db.Column(systems, nullable=False)
    gender = db.Column(genders, nullable=False)
    symptom = db.Column(symptoms, nullable=False)
    game_id = db.Column(
        db.Integer, db.ForeignKey("game.id", ondelete="SET NULL"), nullable=False
    )
    rank = db.Column(db.Integer, nullable=False)

    def __init__(self, data):
        self.id = data["id"]
        self.age = data["age"]
        self.gender = data["gender"]
        self.system = data["system"]
        self.symptom = data["symptom"]
        self.game_id = data["game_id"]
        self.rank = data["rank"]

    def __repr__(self):
        return "<ranking {}>".format(self.rank)
