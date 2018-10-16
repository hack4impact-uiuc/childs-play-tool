from api.core import Mixin
from .base import db


class Ranking(Mixin, db.Model):
    """Ranking Table."""

    __tablename__ = "ranking"

    
    id = db.Column(db.Integer, db.ForeignKey("game.id", ondelete="SET NULL"))
    rank = db.Columm(db.Integer, nullable=False)
    system = db.Columm(db.Enum, nullable=False)
    symptom = db.Columm(db.Enum, nullable=False)
    agegroup = db.Columm(db.Enum, nullable=False)
    )

    def __init__(self, ranking):
        self.ranking = ranking

    def __repr__(self):
        return f"<Ranking {self.ranking}>"