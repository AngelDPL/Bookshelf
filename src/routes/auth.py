from flask import Blueprint, request, jsonify
from flask_jwt_extended import create_access_token, jwt_required, get_jwt_identity
from src import db
from src.models.user import User
from sqlalchemy import select

auth_bp = Blueprint("auth", __name__)

@auth_bp.post("/register")
def register():
    data = request.get_json()

    if not data.get("username") or not data.get("email") or not data.get("password"):
        return jsonify({"error": "Username, email y password son obligatorios."}), 400

    if db.session.execute(
        select(User).where(User.email == data["email"])
    ).scalar():
        return jsonify({"error":"El email ya existe."}), 409

    if db.session.execute(
        select(User).where(User.username == data["username"])
    ).scalar():
        return jsonify({"error": "El usuario ya existe."}), 409

    user = User(
        username=data["username"],
        email=data["email"]
    )
    user.set_password(data["password"])

    db.session.add(user)
    db.session.commit()

    token = create_access_token(identity=str(user.id))

    return jsonify({"user": user.serialize(), "token": token}), 201


@auth_bp.post("/login")
def login():
    data = request.get_json()

    if not data.get("email") or not data.get("password"):
        return jsonify({"error": "email y password son obligatorios"}), 400

    user = db.session.execute(
        select(User).where(User.email == data["email"])
    ).scalar()

    if not user or not user.check_password(data["password"]):
        return jsonify({"error": "Credenciales incorrectas"}), 401

    token = create_access_token(identity=str(user.id))

    return jsonify({"user": user.serialize(), "token": token}), 200


@auth_bp.get("/me")
@jwt_required()
def me():
    user_id = get_jwt_identity()
    user = db.session.get(User, int(user_id))
    if not user:
        return jsonify({"error": "Usuario no encontrado"}), 404
    return jsonify(user.serialize()), 200