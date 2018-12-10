import os
from api.core import get_api_keys


class Config:
    SECRET_KEY = "testkey"
    SQLALCHEMY_TRACK_MODIFICATIONS = False
    LOG_FILE = "api.log"


class DevelopmentConfig(Config):
    GIANTBOMB_KEY = get_api_keys()
    SQLALCHEMY_DATABASE_URI = "postgresql://testusr:password@127.0.0.1:5432/cpdb"
    REDIS_URL = "redis://localhost:6379/0"
    # SQLALCHEMY_DATABASE_URI = 'postgres://127.0.0.1:5432'
    DEBUG = True


class ProductionConfig(Config):
    GIANTBOMB_KEY = os.environ.get("GIANTBOMB_KEY")
    SQLALCHEMY_DATABASE_URI = os.environ.get("DATABASE_URL")
    REDIS_URL = os.environ.get("REDIS_URL")
    DEBUG = False


class DockerDevConfig(Config):
    GIANTBOMB_KEY = get_api_keys()
    SQLALCHEMY_DATABASE_URI = "postgresql://testusr:password@postgres/cpdb"
    DEBUG = True


config = {"dev": DevelopmentConfig, "prod": ProductionConfig, "docker": DockerDevConfig}
