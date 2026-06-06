from flask import Blueprint, request, jsonify
from flask_jwt_extended import jwt_required
from sqlalchemy import select
from src import db
from src.models.category import Category

categories_bp = Blueprint("categories", __name__)


@categories_bp.get("/")
def get_categories():
    categories = db.session.execute(
        select(Category)
    ).scalars().all()
    return jsonify([category.serialize() for category in categories]), 200


@categories_bp.post("/")
@jwt_required()
def create_category():
    data = request.get_json()

    if not data.get("name"):
        return jsonify({"error": "name es obligatorio"}), 400

    if db.session.execute(
        select(Category).where(Category.name == data["name"])
    ).scalar():
        return jsonify({"error": "La categoria ya existe"}), 409

    category = Category(
        name=data["name"],
        color=data.get("color", "#6366f1")
    )

    db.session.add(category)
    db.session.commit()

    return jsonify(category.serialize()), 201


@categories_bp.delete("/<int:category_id>")
def delete_category(category_id):
    category = db.session.get(Category, category_id)

    if not category:
        return jsonify({"error": "Categoria no encontrada"}), 404

    db.session.delete(category)
    db.session.commit()

    return jsonify({"message": "Categoria eliminada"}), 200