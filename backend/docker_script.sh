#!/bin/bash
python manage.py db init
python manage.py db migrate
python manage.py db upgrade
python manage.py recreate_db
python manage.py runserver