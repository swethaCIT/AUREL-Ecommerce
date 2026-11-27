import unittest
from decimal import Decimal
from unittest.mock import Mock, patch

import requests
from sqlalchemy import func, select

from app import create_app
from app.extensions import db
from app.models import Brand, Category, Product


def external_product(
    external_id=101,
    title="Cotton Shirt",
    brand="Northline",
    category="mens-shirts",
):
    return {
        "id": external_id,
        "title": title,
        "description": "A lightweight cotton shirt.",
        "brand": brand,
        "category": category,
        "price": 58,
        "discountPercentage": 30,
        "thumbnail": "https://cdn.example.test/cotton-shirt.webp",
        "stock": 12,
    }


def api_response(products, total):
    response = Mock()
    response.json.return_value = {"products": products, "total": total}
    response.raise_for_status.return_value = None
    return response


class DummyJsonImportTests(unittest.TestCase):
    def setUp(self):
        self.app = create_app(
            {
                "TESTING": True,
                "SQLALCHEMY_DATABASE_URI": "sqlite://",
                "DUMMYJSON_PRODUCTS_URL": "https://dummyjson.example.test/products",
                "DUMMYJSON_TIMEOUT": 2,
            }
        )
        self.app_context = self.app.app_context()
        self.app_context.push()
        db.create_all()
        self.client = self.app.test_client()

    def tearDown(self):
        db.session.remove()
        db.drop_all()
        self.app_context.pop()

    @patch("app.services.dummyjson_service.requests.get")
    def test_import_fetches_pages_and_transforms_products(self, mocked_get):
        first = external_product(101)
        first.pop("brand")
        second = external_product(102, "Everyday Trainer", category="mens-shoes")
        mocked_get.side_effect = [
            api_response([first], total=2),
            api_response([second], total=2),
        ]

        response = self.client.post("/api/products/import")
        payload = response.get_json()

        self.assertEqual(response.status_code, 200)
        self.assertEqual(
            payload["data"],
            {
                "source": "DummyJSON",
                "fetched": 2,
                "imported": 2,
                "skipped_existing": 0,
                "skipped_invalid": 0,
            },
        )
        self.assertEqual(mocked_get.call_count, 2)
        self.assertEqual(mocked_get.call_args_list[1].kwargs["params"]["skip"], 1)
        self.assertEqual(db.session.scalar(select(func.count()).select_from(Product)), 2)
        imported = db.session.scalar(
            select(Product).where(Product.external_id == 101)
        )
        self.assertEqual(imported.brand.name, "Unknown")
        self.assertEqual(imported.category.slug, "mens-shirts")
        self.assertEqual(imported.price, Decimal("58.00"))
        self.assertGreater(imported.original_price, imported.price)
        self.assertEqual(imported.to_dict()["external_id"], 101)

    @patch("app.services.dummyjson_service.requests.get")
    def test_repeated_import_skips_existing_external_id_without_overwriting(self, mocked_get):
        mocked_get.side_effect = [
            api_response([external_product()], total=1),
            api_response(
                [external_product(title="Changed Shirt", brand="Different Brand")],
                total=1,
            ),
        ]

        first = self.client.post("/api/products/import")
        second = self.client.post("/api/products/import")
        product = db.session.scalar(
            select(Product).where(Product.external_id == 101)
        )

        self.assertEqual(first.get_json()["data"]["imported"], 1)
        self.assertEqual(second.get_json()["data"]["imported"], 0)
        self.assertEqual(second.get_json()["data"]["skipped_existing"], 1)
        self.assertEqual(product.name, "Cotton Shirt")
        self.assertEqual(product.brand.name, "Northline")
        self.assertEqual(db.session.scalar(select(func.count()).select_from(Brand)), 1)
        self.assertEqual(
            db.session.scalar(select(func.count()).select_from(Category)), 1
        )
        self.assertEqual(db.session.scalar(select(func.count()).select_from(Product)), 1)

    @patch("app.services.dummyjson_service.requests.get")
    def test_invalid_product_records_are_skipped(self, mocked_get):
        oversized_price = external_product(102, "Oversized Price")
        oversized_price["price"] = 1e100
        mocked_get.return_value = api_response(
            [
                external_product(),
                {"id": "invalid", "title": "Bad record"},
                oversized_price,
            ],
            total=3,
        )

        response = self.client.post("/api/products/import")

        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.get_json()["data"]["imported"], 1)
        self.assertEqual(response.get_json()["data"]["skipped_invalid"], 2)

    @patch("app.services.dummyjson_service.requests.get")
    def test_timeout_returns_gateway_timeout_without_importing(self, mocked_get):
        mocked_get.side_effect = requests.Timeout("slow response")

        response = self.client.post("/api/products/import")

        self.assertEqual(response.status_code, 504)
        self.assertEqual(
            response.get_json()["error"]["code"],
            "external_api_timeout",
        )
        self.assertEqual(db.session.scalar(select(func.count()).select_from(Product)), 0)

    @patch("app.services.dummyjson_service.requests.get")
    def test_external_http_failure_returns_bad_gateway(self, mocked_get):
        response = Mock()
        response.raise_for_status.side_effect = requests.HTTPError("upstream error")
        mocked_get.return_value = response

        result = self.client.post("/api/products/import")

        self.assertEqual(result.status_code, 502)
        self.assertEqual(
            result.get_json()["error"]["code"],
            "external_api_error",
        )
        self.assertEqual(db.session.scalar(select(func.count()).select_from(Product)), 0)


if __name__ == "__main__":
    unittest.main()
