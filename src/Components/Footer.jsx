import "../assets/css/footer.css";
import { Link } from "react-router-dom";

function Footer() {
  return (
    <footer className="footer">

      <div className="footer-container">

        <div className="footer-about">
          <h2>AI Resume Analyzer</h2>

          <p>
            Build professional resumes with AI-powered analysis,
            ATS score and personalized career recommendations.
          </p>
        </div>

        <div className="footer-links">
          <h3>Quick Links</h3>

          <Link to="/">Home</Link>
          <Link to="/">Features</Link>
          <Link to="/upload">Upload Resume</Link>
          <Link to="/dashboard">Dashboard</Link>
          <Link to="/contact">Contact</Link>
        </div>

        <div className="footer-contact">
          <h3>Contact</h3>

          <p>Email: support@airesumeanalyzer.com</p>
          <p>Phone: +91 8077115653</p>
        </div>

      </div>

      <hr />

      <p className="copyright">
        © 2026 AI Resume Analyzer | All Rights Reserved
      </p>

    </footer>
  );
}

export default Footer;