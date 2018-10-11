from api.core import Mixin
from .base import db


# class Ranking(Mixin, db.Model):
#     """Ranking Table."""

#     __tablename__ = "ranking"

    
#     id = db.Column(db.Integer, db.ForeignKey("game.id", ondelete="SET NULL"))
#     rank = db.Columm(db.Integer, nullable=False)
#     system = db.Columm(db.Enum, nullable=False)
#     ailment = db.Columm(db.Enum, nullable=False)
#     agegroup = db.Columm(db.Enum, nullable=False)
#     )

#     def __init__(self, ranking):
#         self.ranking = ranking

#     def __repr__(self):
#         return f"<Ranking {self.ranking}>"

class Ranking(db.Model):
    """Ranking Table."""
    __tablename__ = 'ranking'

    id = db.Column(db.Integer, unique=True, primary_key=True)
    age = db.Column(db.Enum("Under 12", "13 and Older", name="age_types"), nullable=False)
    system = db.Column(db.Enum("PlayStation Vita", "Xbox One", "PlayStation 4", "Nintendo Switch", "Nintendo 3DS", 
                               "Apple iOS", "Android", "PlayStation VR", "HTC VIVE", "Oculus Rift", name="system_types"), nullable=False)
    ailment = db.Column(db.Enum("Bored (Long Term)", "Bored (Short Term)", "Pain", "Anxiety/Hyperactivity", "Sadness", 
                                "Cognitive Impairment", name="ailment_types"), nullable=False)
    game_id = db.Column(db.Integer, db.ForeignKey("game.id", ondelete="SET NULL"), nullable=False)
    rank = db.Column(db.Integer, nullable=False)

    def __init__(self, data):
        self.id = data["id"]
        self.age = data["age"]
        self.system = data["system"]
        self.ailment = data["ailment"]
        self.game_id = data["game_id"]
        self.rank = data["rank"]
    
    def __repr__(self):
        return '<ranking {}>'.format(self.rank)