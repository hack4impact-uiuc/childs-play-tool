from api.core import Mixin
from .base import db


class Update(Mixin, db.Model):
    """Update Table."""

    __tablename__ = "update"

    time = db.Column(db.DateTime, unique=True, primary_key=True, nullable=False)
    valid = db.Column(db.Boolean, nullable=False)

    def __init__(self, data):
        self.time = data["time"]
        self.valid = data["valid"]

    def __repr__(self):
        return "<version {}>".format(self.time)
