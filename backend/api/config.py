import os


class Config:
    SECRET_KEY = "testkey"
    SQLALCHEMY_TRACK_MODIFICATIONS = False
    LOG_FILE = "api.log"


class DevelopmentConfig(Config):
    from keys import keys

    GIANTBOMB_KEY = keys["api_key"]
    SQLALCHEMY_DATABASE_URI = "postgresql://testusr:password@127.0.0.1:5432/cpdb"
    # SQLALCHEMY_DATABASE_URI = 'postgres://127.0.0.1:5432'
    DEBUG = True


class ProductionConfig(Config):
    from keys import keys

    GIANTBOMB_KEY = keys["api_key"]
    SQLALCHEMY_DATABASE_URI = os.environ.get("DATABASE_URL")
    DEBUG = False


class DockerDevConfig(Config):
    from keys import keys

    GIANTBOMB_KEY = keys["api_key"]
    SQLALCHEMY_DATABASE_URI = "postgresql://testusr:password@postgres/cpdb"
    DEBUG = True


config = {"dev": DevelopmentConfig, "prod": ProductionConfig, "docker": DockerDevConfig}
