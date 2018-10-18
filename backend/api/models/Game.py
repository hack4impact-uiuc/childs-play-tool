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

class Game(Mixin, db.Model):
    """Game Table."""
    __tablename__ = 'game'

    id = db.Column(db.Integer, unique=True, primary_key=True)
    name = db.Column(db.String, nullable=False)
    system = db.Column(db.Enum("PlayStation Vita", "Xbox One", "PlayStation 4", "Nintendo Switch", "Nintendo 3DS", 
                               "Apple iOS", "Android", "PlayStation VR", "HTC VIVE", "Oculus Rift", name="system_types"), nullable=False)
    gender = db.Column(db.Enum("Male", "Female", "Both", "No Discernable Gender", name="gender_types"), nullable=False)

    def __init__(self, data):
        self.id = data["id"]
        self.name = data["name"]
        self.system = data["system"]
        self.gender = data["gender"]
    
    def __repr__(self):
        return '<name {}>'.format(self.name)
