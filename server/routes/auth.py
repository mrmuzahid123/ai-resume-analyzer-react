from flask import Blueprint, request, jsonify
from pymongo import MongoClient
from dotenv import load_dotenv
import bcrypt
import jwt
import datetime
import os

# Load Environment Variables
load_dotenv()

auth_bp = Blueprint("auth", __name__)

# MongoDB Connection
client = MongoClient(os.getenv("MONGO_URI"))
db = client["resume_analyzer"]
users = db["users"]


# ==========================
# Register API
# ==========================

@auth_bp.route("/register", methods=["POST"])
def register():

    data = request.get_json()

    name = data.get("name")
    email = data.get("email")
    password = data.get("password")

    # Validation
    if not name or not email or not password:
        return jsonify({
            "message": "All fields are required"
        }), 400

    # Check Existing User
    if users.find_one({"email": email}):
        return jsonify({
            "message": "Email already exists"
        }), 400

    # Hash Password
    hashed_password = bcrypt.hashpw(
        password.encode("utf-8"),
        bcrypt.gensalt()
    )

    # Save User
    users.insert_one({
        "name": name,
        "email": email,
        "password": hashed_password,
        "created_at": datetime.datetime.utcnow()
    })

    return jsonify({
        "message": "User Registered Successfully"
    }), 201


# ==========================
# Login API
# ==========================

@auth_bp.route("/login", methods=["POST"])
def login():

    data = request.get_json()

    email = data.get("email")
    password = data.get("password")

    # Validation
    if not email or not password:
        return jsonify({
            "message": "Email and Password are required"
        }), 400

    # Find User
    user = users.find_one({"email": email})

    if not user:
        return jsonify({
            "message": "Invalid Email"
        }), 401

    # Verify Password
    if not bcrypt.checkpw(
        password.encode("utf-8"),
        user["password"]
    ):
        return jsonify({
            "message": "Invalid Password"
        }), 401

    # Generate JWT Token
    token = jwt.encode(
        {
            "email": user["email"],
            "name": user["name"],
            "exp": datetime.datetime.utcnow() + datetime.timedelta(hours=24)
        },
        "resume_secret_key",
        algorithm="HS256"
    )

    return jsonify({
        "message": "Login Successful",
        "token": token,
        "user": {
            "name": user["name"],
            "email": user["email"]
        }
    }), 200