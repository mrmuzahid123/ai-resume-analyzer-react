from flask import Blueprint, request, jsonify
from pymongo import MongoClient
from dotenv import load_dotenv
import os

load_dotenv()

client = MongoClient(os.getenv("MONGO_URI"))
db = client["resume_analyzer"]

history_collection = db["resume_history"]

history_bp = Blueprint("history", __name__)


@history_bp.route("/history", methods=["GET"])
def get_history():

    email = request.args.get("email")

    if not email:
        return jsonify({
            "error": "Email is required"
        }), 400

    history = list(
        history_collection.find(
            {"email": email},
            {"_id": 0}
        ).sort("created_at", -1)
    )

    return jsonify(history)