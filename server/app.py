from flask import Flask
from flask_cors import CORS

from routes.resume import resume_bp
from routes.auth import auth_bp
from routes.history import history_bp

from pymongo import MongoClient
from dotenv import load_dotenv
import os

# ==========================
# Load Environment Variables
# ==========================

load_dotenv()

app = Flask(__name__)

# ==========================
# Enable CORS
# ==========================

CORS(app)

# ==========================
# MongoDB Connection
# ==========================

MONGO_URI = os.getenv("MONGO_URI")

client = MongoClient(MONGO_URI)

db = client["resume_analyzer"]

try:
    client.admin.command("ping")
    print("✅ MongoDB Connected Successfully")
except Exception as e:
    print("❌ MongoDB Connection Failed")
    print(e)

# ==========================
# Register Blueprints
# ==========================

app.register_blueprint(resume_bp)
app.register_blueprint(auth_bp)
app.register_blueprint(history_bp)

# ==========================
# Home Route
# ==========================

@app.route("/")
def home():
    return {
        "message": "Backend Running Successfully",
        "database": "MongoDB Connected"
    }

# ==========================
# Run Server
# ==========================

if __name__ == "__main__":
    port = int(os.environ.get("PORT", 5000))
    app.run(host="0.0.0.0", port=port)