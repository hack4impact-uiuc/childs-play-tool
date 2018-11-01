from api.core import Mixin
from .base import db
from .enums import systems, genders


class Game(Mixin, db.Model):
    """Game Table."""

    __tablename__ = "game"

    id = db.Column(db.Integer, unique=True, primary_key=True)
    name = db.Column(db.String, nullable=False)
    system = db.Column(systems, nullable=False)
    gender = db.Column(genders, nullable=False)
    description = db.Column(db.String, nullable=False)
    thumbnail = db.Column(db.String, nullable=False)
    image = db.Column(db.String, nullable=False)

    def __init__(self, data):
        self.id = data["id"]
        self.name = data["name"]
        self.system = data["system"]
        self.gender = data["gender"]
        self.image = ""
        self.thumbnail = ""
        self.description = ""
        if "description" in data:
            self.description = data["description"]
        if "thumbnail" in data:
            self.thumbnail = data["thumbnail"]
        if "image" in data:
            self.image = data["image"]

    def __repr__(self):
        return "<name {}>".format(self.name)
