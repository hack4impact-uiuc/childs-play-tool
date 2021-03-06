# this file structure follows http://flask.pocoo.org/docs/1.0/patterns/appfactories/
# initializing db in api.models.base instead of in api.__init__.py
# to prevent circular dependencies
from .Game import Game
from .Ranking import Ranking
from .Update import Update
from .TmpFile import TmpFile
from .base import db
