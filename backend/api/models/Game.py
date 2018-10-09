from api.core import Mixin
from .base import db


# class Game(Mixin, db.Model):
#     """Game Table."""

#     __tablename__ = "game"

#     id = db.Column(db.Integer, unique=True, primary_key=True)
#     email = db.Column(db.String, nullable=False)
#     person = db.Column(
#         db.Integer, db.ForeignKey("person.id", ondelete="SET NULL"), nullable=True
#     )

#     def __init__(self, email):
#         self.email = email

#     def __repr__(self):
#         return f"<Email {self.email}>"

class Game(Mixin, db.model):
    """Game Table."""
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
