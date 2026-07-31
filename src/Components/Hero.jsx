import "../assets/css/hero.css";

function Hero() {
  return (
    <section className="hero">
      <div className="hero-content">
        <h1>Analyze Your Resume with AI</h1>

        <p>
          Upload your resume and get AI-powered analysis,
          ATS score, skill recommendations and personalized
          suggestions to improve your chances of getting hired.
        </p>

        <div className="hero-buttons">
          <button className="btn-primary">Upload Resume</button>
          <button className="btn-secondary">Learn More</button>
        </div>
      </div>

    <div className="hero-image">
      <div>
        <h2>Resume Preview</h2>
      </div>
  </div>
    </section>
  );
}

export default Hero;