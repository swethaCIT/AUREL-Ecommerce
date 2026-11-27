import re
from decimal import Decimal, InvalidOperation, ROUND_HALF_UP
from urllib.parse import urlparse

from sqlalchemy import select
from sqlalchemy.exc import SQLAlchemyError

from app.extensions import db
from app.models import Brand, Category, Product
from app.services.dummyjson_service import fetch_dummyjson_products

_CENT = Decimal("0.01")
_HUNDRED = Decimal("100")


class ProductImportError(Exception):
    pass


def _slugify(value):
    return re.sub(r"[^a-z0-9]+", "-", value.lower()).strip("-")


def _decimal(value):
    if isinstance(value, bool):
        raise ValueError("Expected a numeric value.")
    try:
        parsed = Decimal(str(value))
    except (InvalidOperation, TypeError, ValueError):
        raise ValueError("Expected a numeric value.") from None
    if not parsed.is_finite():
        raise ValueError("Expected a finite numeric value.")
    return parsed


def _normalize_product(record):
    if not isinstance(record, dict):
        return None

    external_id = record.get("id")
    if (
        isinstance(external_id, bool)
        or not isinstance(external_id, int)
        or external_id < 1
        or external_id > 2_147_483_647
    ):
        return None

    name = record.get("title")
    if not isinstance(name, str) or not name.strip() or len(name.strip()) > 160:
        return None
    name = name.strip()

    raw_price = record.get("price")
    raw_discount = record.get("discountPercentage", 0)
    raw_stock = record.get("stock")
    try:
        price = _decimal(raw_price)
        discount_percentage = _decimal(raw_discount)
    except ValueError:
        return None
    if price <= 0 or price > Decimal("99999999.99"):
        return None
    if discount_percentage < 0 or discount_percentage >= _HUNDRED:
        return None
    try:
        price = price.quantize(_CENT, rounding=ROUND_HALF_UP)
    except InvalidOperation:
        return None
    if price <= 0:
        return None

    if (
        isinstance(raw_stock, bool)
        or not isinstance(raw_stock, int)
        or raw_stock < 0
        or raw_stock > 2_147_483_647
    ):
        return None
    stock_quantity = raw_stock

    brand = record.get("brand")
    if not isinstance(brand, str) or not brand.strip():
        brand = "Unknown"
    else:
        brand = brand.strip()
    category = record.get("category")
    if not isinstance(category, str) or not category.strip():
        category = "Uncategorized"
    else:
        category = category.strip().replace("-", " ").title()
    if len(brand) > 100 or len(category) > 100:
        return None

    image_url = record.get("thumbnail")
    if not isinstance(image_url, str) or len(image_url) > 2048:
        return None
    image_url = image_url.strip()
    parsed_image = urlparse(image_url)
    if parsed_image.scheme not in {"http", "https"} or not parsed_image.netloc:
        return None

    description = record.get("description", "")
    if not isinstance(description, str):
        return None
    description = description.strip()

    try:
        if discount_percentage:
            original_price = (
                price / (Decimal("1") - discount_percentage / _HUNDRED)
            ).quantize(_CENT, rounding=ROUND_HALF_UP)
        else:
            original_price = price
    except ArithmeticError:
        return None
    if original_price < price:
        original_price = price
    if original_price > Decimal("99999999.99"):
        return None
    if original_price == price:
        calculated_discount = Decimal("0.00")
    else:
        calculated_discount = (
            (original_price - price) * _HUNDRED / original_price
        ).quantize(_CENT, rounding=ROUND_HALF_UP)

    return {
        "external_id": external_id,
        "name": name,
        "description": description,
        "brand_name": brand,
        "brand_slug": _slugify(brand) or "unknown",
        "category_name": category,
        "category_slug": _slugify(category) or "uncategorized",
        "price": price,
        "original_price": original_price,
        "discount": calculated_discount,
        "image_url": image_url,
        "stock_quantity": stock_quantity,
    }


def _lookup_by_slug_and_name(model):
    lookup = {}
    for item in db.session.scalars(select(model)).all():
        lookup[item.slug] = item
        lookup[item.name.casefold()] = item
    return lookup


def _get_or_create_brand(product_data, brands):
    brand = brands.get(product_data["brand_slug"])
    if brand is None:
        brand = brands.get(product_data["brand_name"].casefold())
    if brand is None:
        brand = Brand(
            name=product_data["brand_name"],
            slug=product_data["brand_slug"],
        )
        brands[brand.slug] = brand
        brands[brand.name.casefold()] = brand
    return brand


def _get_or_create_category(product_data, categories):
    category = categories.get(product_data["category_slug"])
    if category is None:
        category = categories.get(product_data["category_name"].casefold())
    if category is None:
        category = Category(
            name=product_data["category_name"],
            slug=product_data["category_slug"],
        )
        categories[category.slug] = category
        categories[category.name.casefold()] = category
    return category


def import_product_records(records):
    normalized_products = []
    skipped_invalid = 0
    for record in records:
        normalized = _normalize_product(record)
        if normalized is None:
            skipped_invalid += 1
        else:
            normalized_products.append(normalized)

    external_ids = {item["external_id"] for item in normalized_products}
    existing_ids = set()
    if external_ids:
        existing_ids = set(
            db.session.scalars(
                select(Product.external_id).where(
                    Product.external_id.in_(external_ids)
                )
            ).all()
        )

    brands = _lookup_by_slug_and_name(Brand)
    categories = _lookup_by_slug_and_name(Category)
    skipped_existing = 0
    imported = 0

    try:
        for product_data in normalized_products:
            external_id = product_data["external_id"]
            if external_id in existing_ids:
                skipped_existing += 1
                continue
            existing_ids.add(external_id)
            db.session.add(
                Product(
                    external_id=external_id,
                    name=product_data["name"],
                    description=product_data["description"],
                    brand=_get_or_create_brand(product_data, brands),
                    category=_get_or_create_category(product_data, categories),
                    price=product_data["price"],
                    original_price=product_data["original_price"],
                    discount=product_data["discount"],
                    image_url=product_data["image_url"],
                    stock_quantity=product_data["stock_quantity"],
                )
            )
            imported += 1
        if imported:
            db.session.commit()
    except SQLAlchemyError as error:
        db.session.rollback()
        raise ProductImportError(
            "The product import could not be saved to the database."
        ) from error

    return {
        "source": "DummyJSON",
        "fetched": len(records),
        "imported": imported,
        "skipped_existing": skipped_existing,
        "skipped_invalid": skipped_invalid,
    }


def import_dummyjson_products():
    from flask import current_app

    records = fetch_dummyjson_products(
        current_app.config["DUMMYJSON_PRODUCTS_URL"],
        current_app.config["DUMMYJSON_TIMEOUT"],
    )
    return import_product_records(records)
