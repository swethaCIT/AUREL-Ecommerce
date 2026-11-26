from flask import Flask
from flask_cors import CORS

from app.config import Config
from app.extensions import db, jwt
from app.routes.health import health_blueprint


def create_app():
    app = Flask(__name__)
    app.config.from_object(Config)

    CORS(app, resources={r"/api/*": {"origins": app.config["FRONTEND_ORIGINS"]}})
    db.init_app(app)
    jwt.init_app(app)
    app.register_blueprint(health_blueprint, url_prefix="/api")

    return app
