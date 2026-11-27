from flask import Blueprint, jsonify

from app.services.catalogue_service import list_brands

brands_blueprint = Blueprint("brands", __name__)


@brands_blueprint.get("/brands")
def brands():
    return jsonify(
        success=True,
        data=[brand.to_dict() for brand in list_brands()],
    )
