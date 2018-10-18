from api.models import db, Game, Ranking
import json

# client passed from client - look into pytest for more info about fixtures
# test client api: http://flask.pocoo.org/docs/1.0/api/#test-client
def test_index(client):
    rs = client.get("/")
    assert rs.status_code == 200


def test_get_games(client):
    rs = client.get("games?age=12&system=switch")
    ret_dict = json.loads(rs.data)
    assert rs.status_code == 400
    assert ret_dict["message"] == "Age and symptom are required"


def test_get_game_specific(client):
    rs = client.get("/games/1")
    assert rs.status_code == 200

    ret_dict = json.loads(rs.data)  # gives you a dictionary
    assert ret_dict["success"] == True
    assert ret_dict["result"]["game"]["name"] == "Halo"
    assert ret_dict["result"]["game"]["system"] == "Xbox One"
    assert ret_dict["result"]["game"]["gender"] == "Male"
