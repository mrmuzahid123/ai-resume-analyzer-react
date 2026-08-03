from flask import Blueprint, request, jsonify
from pymongo import MongoClient
from dotenv import load_dotenv
import bcrypt
import jwt
import datetime
import os

# ==========================
# Load Environment Variables
# ==========================
load_dotenv()

auth_bp = Blueprint("auth", __name__)

# ==========================
# MongoDB Connection
# ==========================
client = MongoClient(os.getenv("MONGO_URI"))
db = client["resume_analyzer"]
users = db["users"]

# JWT Secret Key
SECRET_KEY = "resume_secret_key"


# ==========================
# Register API
# ==========================
@auth_bp.route("/register", methods=["POST"])
def register():

    try:

        data = request.get_json()

        if not data:
            return jsonify({
                "message": "Invalid Request"
            }), 400

        name = data.get("name")
        email = data.get("email")
        password = data.get("password")

        # Validation
        if not name or not email or not password:
            return jsonify({
                "message": "All fields are required"
            }), 400

        # Existing User
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

    except Exception as e:

        print("REGISTER ERROR:", e)

        return jsonify({
            "message": str(e)
        }), 500


# ==========================
# Login API
# ==========================
@auth_bp.route("/login", methods=["POST"])
def login():

    try:

        data = request.get_json()

        if not data:
            return jsonify({
                "message": "Invalid Request"
            }), 400

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

        # Check Password
        if not bcrypt.checkpw(
            password.encode("utf-8"),
            user["password"]
        ):
            return jsonify({
                "message": "Invalid Password"
            }), 401

        # Generate JWT
        token = jwt.encode(
            {
                "email": user["email"],
                "name": user["name"],
                "exp": datetime.datetime.utcnow() + datetime.timedelta(hours=24)
            },
            SECRET_KEY,
            algorithm="HS256"
        )

        # Compatibility
        if isinstance(token, bytes):
            token = token.decode("utf-8")

        return jsonify({
            "message": "Login Successful",
            "token": token,
            "user": {
                "name": user["name"],
                "email": user["email"]
            }
        }), 200

    except Exception as e:

        print("LOGIN ERROR:", e)

        return jsonify({
            "message": str(e)
        }), 500