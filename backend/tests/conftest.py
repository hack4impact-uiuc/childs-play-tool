# conftest.py is used by pytest to share fixtures
# https://docs.pytest.org/en/latest/fixture.html#conftest-py-sharing-fixture-functions
import os
import tempfile
import time
from unittest import mock

import pytest
import sqlalchemy
from flask_migrate import Migrate

from api import create_app

SQLITE_FILE_PATH = os.getcwd() + "test.db"

game_ids = [
    1,
    2,
    3,
    4,
    5
]

game_names = [
    "Halo",
    "Mario Kart",
    "Fortnite",
    "BotW",
    "Super Mario Odyssey"
]

game_systems = [
    "Xbox One",
    "Nintendo Switch",
    "PlayStation 4",
    "Nintendo Switch",
    "Nintendo Switch"
]

game_genders = [
    "Male",
    "Both",
    "Both",
    "Male",
    "Male"
]

ranking_ids = [
    4,
    5,
    6,
    7,
    8
]

ranking_ages = [
    "13 and Older",
    "Under 12",
    "13 and Older",
    "Under 12",
    "Under 12"
]

ranking_systems = [
    "Xbox One",
    "Nintendo Switch",
    "PlayStation 4",
    "Nintendo Switch",
    "Nintendo Switch"
]

ranking_symptoms = [
    "Bored (Long Term)",
    "Bored (Short Term)",
    "Pain",
    "Bored (Short Term)",
    "Bored (Short Term)"
]

ranking_game_ids = [
    1,
    2,
    3,
    4,
    5
]

ranking_ranks = [
    5,
    18,
    18,
    2,
    9
]


# testing using sqlite, which may
# not be the same as testing with
# postgres but for unit tests, this will do
@pytest.fixture(scope="session")
def client():
    config_dict = {
        "SQLALCHEMY_DATABASE_URI": "sqlite:///" + SQLITE_FILE_PATH,
        "DEBUG": True,
        "SQLALCHEMY_TRACK_MODIFICATIONS": False,
    }
    app = create_app(config_dict)
    app.app_context().push()

    # wait for sqlite file to be created
    time.sleep(2)
    from api.models import db, Game, Ranking

    db.drop_all()
    db.create_all()
    for i in range(5):
        game = {}
        game["id"] = game_ids[i]
        game["name"] = game_names[i]
        game["system"] = game_systems[i]
        game["gender"] = game_genders[i]
        g = Game(game)
        db.session.add(g)
    db.session.commit()

    for i in range(5):
        ranking = {}
        ranking["id"] = ranking_ids[i]
        ranking["age"] = ranking_ages[i]
        ranking["system"] = ranking_systems[i]
        ranking["symptom"] = ranking_symptoms[i]
        ranking["game_id"] = ranking_game_ids[i]
        ranking["rank"] = ranking_ranks[i]
        r = Ranking(ranking)
        db.session.add(r)
    db.session.commit()
    # for test client api reference
    # http://flask.pocoo.org/docs/1.0/api/#test-client
    client = app.test_client()
    yield client

    # remove the file
    os.remove(SQLITE_FILE_PATH)
