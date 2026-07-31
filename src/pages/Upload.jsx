import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/api";
import "../assets/css/upload.css";

function Upload() {

    const navigate = useNavigate();

    const [file, setFile] = useState(null);
    const [fileName, setFileName] = useState("No file selected");

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

        // Get Logged-in User
        const user = JSON.parse(localStorage.getItem("user"));

        const formData = new FormData();

        formData.append("resume", file);
        formData.append("email", user.email);

        try {

            const response = await API.post("/upload", formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            });

            alert(response.data.message);

            console.log(response.data);

            navigate("/dashboard", {
                state: response.data,
            });

        } catch (error) {

            console.log(error);

            alert("Upload Failed");

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
                >
                    Analyze Resume
                </button>

            </div>

        </div>
    );
}

export default Upload;