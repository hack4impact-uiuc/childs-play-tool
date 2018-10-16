from api.models import db

# client passed from client - look into pytest for more info about fixtures
# test client api: http://flask.pocoo.org/docs/1.0/api/#test-client
def test_index(client):
    rs = client.get("/")
    assert rs.status_code == 200

def test_get_game_specific(client):
    rs = client.get("/games/1")
    assert rs.status_code == 200
    ret_dict = rs.json  # gives you a dictionary
    assert ret_dict["success"] == True
    assert len(ret_dict["result"]["game"]) == 1
    assert ret_dict["result"]["game"]["name"] == "Halo"
    assert ret_dict["result"]["game"]["system"] == "Xbox One"
    assert ret_dict["result"]["game"]["gender"] == "Both"
    assert ret_dict["result"]["game"]["age"] == "13 and Older"
    assert ret_dict["result"]["game"]["ailment"] == "Bored (Long Term)"

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
