from api.models import db, Game, Ranking
import json, os
import requests
import requests_mock

# client passed from client - look into pytest for more info about fixtures
# test client api: http://flask.pocoo.org/docs/1.0/api/#test-client
def test_index(client):
    rs = client.get("/")
    assert rs.status_code == 200


def test_get_games(client):
    rs = client.get("games?")
    assert rs.status_code == 400
    ret_dict = json.loads(rs.data)
    assert ret_dict["message"] == "Age and symptom are required."

    rs = client.get("games?age=12+and+Under")
    assert rs.status_code == 400
    ret_dict = json.loads(rs.data)
    assert ret_dict["message"] == "Age and symptom are required."

    rs = client.get("games?symptom=Pain")
    assert rs.status_code == 400
    ret_dict = json.loads(rs.data)
    assert ret_dict["message"] == "Age and symptom are required."

    rs = client.get("games?age=12+and+Under&symptom=Pain")
    assert rs.status_code == 400
    ret_dict = json.loads(rs.data)
    assert ret_dict["message"] == "No matching games for the specified age and symptom."

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
            tags = game["tags"]
            assert tags["ages"] == ["12 and Under", "13 and Older"]
            assert tags["symptoms"] == ["Bored (Short Term)", "Sadness"]

            game = system_games[1]
            assert game["name"] == "Super Mario Odyssey"
            assert game["rank"] == 9
            assert game["gender"] == "Male"
            tags = game["tags"]
            assert tags["ages"] == ["12 and Under"]
            assert tags["symptoms"] == ["Bored (Short Term)"]

            game = system_games[2]
            assert game["name"] == "Mario Kart"
            assert game["rank"] == 18
            assert game["gender"] == "Both"
            tags = game["tags"]
            assert tags["ages"] == ["12 and Under"]
            assert tags["symptoms"] == ["Bored (Short Term)"]

        elif system == "Nintendo 3DS":
            system_games = games[system]
            assert len(system_games) == 1
            game = system_games[0]
            assert game["name"] == "Pokemon Sun"
            assert game["rank"] == 3
            assert game["gender"] == "Both"
            tags = game["tags"]
            assert tags["ages"] == ["12 and Under"]
            assert tags["symptoms"] == ["Bored (Short Term)"]
        else:
            assert len(games[system]) == 0

    rs = client.get("games?age=12+and+Under&symptom=Bored+(Short+Term)&system=HTC+Vive")
    assert rs.status_code == 400
    ret_dict = json.loads(rs.data)
    assert (
        ret_dict["message"]
        == "This system has no matching games for the specified age and symptom."
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
    tags = game["tags"]
    assert tags["ages"] == ["12 and Under", "13 and Older"]
    assert tags["symptoms"] == ["Bored (Short Term)", "Sadness"]

    game = games[1]
    assert game["name"] == "Super Mario Odyssey"
    assert game["rank"] == 9
    assert game["gender"] == "Male"
    tags = game["tags"]
    assert tags["ages"] == ["12 and Under"]
    assert tags["symptoms"] == ["Bored (Short Term)"]

    game = games[2]
    assert game["name"] == "Mario Kart"
    assert game["rank"] == 18
    assert game["gender"] == "Both"
    tags = game["tags"]
    assert tags["ages"] == ["12 and Under"]
    assert tags["symptoms"] == ["Bored (Short Term)"]

    rs = client.get("games?age=12+and+Under&symptom=Bored+(Short+Term)&gender=Both")
    games_switch = json.loads(rs.data)["result"]["games"]["Nintendo Switch"]
    assert len(games_switch) == 1

    game = games_switch[0]
    assert game["name"] == "Mario Kart"
    assert game["rank"] == 18
    assert game["gender"] == "Both"
    tags = game["tags"]
    assert tags["ages"] == ["12 and Under"]
    assert tags["symptoms"] == ["Bored (Short Term)"]

    games_3ds = json.loads(rs.data)["result"]["games"]["Nintendo 3DS"]
    assert len(games_3ds) == 1

    game = games_3ds[0]
    assert game["name"] == "Pokemon Sun"
    assert game["rank"] == 3
    assert game["gender"] == "Both"
    tags = game["tags"]
    assert tags["ages"] == ["12 and Under"]
    assert tags["symptoms"] == ["Bored (Short Term)"]

    rs = client.get(
        "games?age=12+and+Under&symptom=Bored+(Short+Term)&system=Nintendo+Switch&gender=Both"
    )
    games = json.loads(rs.data)["result"]["games"]["Nintendo Switch"]
    assert len(games) == 1

    game = games[0]
    assert game["name"] == "Mario Kart"
    assert game["rank"] == 18
    assert game["gender"] == "Both"
    tags = game["tags"]
    assert tags["ages"] == ["12 and Under"]
    assert tags["symptoms"] == ["Bored (Short Term)"]

    rs = client.get(
        "games?age=12+and+Under&symptom=Bored+(Short+Term)&system=Nintendo+Switch&gender=Male"
    )
    games = json.loads(rs.data)["result"]["games"]["Nintendo Switch"]
    assert len(games) == 3

    game = games[0]
    assert game["name"] == "BotW"
    assert game["rank"] == 2
    assert game["gender"] == "Male"
    tags = game["tags"]
    assert tags["ages"] == ["12 and Under", "13 and Older"]
    assert tags["symptoms"] == ["Bored (Short Term)", "Sadness"]

    game = games[1]
    assert game["name"] == "Super Mario Odyssey"
    assert game["rank"] == 9
    assert game["gender"] == "Male"
    tags = game["tags"]
    assert tags["ages"] == ["12 and Under"]
    assert tags["symptoms"] == ["Bored (Short Term)"]

    game = games[2]
    assert game["name"] == "Mario Kart"
    assert game["rank"] == 18
    assert game["gender"] == "Both"
    tags = game["tags"]
    assert tags["ages"] == ["12 and Under"]
    assert tags["symptoms"] == ["Bored (Short Term)"]

    rs = client.get(
        "games?age=12+and+Under&symptom=Bored+(Short+Term)&gender=No+Discernable+Gender"
    )
    assert rs.status_code == 400
    ret_dict = json.loads(rs.data)
    assert (
        ret_dict["message"]
        == "No matching games for the specified age, symptom, and gender."
    )

    rs = client.get(
        "games?age=12+and+Under&symptom=Bored+(Short+Term)&system=Nintendo+Switch&gender=No+Discernable+Gender"
    )
    assert rs.status_code == 400
    ret_dict = json.loads(rs.data)
    assert (
        ret_dict["message"]
        == "This system has no matching games for the specified age, symptom, and gender."
    )


def test_get_game_specific(client):
    rs = client.get("/games/0")
    assert rs.status_code == 400

    ret_dict = json.loads(rs.data)
    assert ret_dict["message"] == "Game not found."

    rs = client.get("/games/1")
    assert rs.status_code == 200

    ret_dict = json.loads(rs.data)
    assert ret_dict["success"] == True
    game = ret_dict["result"]["game"]
    assert game["name"] == "Halo"
    assert game["system"] == "Xbox One"
    assert game["gender"] == "Male"
    tags = game["tags"]
    assert tags["ages"] == ["13 and Older"]
    assert tags["symptoms"] == ["Bored (Long Term)"]

    rs = client.get("/games/4")
    assert rs.status_code == 200

    ret_dict = json.loads(rs.data)
    assert ret_dict["success"] == True
    game = ret_dict["result"]["game"]
    assert game["name"] == "BotW"
    assert game["system"] == "Nintendo Switch"
    assert game["gender"] == "Male"
    tags = game["tags"]
    assert tags["ages"] == ["12 and Under", "13 and Older"]
    assert tags["symptoms"] == ["Bored (Short Term)", "Sadness"]


def test_get_games_all(client):
    rs = client.get("/games/all")
    assert rs.status_code == 200

    systems = json.loads(rs.data)["result"]["games"]
    num_games = 0
    for system in systems:
        num_games = num_games + len(systems[system])
    assert num_games == 6


@requests_mock.Mocker(kw="mock")
def test_post_games(client, **kwargs):
    db.session.query(Ranking).delete()
    db.session.query(Game).delete()
    kwargs["mock"].get(
        "http://www.giantbomb.com/api/search/?",
        json={
            "results": [
                {
                    "name": "mock",
                    "deck": "mock",
                    "image": {"icon_url": "mock", "small_url": "mock"},
                }
            ]
        },
    )

    rs = client.post("/games")
    assert rs.status_code == 400
    ret_dict = json.loads(rs.data)
    assert ret_dict["message"] == "File not provided."

    input_file = open("tests/conftest.py", "rb")
    rs = client.post(
        "/games", content_type="multipart/form-data", data={"file": input_file}
    )
    assert rs.status_code == 400
    ret_dict = json.loads(rs.data)
    assert ret_dict["message"] == "Invalid file format."

    input_file = open("tests/Sept2018Mod.xlsx", "rb")
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

    input_file = open("tests/Sept2018.xlsx", "rb")
    rs = client.post(
        "/games", content_type="multipart/form-data", data={"file": input_file}
    )
    assert rs.status_code == 201
    old_games = Game.query.filter(Game.current == False).all()
    assert len(old_games) == 4
    for old_game in old_games:
        assert "Test" in old_game.name
        old_game_rankings = Ranking.query.filter(Ranking.game_id == old_game.id)
        assert old_game_rankings.count() == 1
        for old_game_ranking in old_game_rankings:
            assert old_game_ranking.rank == 26

    input_file = open("tests/Sept2018Invalid.xlsx", "rb")
    rs = client.post(
        "/games", content_type="multipart/form-data", data={"file": input_file}
    )
    assert rs.status_code == 400
    ret_dict = json.loads(rs.data)
    assert ret_dict["message"] == "Invalid file format."
    assert Game.query.filter(Game.name == "FezFake").count() == 0
