from math import ceil
from decimal import Decimal, InvalidOperation

from sqlalchemy import func, or_, select

from app.extensions import db
from app.models import Brand, Category, Product


class UnsupportedCatalogueParameter(ValueError):
    def __init__(self, parameter, message):
        self.code = (
            "unsupported_filter" if parameter == "min_rating" else "unsupported_sort"
        )
        super().__init__(message)


def _positive_integer(value, parameter, default, maximum=None):
    if value is None:
        return default
    try:
        parsed = int(value)
    except (TypeError, ValueError):
        raise ValueError(f"{parameter} must be a positive integer.") from None
    if parsed < 1 or (maximum is not None and parsed > maximum):
        if maximum is not None:
            raise ValueError(f"{parameter} must be between 1 and {maximum}.")
        raise ValueError(f"{parameter} must be a positive integer.")
    return parsed


def _optional_filter(value, parameter):
    if value is None:
        return None
    value = value.strip()
    if not value:
        return None
    if len(value) > 120:
        raise ValueError(f"{parameter} must be 120 characters or fewer.")
    return value


def _optional_price(value, parameter):
    if value is None:
        return None
    if not value.strip() or len(value) > 64:
        raise ValueError(f"{parameter} must be a non-negative number.")
    try:
        price = Decimal(value)
    except InvalidOperation:
        raise ValueError(f"{parameter} must be a non-negative number.") from None
    if not price.is_finite() or price < 0:
        raise ValueError(f"{parameter} must be a non-negative number.")
    return price


def list_products(args):
    page = _positive_integer(args.get("page"), "page", 1)
    per_page = _positive_integer(args.get("per_page"), "per_page", 12, 100)
    category = _optional_filter(args.get("category"), "category")
    brand = _optional_filter(args.get("brand"), "brand")
    min_price = _optional_price(args.get("min_price"), "min_price")
    max_price = _optional_price(args.get("max_price"), "max_price")
    search = args.get("search")
    sort_by = args.get("sort_by", "newest").strip().lower()
    order = args.get("order", "desc").strip().lower()

    if "min_rating" in args:
        raise UnsupportedCatalogueParameter(
            "min_rating",
            "Rating filters are unavailable because product ratings are not stored.",
        )
    if sort_by == "rating":
        raise UnsupportedCatalogueParameter(
            "sort_by",
            "Rating sorting is unavailable because product ratings are not stored.",
        )
    if sort_by == "popularity":
        raise UnsupportedCatalogueParameter(
            "sort_by",
            "Popularity sorting is unavailable because popularity data is not stored.",
        )
    if sort_by not in {"price", "newest"}:
        raise ValueError("sort_by must be one of: price, newest.")
    if order not in {"asc", "desc"}:
        raise ValueError("order must be either asc or desc.")
    if sort_by == "newest" and order != "desc":
        raise ValueError("order=asc is only supported when sort_by=price.")
    if min_price is not None and max_price is not None and min_price > max_price:
        raise ValueError("min_price must not be greater than max_price.")

    if search is not None:
        search = search.strip()
        if len(search) > 200:
            raise ValueError("search must be 200 characters or fewer.")

    statement = select(Product).join(Product.category).join(Product.brand)
    if category:
        normalized_category = category.lower()
        statement = statement.where(
            or_(
                func.lower(Category.slug) == normalized_category,
                func.lower(Category.name) == normalized_category,
            )
        )
    if brand:
        normalized_brand = brand.lower()
        statement = statement.where(
            or_(
                func.lower(Brand.slug) == normalized_brand,
                func.lower(Brand.name) == normalized_brand,
            )
        )
    if min_price is not None:
        statement = statement.where(Product.price >= min_price)
    if max_price is not None:
        statement = statement.where(Product.price <= max_price)
    if search:
        term = search.lower()
        statement = statement.where(
            or_(
                func.lower(Product.name).contains(term, autoescape=True),
                func.lower(Product.description).contains(term, autoescape=True),
                func.lower(Brand.name).contains(term, autoescape=True),
            )
        )

    total = db.session.scalar(
        select(func.count()).select_from(statement.order_by(None).subquery())
    )
    if sort_by == "price":
        price_order = Product.price.asc() if order == "asc" else Product.price.desc()
        ordering = (price_order, Product.created_at.desc(), Product.id.desc())
    else:
        ordering = (Product.created_at.desc(), Product.id.desc())

    products = db.session.scalars(
        statement.order_by(*ordering)
        .offset((page - 1) * per_page)
        .limit(per_page)
    ).all()

    return {
        "items": [product.to_dict() for product in products],
        "pagination": {
            "page": page,
            "per_page": per_page,
            "total": total,
            "total_pages": max(1, ceil(total / per_page)),
        },
    }


def get_product(product_id):
    return db.session.get(Product, product_id)


def list_categories():
    return db.session.scalars(select(Category).order_by(Category.name)).all()


def list_brands():
    return db.session.scalars(select(Brand).order_by(Brand.name)).all()
