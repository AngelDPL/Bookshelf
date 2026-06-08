from src import db
from sqlalchemy.orm import Mapped, mapped_column
from sqlalchemy import String, Integer, Float, DateTime, ForeignKey, Enum
from datetime import datetime, timezone
from typing import TYPE_CHECKING
import enum

if TYPE_CHECKING:
    from src.models.user import User
    from src.models.category import Category


class ReadingStatus(enum.Enum):
    PENDING = "pending"
    READING = "reading"
    FINISHED = "finished"


class Book(db.Model):
    __tablename__ = "books"

    id: Mapped[int] = mapped_column(primary_key=True)
    title: Mapped[str] = mapped_column(String(200), nullable=False)
    author: Mapped[str] = mapped_column(String(150), nullable=False)
    cover_url: Mapped[str] = mapped_column(String(500), nullable=True)
    total_pages: Mapped[int] = mapped_column(Integer, nullable=True)
    rating: Mapped[float] = mapped_column(Float, nullable=True)
    status: Mapped[ReadingStatus] = mapped_column(
        Enum(ReadingStatus), default=ReadingStatus.PENDING, nullable=False
    )
    created_at: Mapped[datetime] = mapped_column(
        DateTime(timezone=True), default=lambda: datetime.now(timezone.utc)
    )

    user_id: Mapped[int] = mapped_column(ForeignKey("users.id"), nullable=False)

    user: Mapped["User"] = db.relationship("User", back_populates="books")
    categories: Mapped[list["Category"]] = db.relationship(
        "Category", secondary="book_categories", back_populates="books"
    )

    def serialize(self):
        return {
            "id": self.id,
            "title": self.title,
            "author": self.author,
            "cover_url": self.cover_url,
            "total_pages": self.total_pages,
            "rating": self.rating,
            "status": self.status.value,
            "created_at": self.created_at.isoformat(),
            "user_id": self.user_id,
            "categories": [c.serialize() for c in self.categories],
        }