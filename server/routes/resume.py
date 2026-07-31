from flask import Blueprint, request, jsonify
from werkzeug.utils import secure_filename
from pymongo import MongoClient
from dotenv import load_dotenv
from datetime import datetime
import os

from utils.parser import extract_text, extract_resume_details
from utils.skills import extract_skills
from utils.ats_score import calculate_ats_score
from utils.suggestions import generate_suggestions

# Load Environment Variables
load_dotenv()

# MongoDB Connection
client = MongoClient(os.getenv("MONGO_URI"))
db = client["resume_analyzer"]

history_collection = db["resume_history"]

resume_bp = Blueprint("resume", __name__)

UPLOAD_FOLDER = "uploads"


@resume_bp.route("/upload", methods=["POST"])
def upload_resume():

    # Check file
    if "resume" not in request.files:
        return jsonify({"error": "No file uploaded"}), 400

    file = request.files["resume"]

    if file.filename == "":
        return jsonify({"error": "No selected file"}), 400

    # Logged-in User Email
    email = request.form.get("email")

    # Create Upload Folder
    if not os.path.exists(UPLOAD_FOLDER):
        os.makedirs(UPLOAD_FOLDER)

    # Save File
    filename = secure_filename(file.filename)
    file_path = os.path.join(UPLOAD_FOLDER, filename)
    file.save(file_path)

    # Extract Resume Text
    text = extract_text(file_path)

    print("\n========== EXTRACTED TEXT ==========\n")
    print(text)
    print("\n===================================\n")

    # Extract Resume Details
    details = extract_resume_details(text)

    # Extract Skills
    skills, total_skills = extract_skills(text)

    # Calculate ATS Score
    ats_score = calculate_ats_score(skills, len(total_skills))

    # Missing Skills
    missing_skills = [
        skill for skill in total_skills
        if skill not in skills
    ]

    # AI Suggestions
    suggestions = generate_suggestions(
        ats_score,
        missing_skills
    )

    # Save Resume History
    history_collection.insert_one({
        "email": email,
        "filename": filename,
        "ats_score": ats_score,
        "skills_found": skills,
        "missing_skills": missing_skills,
        "resume_details": details,
        "suggestions": suggestions,
        "created_at": datetime.utcnow()
    })

    # Response
    return jsonify({
        "message": "Resume Uploaded Successfully",
        "filename": filename,
        "ats_score": ats_score,
        "skills_found": skills,
        "missing_skills": missing_skills,
        "resume_details": details,
        "suggestions": suggestions
    })