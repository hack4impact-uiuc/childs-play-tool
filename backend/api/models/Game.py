from api.core import Mixin
from .base import db


class Game(Mixin, db.Model):
    """Game Table."""

    __tablename__ = "game"

    id = db.Column(db.Integer, unique=True, primary_key=True)
    email = db.Column(db.String, nullable=False)
    person = db.Column(
        db.Integer, db.ForeignKey("person.id", ondelete="SET NULL"), nullable=True
    )

    def __init__(self, email):
        self.email = email

    def __repr__(self):
        return f"<Email {self.email}>"
