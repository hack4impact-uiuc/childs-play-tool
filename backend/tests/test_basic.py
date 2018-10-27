from api.models import db, Game, Ranking
import json, os

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

    rs = client.get("games?age=12+and+Under")
    assert rs.status_code == 400
    ret_dict = json.loads(rs.data)
    assert ret_dict["message"] == "Age and symptom are required"

    rs = client.get("games?symptom=Pain")
    assert rs.status_code == 400
    ret_dict = json.loads(rs.data)
    assert ret_dict["message"] == "Age and symptom are required"

    rs = client.get("games?age=12+and+Under&symptom=Pain")
    assert rs.status_code == 400
    ret_dict = json.loads(rs.data)
    assert (
        ret_dict["message"] == "No appropriate games for the specified age and symptom"
    )

    rs = client.get("games?age=12+and+Under&symptom=Bored+(Short+Term)")
    assert rs.status_code == 200
    games = json.loads(rs.data)["result"]["games"]
    for system in games:
        if system == "Nintendo Switch":
            system_games = games[system]
            assert len(system_games) == 3

            game = system_games[0]
            assert game["name"] == "BotW"
            assert game["rank"] == 2
            assert game["gender"] == "Male"

            game = system_games[1]
            assert game["name"] == "Super Mario Odyssey"
            assert game["rank"] == 9
            assert game["gender"] == "Male"

            game = system_games[2]
            assert game["name"] == "Mario Kart"
            assert game["rank"] == 18
            assert game["gender"] == "Both"

        elif system == "Nintendo 3DS":
            system_games = games[system]
            assert len(system_games) == 1
            game = system_games[0]
            assert game["name"] == "Pokemon Sun"
            assert game["rank"] == 3
            assert game["gender"] == "Both"
        else:
            assert len(games[system]) == 0

    rs = client.get("games?age=12+and+Under&symptom=Bored+(Short+Term)&system=HTC+Vive")
    assert rs.status_code == 400
    ret_dict = json.loads(rs.data)
    assert (
        ret_dict["message"]
        == "This system has no appropriate games for the specified age and symptom"
    )

    rs = client.get(
        "games?age=12+and+Under&symptom=Bored+(Short+Term)&system=Nintendo+Switch"
    )
    assert rs.status_code == 200
    games = json.loads(rs.data)["result"]["games"]["Nintendo Switch"]
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


def test_post_games(client):
    rs = client.post("/games")
    assert rs.status_code == 400
    ret_dict = json.loads(rs.data)
    assert ret_dict["message"] == "File not provided"

    input_file = open("tests/Sept2018.xlsx", "rb")
    rs = client.post(
        "/games", content_type="multipart/form-data", data={"file": input_file}
    )
    assert rs.status_code == 201
    systems = db.session.query(Game.system.distinct().label("system"))
    systems = [row.system for row in systems.all()]
    list.sort(systems)
    assert systems == [
        "Android",
        "Apple iOS",
        "HTC VIVE",
        "Nintendo 3DS",
        "Nintendo Switch",
        "Oculus Rift",
        "PlayStation 4",
        "PlayStation VR",
        "PlayStation Vita",
        "Xbox One",
    ]
