from flask_script import Manager
from flask_migrate import Migrate, MigrateCommand
from api import create_app
from api.models import db, Game, Ranking
from api.mock_data import (
    game_ids,
    game_names,
    game_systems,
    game_genders,
    game_descriptions,
    game_images,
    game_thumbnails,
    ranking_ages,
    ranking_game_ids,
    ranking_ids,
    ranking_ranks,
    ranking_symptoms,
    ranking_systems,
)

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
    for i in range(len(game_ids)):
        game = {}
        game["id"] = game_ids[i]
        game["name"] = game_names[i]
        game["system"] = game_systems[i]
        game["gender"] = game_genders[i]
        game["description"] = game_descriptions[i]
        game["image"] = game_images[i]
        game["thumbnail"] = game_thumbnails[i]
        g = Game(game)
        db.session.add(g)
    db.session.commit()

    # for i in range(len(ranking_ids)):
    #     ranking = {}
    #     ranking["id"] = ranking_ids[i]
    #     ranking["age"] = ranking_ages[i]
    #     ranking["system"] = ranking_systems[i]
    #     ranking["symptom"] = ranking_symptoms[i]
    #     ranking["game_id"] = ranking_game_ids[i]
    #     ranking["rank"] = ranking_ranks[i]
    #     r = Ranking(ranking)
    #     db.session.add(r)
    # db.session.commit()


if __name__ == "__main__":
    manager.run()

if __name__ == "__games__":
    manager.run()

if __name__ == "__search_page__":
    manager.run()
