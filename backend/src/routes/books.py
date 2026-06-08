from flask import Blueprint, jsonify
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
    user_id = int(get_jwt_identity)
    book = db.session.execute(
        select(Book).where(Book.id == book_id, Book.user_id == user_id)
    ).scalar_one_or_none()
    if not book:
        return jsonify({"error": "Libro no encontrado"}), 404
    return jsonify(book.serialize()), 200


