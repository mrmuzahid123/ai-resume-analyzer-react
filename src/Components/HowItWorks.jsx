import "../assets/css/howitworks.css";

import { FaUpload, FaRobot, FaChartLine } from "react-icons/fa";

function HowItWorks() {
  return (
    <section className="how-it-works">

      <h2 className="how-title">
        How It Works
      </h2>

      <p className="how-subtitle">
        Upload your resume, let our AI analyze it, and receive a detailed
        report with ATS score and personalized recommendations.
      </p>

      <div className="steps">

        <div className="step-card">

          <div className="step-icon">
            <FaUpload />
          </div>

          <h3>Upload Resume</h3>

          <p>
            Upload your resume in PDF or DOCX format securely.
          </p>

        </div>

        <div className="step-card">

          <div className="step-icon">
            <FaRobot />
          </div>

          <h3>AI Analysis</h3>

          <p>
            Our AI scans your resume, extracts skills and checks ATS compatibility.
          </p>

        </div>

        <div className="step-card">

          <div className="step-icon">
            <FaChartLine />
          </div>

          <h3>Get Report</h3>

          <p>
            Receive ATS Score, missing skills and improvement suggestions instantly.
          </p>

        </div>

      </div>

    </section>
  );
}

export default HowItWorks;