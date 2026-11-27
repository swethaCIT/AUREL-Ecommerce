from flask import Flask, jsonify, request
from flask_cors import CORS

from app.config import Config
from app.extensions import db, jwt, migrate
from app.routes.brands import brands_blueprint
from app.routes.categories import categories_blueprint
from app.routes.health import health_blueprint
from app.routes.products import products_blueprint


def create_app(test_config=None):
    app = Flask(__name__)
    app.config.from_object(Config)
    if test_config:
        app.config.update(test_config)

    CORS(app, resources={r"/api/*": {"origins": app.config["FRONTEND_ORIGINS"]}})
    db.init_app(app)
    jwt.init_app(app)
    migrate.init_app(app, db)

    from app import models

    app.register_blueprint(health_blueprint, url_prefix="/api")
    app.register_blueprint(products_blueprint, url_prefix="/api")
    app.register_blueprint(categories_blueprint, url_prefix="/api")
    app.register_blueprint(brands_blueprint, url_prefix="/api")

    @app.errorhandler(404)
    def handle_not_found(error):
        if request.path.startswith("/api/"):
            return jsonify(
                success=False,
                error={"code": "not_found", "message": "The requested resource was not found."},
            ), 404
        return error

    @app.errorhandler(405)
    def handle_method_not_allowed(error):
        if request.path.startswith("/api/"):
            return jsonify(
                success=False,
                error={"code": "method_not_allowed", "message": "The method is not allowed for this resource."},
            ), 405
        return error

    return app
