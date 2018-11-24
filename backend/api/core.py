from typing import Tuple, List
import configparser

from werkzeug.local import LocalProxy
from flask import current_app, jsonify, request
from flask.wrappers import Response
from functools import wraps

# logger object for all views to use
logger = LocalProxy(lambda: current_app.logger)
auth_key = None


class Mixin:
    """Utility Base Class for SQLAlchemy Models. 
    
    Adds `to_dict()` to easily serialize objects to dictionaries.
    """

    def to_dict(self) -> dict:
        d_out = dict((key, val) for key, val in self.__dict__.items())
        d_out.pop("_sa_instance_state", None)
        return d_out


def create_response(
    data: dict = None, status: int = 200, message: str = ""
) -> Tuple[Response, int]:
    """Wraps response in a consistent format throughout the API.
    
    Format inspired by https://medium.com/@shazow/how-i-design-json-api-responses-71900f00f2db
    Modifications included:
    - make success a boolean since there's only 2 values
    - make message a single string since we will only use one message per response

    IMPORTANT: data must be a dictionary where:
    - the key is the name of the type of data
    - the value is the data itself

    :param data <str> optional data
    :param status <int> optional status code, defaults to 200
    :param message <str> optional message
    :returns tuple of Flask Response and int
    """
    if type(data) is not dict and data is not None:
        raise TypeError("Data should be a dictionary 😞")

    response = {"success": 200 <= status < 300, "message": message, "result": data}
    return jsonify(response), status


def serialize_list(items: List) -> List:
    """Serializes a list of SQLAlchemy Objects, exposing their attributes.
    
    :param items - List of Objects that inherit from Mixin
    :returns List of dictionaries
    """
    if not items or items is None:
        return []
    return [x.to_dict() for x in items]


# add specific Exception handlers before this, if needed
def all_exception_handler(error: Exception) -> Tuple[Response, int]:
    """Catches and handles all exceptions, add more specific error Handlers.
    :param Exception
    :returns Tuple of a Flask Response and int
    """
    return create_response(message=str(error), status=500)


def get_api_keys(file: str = "creds.ini") -> str:
    try:
        config = configparser.ConfigParser()
        config.read(file)
        return config["API-KEYS"]["GIANTBOMB"]
    except:
        return None


class Auth:

    auth_key = ""

    @classmethod
    def set_key(cls):
        try:
            config = configparser.ConfigParser()
            config.read("creds.ini")
            cls.auth_key = config["SECURITY-KEY"]["KEY"]
        except:
            return

    @classmethod
    def authenticate(cls, f):
        if cls.auth_key == "":

            @wraps(f)
            def decorated_function(*args, **kwargs):
                return f(*args, **kwargs)

            return decorated_function

        @wraps(f)
        def decorated_function(*args, **kwargs):
            if (
                request.method == "POST"
                or request.method == "DELETE"
                or request.method == "PUT"
            ):
                data = request.form
            else:
                data = request.args
            if data.get("key") is None or data.get("key") != auth_key:
                return create_response(status=400, message="No/Wrong key provided")
            return f(*args, **kwargs)

        return decorated_function
