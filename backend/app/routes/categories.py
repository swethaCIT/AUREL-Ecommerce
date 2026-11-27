from flask import Blueprint, jsonify

from app.services.catalogue_service import list_categories

categories_blueprint = Blueprint("categories", __name__)


@categories_blueprint.get("/categories")
def categories():
    return jsonify(
        success=True,
        data=[category.to_dict() for category in list_categories()],
    )
