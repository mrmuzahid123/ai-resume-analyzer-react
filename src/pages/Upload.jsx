import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/api";
import "../assets/css/upload.css";

function Upload() {

    const navigate = useNavigate();

    const [file, setFile] = useState(null);
    const [fileName, setFileName] = useState("No file selected");
    const [loading, setLoading] = useState(false);

    const handleFileChange = (e) => {

        const selectedFile = e.target.files[0];

        if (selectedFile) {
            setFile(selectedFile);
            setFileName(selectedFile.name);
        }

    };

    const handleUpload = async () => {

        if (!file) {
            alert("Please select a resume.");
            return;
        }

        const user = JSON.parse(localStorage.getItem("user"));

        if (!user || !user.email) {
            alert("Please login first.");
            navigate("/login");
            return;
        }

        setLoading(true);

        const formData = new FormData();

        formData.append("resume", file);
        formData.append("email", user.email);

        try {

            const response = await API.post("/upload", formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            });

            console.log("Upload Response:", response.data);

            alert(response.data.message);

            navigate("/dashboard", {
                state: response.data,
            });

        } catch (error) {

            console.error("Upload Error:", error);

            if (error.response) {
                alert(error.response.data.message || "Upload Failed");
            } else if (error.request) {
                alert("Cannot connect to backend server.");
            } else {
                alert(error.message);
            }

        } finally {

            setLoading(false);

        }

    };

    return (

        <div className="upload-page">

            <div className="upload-card">

                <h2>Upload Your Resume</h2>

                <p className="upload-text">
                    Upload your resume in PDF or DOC/DOCX format.
                </p>

                <div className="upload-box">

                    <div className="upload-icon">📄</div>

                    <h3>Choose Resume</h3>

                    <label htmlFor="resume" className="choose-btn">
                        Choose File
                    </label>

                    <input
                        type="file"
                        id="resume"
                        accept=".pdf,.doc,.docx"
                        hidden
                        onChange={handleFileChange}
                    />

                </div>

                <div className="file-name">
                    Selected File : {fileName}
                </div>

                <button
                    className="analyze-btn"
                    onClick={handleUpload}
                    disabled={loading}
                >
                    {loading ? "Analyzing Resume..." : "Analyze Resume"}
                </button>

            </div>

        </div>

    );
}

export default Upload;