from api.models import db, Game, Ranking


game_ids = [
    1,
    2,
    3
]

game_names = [
    "Halo",
    "Mario Kart",
    "Fortnite"
]

game_systems = [
    "Xbox One",
    "Nintendo Switch",
    "PlayStation 4"
]

game_genders = [
    "Male",
    "Both",
    "Both"
]

game_ages = [
    "13 and Older",
    "Under 12",
    "13 and Older"
]

game_symptoms = [
    "Bored (Long Term)",
    "Bored (Short Term)",
    "Pain"
]

ranking_ids = [
    4,
    5,
    6
]

ranking_ages = [
    "13 and Older",
    "Under 12",
    "13 and Older"
]

ranking_systems = [
    "Xbox One",
    "Nintendo Switch",
    "PlayStation 4"
]

ranking_symptoms = [
    "Bored (Long Term)",
    "Bored (Short Term)",
    "Pain"
]

ranking_game_ids = [
    1,
    2,
    3
]

ranking_ranks = [
    5,
    2,
    18
]



# client passed from client - look into pytest for more info about fixtures
# test client api: http://flask.pocoo.org/docs/1.0/api/#test-client
def test_index(client):
    rs = client.get("/")
    assert rs.status_code == 200

def test_get_games(client):
    rs = client.get("/games")
    assert rs.status_code == 200

def test_get_game_specific(client):
    for i in range(3):
        game = {}
        game["id"] = game_ids[i]
        game["name"] = game_names[i]
        game["system"] = game_systems[i]
        game["gender"] = game_genders[i]
        game["age"] = game_ages[i]
        game["symptom"] = game_symptoms[i]
        g = Game(game)
        db.session.add(g)

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

    rs = client.get("/games/1")
    assert rs.status_code == 200
    print(rs)
    ret_dict = rs.json  # gives you a dictionary
    assert ret_dict["success"] == True
    assert len(ret_dict["result"]["game"]) == 1
    assert ret_dict["result"]["game"]["name"] == "Halo"
    assert ret_dict["result"]["game"]["system"] == "Xbox One"
    assert ret_dict["result"]["game"]["gender"] == "Both"
    assert ret_dict["result"]["game"]["age"] == "13 and Older"
    assert ret_dict["result"]["game"]["symptom"] == "Bored (Long Term)"

'''
def test_get_person(client):
    rs = client.get("/persons")

    assert rs.status_code == 200
    ret_dict = rs.json  # gives you a dictionary
    assert ret_dict["success"] == True
    assert ret_dict["result"]["persons"] == []

    # create Person and test whether it returns a person
    temp_person = Person(name="Tim")
    db.session.add(temp_person)
    db.session.commit()

    rs = client.get("/persons")
    ret_dict = rs.json
    assert len(ret_dict["result"]["persons"]) == 1
    assert ret_dict["result"]["persons"][0]["name"] == "Tim"
'''
