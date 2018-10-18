from flask_script import Manager
from flask_migrate import Migrate, MigrateCommand
from api import create_app
from api.models import db, Game, Ranking

game_ids = [1, 2, 3, 4, 5]

game_names = ["Halo", "Mario Kart", "Fortnite", "BotW", "Super Mario Odyssey"]

game_systems = [
    "Xbox One",
    "Nintendo Switch",
    "PlayStation 4",
    "Nintendo Switch",
    "Nintendo Switch",
]

game_genders = ["Male", "Both", "Both", "Male", "Male"]

ranking_ids = [4, 5, 6, 7, 8]

ranking_ages = ["13 and Older", "Under 12", "13 and Older", "Under 12", "Under 12"]

ranking_systems = [
    "Xbox One",
    "Nintendo Switch",
    "PlayStation 4",
    "Nintendo Switch",
    "Nintendo Switch",
]

ranking_symptoms = [
    "Bored (Long Term)",
    "Bored (Short Term)",
    "Pain",
    "Bored (Short Term)",
    "Bored (Short Term)",
]

ranking_game_ids = [1, 2, 3, 4, 5]

ranking_ranks = [5, 18, 18, 2, 9]


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


if __name__ == "__main__":
    manager.run()

if __name__ == "__games__":
    manager.run()
