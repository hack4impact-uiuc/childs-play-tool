from api.core import Mixin
from .base import db
from uuid import uuid4


class TmpFile(Mixin, db.Model):
    """File Table."""

    __tablename__ = "tmpfile"

    id = db.Column(db.String, unique=True, primary_key=True, nullable=False)
    file = db.Column(db.LargeBinary)

    def __init__(self, data):
        self.id = str(uuid4())
        self.file = data

    def __repr__(self):
        return "<file {}>".format(self.id)
