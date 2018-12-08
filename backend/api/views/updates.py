from api.models import db, Update
from api.core import create_response, Mixin, Auth
from flask import Blueprint, request, current_app as app
import requests
import re

updates_page = Blueprint("updates", __name__)

GLOBAL_POST_URL = "/"
UPDATES_URL = "/updates"


@updates_page.route(UPDATES_URL, methods=["GET"])
@Auth.authenticate
def get_updates():
    updates = {}
    valid = Update.query.filter(Update.valid == True)
    invalid = Update.query.filter(Update.valid == False)
    if valid.count() > 0:
        updates["valid"] = valid.first().to_dict()
    if invalid.count() > 0:
        updates["invalid"] = invalid.first().to_dict()
    return create_response(status=200, data={"updates": updates})
