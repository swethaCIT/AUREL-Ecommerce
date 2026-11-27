import unittest
from datetime import datetime, timezone
from decimal import Decimal

from sqlalchemy.exc import IntegrityError

from app import create_app
from app.extensions import db
from app.models import Brand, Category, Product


class CatalogueApiTests(unittest.TestCase):
    def setUp(self):
        self.app = create_app(
            {
                "TESTING": True,
                "SQLALCHEMY_DATABASE_URI": "sqlite://",
            }
        )
        self.app_context = self.app.app_context()
        self.app_context.push()
        db.create_all()

        self.category = Category(name="Men", slug="men")
        self.brand = Brand(name="Northline", slug="northline")
        self.home_category = Category(name="Home & Living", slug="home-living")
        self.home_brand = Brand(name="Alder House", slug="alder-house")
        db.session.add_all(
            [self.category, self.brand, self.home_category, self.home_brand]
        )
        db.session.flush()
        self.product = Product(
            name="Relaxed Oxford Shirt",
            description="A cotton shirt for everyday wear.",
            brand=self.brand,
            category=self.category,
            price=Decimal("58.00"),
            original_price=Decimal("84.00"),
            discount=Decimal("30.95"),
            image_url="https://example.test/oxford-shirt.jpg",
            stock_quantity=12,
            created_at=datetime(2026, 1, 1, tzinfo=timezone.utc),
        )
        self.tee = Product(
            name="Heavyweight Tee",
            description="A heavyweight cotton t-shirt for everyday wear.",
            brand=self.brand,
            category=self.category,
            price=Decimal("34.00"),
            original_price=Decimal("49.00"),
            discount=Decimal("30.61"),
            image_url="https://example.test/heavyweight-tee.jpg",
            stock_quantity=10,
            created_at=datetime(2026, 1, 2, tzinfo=timezone.utc),
        )
        self.serving_board = Product(
            name="Oak Serving Board",
            description="A hand-finished board made from oak.",
            brand=self.home_brand,
            category=self.home_category,
            price=Decimal("48.00"),
            original_price=Decimal("68.00"),
            discount=Decimal("29.41"),
            image_url="https://example.test/serving-board.jpg",
            stock_quantity=8,
            created_at=datetime(2026, 1, 3, tzinfo=timezone.utc),
        )
        db.session.add_all([self.product, self.tee, self.serving_board])
        db.session.commit()
        self.client = self.app.test_client()

    def tearDown(self):
        db.session.remove()
        db.drop_all()
        self.app_context.pop()

    def test_product_list_supports_pagination_and_filters(self):
        response = self.client.get(
            "/api/products?page=1&per_page=1&category=men&brand=Northline&search=oxford"
        )
        payload = response.get_json()

        self.assertEqual(response.status_code, 200)
        self.assertTrue(payload["success"])
        self.assertEqual(payload["pagination"]["total"], 1)
        self.assertEqual(payload["pagination"]["per_page"], 1)
        self.assertEqual(payload["data"][0]["brand"]["slug"], "northline")
        self.assertEqual(payload["data"][0]["category"]["slug"], "men")
        self.assertEqual(payload["data"][0]["discount"], 30.95)

    def test_product_detail_and_not_found_responses(self):
        response = self.client.get(f"/api/products/{self.product.id}")
        missing = self.client.get("/api/products/999")

        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.get_json()["data"]["name"], "Relaxed Oxford Shirt")
        self.assertEqual(missing.status_code, 404)
        self.assertEqual(missing.get_json()["error"]["code"], "product_not_found")

    def test_categories_brands_and_api_route_errors_are_json(self):
        categories = self.client.get("/api/categories")
        brands = self.client.get("/api/brands")
        malformed_id = self.client.get("/api/products/not-an-id")
        wrong_method = self.client.post("/api/categories")
        health = self.client.get("/api/health")

        self.assertIn("men", [item["slug"] for item in categories.get_json()["data"]])
        self.assertIn("northline", [item["slug"] for item in brands.get_json()["data"]])
        self.assertEqual(malformed_id.status_code, 404)
        self.assertEqual(malformed_id.get_json()["error"]["code"], "not_found")
        self.assertEqual(wrong_method.status_code, 405)
        self.assertEqual(wrong_method.get_json()["error"]["code"], "method_not_allowed")
        self.assertEqual(health.get_json(), {"status": "ok", "service": "aurel-api"})

    def test_invalid_pagination_is_rejected(self):
        response = self.client.get("/api/products?page=0")

        self.assertEqual(response.status_code, 400)
        self.assertEqual(response.get_json()["error"]["code"], "invalid_query")

    def test_search_matches_product_name_and_description(self):
        name_match = self.client.get("/api/products?search=serving")
        description_match = self.client.get("/api/products?search=cotton")

        self.assertEqual(
            [item["name"] for item in name_match.get_json()["data"]],
            ["Oak Serving Board"],
        )
        self.assertEqual(
            {item["name"] for item in description_match.get_json()["data"]},
            {"Relaxed Oxford Shirt", "Heavyweight Tee"},
        )

    def test_category_brand_and_price_filters_combine(self):
        response = self.client.get(
            "/api/products?category=men&brand=northline&search=cotton"
            "&min_price=40&max_price=60"
        )
        payload = response.get_json()

        self.assertEqual(response.status_code, 200)
        self.assertEqual(payload["pagination"]["total"], 1)
        self.assertEqual(payload["data"][0]["name"], "Relaxed Oxford Shirt")

        home_products = self.client.get("/api/products?category=home-living")
        alder_products = self.client.get("/api/products?brand=Alder%20House")
        self.assertEqual(home_products.get_json()["pagination"]["total"], 1)
        self.assertEqual(alder_products.get_json()["pagination"]["total"], 1)

    def test_price_range_filters_products(self):
        response = self.client.get("/api/products?min_price=40&max_price=55")

        self.assertEqual(
            [item["name"] for item in response.get_json()["data"]],
            ["Oak Serving Board"],
        )

    def test_price_sorting_supports_ascending_and_descending(self):
        ascending = self.client.get(
            "/api/products?sort_by=price&order=asc"
        ).get_json()["data"]
        descending = self.client.get(
            "/api/products?sort_by=price&order=desc"
        ).get_json()["data"]

        self.assertEqual(
            [item["name"] for item in ascending],
            ["Heavyweight Tee", "Oak Serving Board", "Relaxed Oxford Shirt"],
        )
        self.assertEqual(
            [item["name"] for item in descending],
            ["Relaxed Oxford Shirt", "Oak Serving Board", "Heavyweight Tee"],
        )

    def test_newest_sort_preserves_pagination_metadata(self):
        first_page = self.client.get(
            "/api/products?sort_by=newest&per_page=2&page=1"
        ).get_json()
        second_page = self.client.get(
            "/api/products?sort_by=newest&per_page=2&page=2"
        ).get_json()

        self.assertEqual(
            [item["name"] for item in first_page["data"]],
            ["Oak Serving Board", "Heavyweight Tee"],
        )
        self.assertEqual(
            [item["name"] for item in second_page["data"]],
            ["Relaxed Oxford Shirt"],
        )
        self.assertEqual(
            first_page["pagination"],
            {"page": 1, "per_page": 2, "total": 3, "total_pages": 2},
        )
        self.assertEqual(second_page["pagination"]["page"], 2)

    def test_invalid_price_and_sort_parameters_return_json_400(self):
        invalid_queries = [
            "min_price=abc",
            "max_price=-1",
            "min_price=60&max_price=40",
            "sort_by=unknown",
            "sort_by=price&order=sideways",
            "sort_by=newest&order=asc",
        ]
        for query in invalid_queries:
            with self.subTest(query=query):
                response = self.client.get(f"/api/products?{query}")
                self.assertEqual(response.status_code, 400)
                self.assertTrue(response.get_json()["success"] is False)
                self.assertEqual(
                    response.get_json()["error"]["code"],
                    "invalid_query",
                )

    def test_rating_and_popularity_are_reported_unsupported(self):
        unsupported_queries = [
            ("min_rating=4", "unsupported_filter"),
            ("sort_by=rating", "unsupported_sort"),
            ("sort_by=popularity", "unsupported_sort"),
        ]
        for query, code in unsupported_queries:
            with self.subTest(query=query):
                response = self.client.get(f"/api/products?{query}")
                self.assertEqual(response.status_code, 400)
                payload = response.get_json()
                self.assertFalse(payload["success"])
                self.assertEqual(payload["error"]["code"], code)
                self.assertIn("not stored", payload["error"]["message"])

    def test_product_constraints_reject_invalid_price_and_stock(self):
        invalid_product = Product(
            name="Invalid Product",
            description="",
            brand=self.brand,
            category=self.category,
            price=Decimal("90.00"),
            original_price=Decimal("80.00"),
            discount=Decimal("10.00"),
            image_url="https://example.test/invalid.jpg",
            stock_quantity=-1,
        )
        db.session.add(invalid_product)

        with self.assertRaises(IntegrityError):
            db.session.flush()
        db.session.rollback()


if __name__ == "__main__":
    unittest.main()
