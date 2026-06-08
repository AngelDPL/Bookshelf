from flask import Blueprint, request, jsonify
from flask_jwt_extended import jwt_required, get_jwt_identity
from sqlalchemy import select
from src import db
from src.models.book import Book, ReadingStatus
from src.models.category import Category

books_bp = Blueprint("books", __name__)


@books_bp.get("/")
@jwt_required()
def get_books():
    user_id = int(get_jwt_identity())
    books = db.session.execute(
        select(Book).where(Book.user_id == user_id)
    ).scalars().all()
    return jsonify([book.serialize() for book in books]), 200


@books_bp.get("/<int:book_id>")
@jwt_required()
def get_book(book_id):
    user_id = int(get_jwt_identity())
    book = db.session.execute(
        select(Book).where(Book.id == book_id, Book.user_id == user_id)
    ).scalar_one_or_none()
    if not book:
        return jsonify({"error": "Libro no encontrado"}), 404
    return jsonify(book.serialize()), 200


@books_bp.post("/")
@jwt_required()
def create_book():
    user_id = int(get_jwt_identity())
    data = request.get_json()

    if not data.get("title") or not data.get("author"):
        return jsonify({"error": "title y author son obligatorios"}), 400

    book = Book(
        title=data["title"],
        author=data["author"],
        cover_url=data.get("cover_url"),
        total_pages=data.get("total_pages"),
        rating=data.get("rating"),
        user_id=user_id,
    )

    category_ids = data.get("category_ids", [])
    if category_ids:
        categories = db.session.execute(
            select(Category).where(Category.id.in_(category_ids))
        ).scalars().all()
        book.categories = categories

    db.session.add(book)
    db.session.commit()

    return jsonify(book.serialize()), 201


@books_bp.put("/<int:book_id>")
@jwt_required()
def update_book(book_id):
    user_id = int(get_jwt_identity())
    book = db.session.execute(
        select(Book).where(Book.id == book_id, Book.user_id == user_id)
    ).scalar_one_or_none()

    if not book:
        return jsonify({"error": "Libro no encontrado"}), 404

    data = request.get_json()

    book.title = data.get("title", book.title)
    book.author = data.get("author", book.author)
    book.cover_url = data.get("cover_url", book.cover_url)
    book.total_pages = data.get("total_pages", book.total_pages)
    book.rating = data.get("rating", book.rating)

    if data.get("status"):
        book.status = ReadingStatus(data["status"])

    if "category_ids" in data:
        categories = db.session.execute(
            select(Category).where(Category.id.in_(data["category_ids"]))
        ).scalars().all()
        book.categories = categories

    db.session.commit()

    return jsonify(book.serialize()), 200


@books_bp.delete("/<int:book_id>")
@jwt_required()
def delete_book(book_id):
    user_id = int(get_jwt_identity())
    book = db.session.execute(
        select(Book).where(Book.id == book_id, Book.user_id == user_id)
    ).scalar_one_or_none()

    if not book:
        return jsonify({"error": "Libro no encontrado"}), 404

    db.session.delete(book)
    db.session.commit()

    return jsonify({"message": "Libro eliminado"}), 200