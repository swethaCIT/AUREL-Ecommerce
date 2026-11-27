from datetime import datetime, timezone

from app.extensions import db


class Product(db.Model):
    __tablename__ = "products"
    __table_args__ = (
        db.CheckConstraint("price >= 0", name="ck_products_price_nonnegative"),
        db.CheckConstraint(
            "original_price >= price",
            name="ck_products_original_price_gte_price",
        ),
        db.CheckConstraint(
            "discount >= 0 AND discount <= 100",
            name="ck_products_discount_range",
        ),
        db.CheckConstraint(
            "stock_quantity >= 0",
            name="ck_products_stock_nonnegative",
        ),
    )

    id = db.Column(db.Integer, primary_key=True)
    external_id = db.Column(db.Integer, unique=True, nullable=True, index=True)
    name = db.Column(db.String(160), nullable=False, index=True)
    description = db.Column(db.Text, nullable=False, default="")
    brand_id = db.Column(
        db.Integer,
        db.ForeignKey("brands.id", ondelete="RESTRICT"),
        nullable=False,
        index=True,
    )
    category_id = db.Column(
        db.Integer,
        db.ForeignKey("categories.id", ondelete="RESTRICT"),
        nullable=False,
        index=True,
    )
    price = db.Column(db.Numeric(10, 2), nullable=False)
    original_price = db.Column(db.Numeric(10, 2), nullable=False)
    discount = db.Column(db.Numeric(5, 2), nullable=False, default=0)
    image_url = db.Column(db.String(2048), nullable=False)
    stock_quantity = db.Column(db.Integer, nullable=False, default=0)
    created_at = db.Column(
        db.DateTime(timezone=True),
        nullable=False,
        default=lambda: datetime.now(timezone.utc),
        index=True,
    )

    brand = db.relationship("Brand", back_populates="products")
    category = db.relationship("Category", back_populates="products")

    def to_dict(self):
        return {
            "id": self.id,
            "external_id": self.external_id,
            "name": self.name,
            "description": self.description,
            "brand": self.brand.to_dict(),
            "category": self.category.to_dict(),
            "price": float(self.price),
            "original_price": float(self.original_price),
            "discount": float(self.discount),
            "image_url": self.image_url,
            "stock_quantity": self.stock_quantity,
            "created_at": self.created_at.isoformat(),
        }
