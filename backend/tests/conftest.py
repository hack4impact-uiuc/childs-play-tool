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
from .mock_data import (
    game_ids,
    game_names,
    game_systems,
    game_genders,
    ranking_ages,
    ranking_game_ids,
    ranking_ids,
    ranking_ranks,
    ranking_symptoms,
    ranking_systems,
)

SQLITE_FILE_PATH = os.getcwd() + "test.db"

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
    for i in range(len(game_ids)):
        game = {}
        game["id"] = game_ids[i]
        game["name"] = game_names[i]
        game["system"] = game_systems[i]
        game["gender"] = game_genders[i]
        g = Game(game)
        db.session.add(g)
    db.session.commit()

    for i in range(len(ranking_ids)):
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
