from api.models import db, Game, Ranking
import json

# client passed from client - look into pytest for more info about fixtures
# test client api: http://flask.pocoo.org/docs/1.0/api/#test-client
def test_index(client):
    rs = client.get("/")
    assert rs.status_code == 200


def test_get_games(client):
    rs = client.get("games?")
    assert rs.status_code == 400
    ret_dict = json.loads(rs.data)
    assert ret_dict["message"] == "Age and symptom are required"

    rs = client.get("games?age=Under+12")
    assert rs.status_code == 400
    ret_dict = json.loads(rs.data)
    assert ret_dict["message"] == "Age and symptom are required"

    rs = client.get("games?symptom=Pain")
    assert rs.status_code == 400
    ret_dict = json.loads(rs.data)
    assert ret_dict["message"] == "Age and symptom are required"

    rs = client.get("games?age=Under+12&symptom=Pain")
    assert rs.status_code == 400
    ret_dict = json.loads(rs.data)
    assert (
        ret_dict["message"] == "No appropriate games for the specified age and symptom"
    )

    rs = client.get("games?age=Under+12&symptom=Bored+(Short+Term)")
    assert rs.status_code == 200
    systems = json.loads(rs.data)["result"]["systems"]
    for system in systems:
        if system["system"] == "Nintendo Switch":
            assert len(system["games"]) == 3

            game = system["games"][0]
            assert game["name"] == "BotW"
            assert game["rank"] == 2
            assert game["gender"] == "Male"

            game = system["games"][1]
            assert game["name"] == "Super Mario Odyssey"
            assert game["rank"] == 9
            assert game["gender"] == "Male"

            game = system["games"][2]
            assert game["name"] == "Mario Kart"
            assert game["rank"] == 18
            assert game["gender"] == "Both"

        elif system["system"] == "Nintendo 3DS":
            assert len(system["games"]) == 1
            game = system["games"][0]
            assert game["name"] == "Pokemon Sun"
            assert game["rank"] == 3
            assert game["gender"] == "Both"
        else:
            assert len(system["games"]) == 0

    rs = client.get("games?age=Under+12&symptom=Bored+(Short+Term)&system=HTC+Vive")
    assert rs.status_code == 400
    ret_dict = json.loads(rs.data)
    assert (
        ret_dict["message"]
        == "This system has no appropriate games for the specified age and symptom"
    )

    rs = client.get(
        "games?age=Under+12&symptom=Bored+(Short+Term)&system=Nintendo+Switch"
    )
    assert rs.status_code == 200
    games = json.loads(rs.data)["result"]["games"]
    assert len(games) == 3

    game = games[0]
    assert game["name"] == "BotW"
    assert game["rank"] == 2
    assert game["gender"] == "Male"

    game = games[1]
    assert game["name"] == "Super Mario Odyssey"
    assert game["rank"] == 9
    assert game["gender"] == "Male"

    game = games[2]
    assert game["name"] == "Mario Kart"
    assert game["rank"] == 18
    assert game["gender"] == "Both"


def test_get_game_specific(client):
    rs = client.get("/games/0")
    assert rs.status_code == 400

    ret_dict = json.loads(rs.data)
    assert ret_dict["message"] == "Game not found"

    rs = client.get("/games/1")
    assert rs.status_code == 200

    ret_dict = json.loads(rs.data)
    assert ret_dict["success"] == True
    assert ret_dict["result"]["game"]["name"] == "Halo"
    assert ret_dict["result"]["game"]["system"] == "Xbox One"
    assert ret_dict["result"]["game"]["gender"] == "Male"

    rs = client.get("/games/4")
    assert rs.status_code == 200

    ret_dict = json.loads(rs.data)
    assert ret_dict["success"] == True
    assert ret_dict["result"]["game"]["name"] == "BotW"
    assert ret_dict["result"]["game"]["system"] == "Nintendo Switch"
    assert ret_dict["result"]["game"]["gender"] == "Male"
