from flask_script import Manager
from flask_migrate import Migrate, MigrateCommand
from api import create_app
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

game_ailments = [
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

ranking_ailments = [
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



app = create_app()

manager = Manager(app)
migrate = Migrate(app, db)

manager.add_command("db", MigrateCommand)


@manager.command
def runserver():
    app.run(debug=True, host="0.0.0.0", port=8080)


@manager.command
def runworker():
    app.run(debug=False)


@manager.command
def recreate_db():
    """
    Recreates a local database. You probably should not use this on
    production.
    """
    for i in range(3):
        game = {}
        game["id"] = game_ids[i]
        game["name"] = game_names[i]
        game["system"] = game_systems[i]
        game["gender"] = game_genders[i]
        game["age"] = game_ages[i]
        game["ailment"] = game_ailments[i]
        g = Game(game)
        db.session.add(g)

        ranking = {}
        ranking["id"] = ranking_ids[i]
        ranking["age"] = ranking_ages[i]
        ranking["system"] = ranking_systems[i]
        ranking["ailment"] = ranking_ailments[i]
        ranking["game_id"] = ranking_game_ids[i]
        ranking["rank"] = ranking_ranks[i]
        r = Ranking(ranking)
        db.session.add(r)
    db.drop_all()
    db.create_all()
    db.session.commit()


if __name__ == "__main__":
    manager.run()
