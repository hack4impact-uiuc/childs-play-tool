import os
from api import celery, create_app

app = create_app(os.getenv('FLASK_CONFIG') or None)
app.app_context().push()