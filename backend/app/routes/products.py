from flask import Blueprint, jsonify, request

from app.services.catalogue_service import (
    UnsupportedCatalogueParameter,
    get_product,
    list_products,
)
from app.services.dummyjson_service import DummyJsonApiError, DummyJsonTimeoutError
from app.services.product_import_service import (
    ProductImportError,
    import_dummyjson_products,
)

products_blueprint = Blueprint("products", __name__)


@products_blueprint.get("/products")
def products():
    try:
        result = list_products(request.args)
    except UnsupportedCatalogueParameter as error:
        return jsonify(
            success=False,
            error={"code": error.code, "message": str(error)},
        ), 400
    except ValueError as error:
        return jsonify(
            success=False,
            error={"code": "invalid_query", "message": str(error)},
        ), 400

    return jsonify(
        success=True,
        data=result["items"],
        pagination=result["pagination"],
    )


@products_blueprint.get("/products/<int:product_id>")
def product_detail(product_id):
    product = get_product(product_id)
    if product is None:
        return jsonify(
            success=False,
            error={"code": "product_not_found", "message": "Product not found."},
        ), 404
    return jsonify(success=True, data=product.to_dict())


@products_blueprint.post("/products/import")
def import_products():
    try:
        result = import_dummyjson_products()
    except DummyJsonTimeoutError as error:
        return jsonify(
            success=False,
            error={"code": "external_api_timeout", "message": str(error)},
        ), 504
    except DummyJsonApiError as error:
        return jsonify(
            success=False,
            error={"code": "external_api_error", "message": str(error)},
        ), 502
    except ProductImportError as error:
        return jsonify(
            success=False,
            error={"code": "import_failed", "message": str(error)},
        ), 500

    return jsonify(success=True, data=result), 200
