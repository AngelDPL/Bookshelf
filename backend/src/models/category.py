from src import db
from sqlalchemy.orm import Mapped, mapped_column
from sqlalchemy import String
from typing import TYPE_CHECKING

if TYPE_CHECKING:
    from src.models.book import Book

book_categories = db.Table(
    "book_categories",
    db.Column("book_id", db.Integer, db.ForeignKey("books.id"), primary_key=True),
    db.Column("category_id", db.Integer, db.ForeignKey("categories.id"), primary_key=True),
)


class Category(db.Model):
    __tablename__ = "categories"

    id: Mapped[int] = mapped_column(primary_key=True)
    name: Mapped[str] = mapped_column(String(50), unique=True, nullable=False)
    color: Mapped[str] = mapped_column(String(7), default="#6366f1")

    books: Mapped[list["Book"]] = db.relationship(
        "Book", secondary=book_categories, back_populates="categories"
    )

    def serialize(self):
        return {
            "id": self.id,
            "name": self.name,
            "color": self.color,
        }