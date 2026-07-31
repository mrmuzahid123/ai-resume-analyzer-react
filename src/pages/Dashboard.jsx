import jsPDF from "jspdf";
import { useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import API from "../services/api";
import "../assets/css/dashboard.css";

function Dashboard() {

  const location = useLocation();

  const [history, setHistory] = useState([]);

  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {

    const fetchHistory = async () => {

      try {

        const response = await API.get(
          `/history?email=${user.email}`
        );

        setHistory(response.data);

      } catch (error) {

        console.log(error);

      }

    };

    fetchHistory();

  }, []);

  const data = location.state || {};

  const atsScore = data.ats_score || 0;
  const skillsFound = data.skills_found || [];
  const missingSkills = data.missing_skills || [];
  const details = data.resume_details || {};
  const suggestions = data.suggestions || [];

  // PDF Download
  const downloadReport = () => {

    const doc = new jsPDF();

    doc.setFontSize(20);
    doc.text("AI Resume Analyzer Report", 20, 20);

    doc.setFontSize(14);

    doc.text(`Name: ${details.name || "N/A"}`, 20, 40);
    doc.text(`Email: ${details.email || "N/A"}`, 20, 50);
    doc.text(`Phone: ${details.phone || "N/A"}`, 20, 60);

    doc.text(`ATS Score: ${atsScore}%`, 20, 75);

    let y = 90;
        doc.text("Skills Found:", 20, y);
    y += 10;

    skillsFound.forEach((skill) => {
      doc.text("• " + skill, 25, y);
      y += 8;
    });

    y += 10;

    doc.text("Missing Skills:", 20, y);
    y += 10;

    missingSkills.forEach((skill) => {
      doc.text("• " + skill, 25, y);
      y += 8;
    });

    y += 10;

    doc.text("AI Suggestions:", 20, y);
    y += 10;

    suggestions.forEach((item) => {
      doc.text("• " + item, 25, y);
      y += 8;
    });

    doc.save("Resume_Report.pdf");

  };
    return (
    <div className="dashboard-page">

      {/* Header */}
      <div className="dashboard-header">
        <h1>AI Resume Analyzer Dashboard</h1>
        <p>Analyze your resume and improve your ATS score</p>
      </div>

      {/* Cards */}
      <div className="dashboard-cards">

        <div className="card">
          <h3>ATS Score</h3>
          <h2>{atsScore}%</h2>
        </div>

        <div className="card">
          <h3>Resume Score</h3>
          <h2>{atsScore}%</h2>
        </div>

        <div className="card">
          <h3>Skills Found</h3>
          <h2>{skillsFound.length}</h2>
        </div>

        <div className="card">
          <h3>Missing Skills</h3>
          <h2>{missingSkills.length}</h2>
        </div>

      </div>

      {/* Resume Details + Missing Skills */}
      <div className="dashboard-content">

        <div className="resume-preview">

          <h2>Resume Details</h2>

          <div className="preview-box">
            <p><strong>Name :</strong> {details.name || "N/A"}</p>
            <p><strong>Email :</strong> {details.email || "N/A"}</p>
            <p><strong>Phone :</strong> {details.phone || "N/A"}</p>
          </div>

        </div>

        <div className="ai-suggestions">

          <h2>Missing Skills</h2>

          <ul>
            {
              missingSkills.length > 0 ? (
                missingSkills.map((skill, index) => (
                  <li key={index}>❌ {skill}</li>
                ))
              ) : (
                <p>No Missing Skills</p>
              )
            }
          </ul>

        </div>

      </div>
            {/* Skills Found */}
      <div className="resume-preview" style={{ marginTop: "30px" }}>

        <h2>Skills Found</h2>

        <div className="preview-box">

          <ul>
            {
              skillsFound.length > 0 ? (
                skillsFound.map((skill, index) => (
                  <li key={index}>✅ {skill}</li>
                ))
              ) : (
                <p>No Skills Found</p>
              )
            }
          </ul>

        </div>

      </div>

      {/* AI Suggestions */}
      <div className="resume-preview" style={{ marginTop: "30px" }}>

        <h2>AI Suggestions</h2>

        <div className="preview-box">

          <ul>
            {
              suggestions.length > 0 ? (
                suggestions.map((item, index) => (
                  <li key={index}>💡 {item}</li>
                ))
              ) : (
                <p>No Suggestions</p>
              )
            }
          </ul>

        </div>

      </div>

      {/* Download Report Button */}
      <div style={{ textAlign: "center", marginTop: "30px" }}>

        <button
          onClick={downloadReport}
          style={{
            background: "#2563eb",
            color: "#fff",
            border: "none",
            padding: "15px 35px",
            borderRadius: "10px",
            fontSize: "16px",
            cursor: "pointer",
            fontWeight: "bold"
          }}
        >
          📄 Download PDF Report
        </button>

      </div>

      {/* Resume History */}
      <div className="resume-preview" style={{ marginTop: "40px" }}>

        <h2>Resume History</h2>

        {
          history.length === 0 ? (

            <div className="preview-box">
              <p>No Resume History Found</p>
            </div>

          ) : (

            history.map((item, index) => (

              <div
                key={index}
                className="preview-box"
                style={{ marginBottom: "20px" }}
              >

                <p><strong>Resume:</strong> {item.filename}</p>

                <p><strong>ATS Score:</strong> {item.ats_score}%</p>

                <p><strong>Email:</strong> {item.email}</p>

                <p>
                  <strong>Date:</strong>{" "}
                  {new Date(item.created_at).toLocaleString()}
                </p>

              </div>

            ))

          )
        }

      </div>

    </div>
  );
}

export default Dashboard;