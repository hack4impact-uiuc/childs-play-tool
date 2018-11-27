from flask_sqlalchemy import SQLAlchemy

# instantiate database object
db = SQLAlchemy(session_options={"autoflush": False})
