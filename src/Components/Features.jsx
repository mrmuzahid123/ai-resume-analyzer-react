import "../assets/css/features.css";

import FeatureCard from "./FeatureCard";

import {
    FaFileAlt,
    FaChartBar,
    FaLightbulb,
    FaBullseye
} from "react-icons/fa";

function Features() {
    return (

        <section className="features">

            <h2 className="section-title">
                Why Choose Our AI Resume Analyzer?
            </h2>

            <div className="feature-container">

                <FeatureCard
                    icon={<FaFileAlt />}
                    title="Resume Analysis"
                    description="Analyze your resume structure, formatting and content to improve quality."
                />

                <FeatureCard
                    icon={<FaChartBar />}
                    title="ATS Score"
                    description="Check how well your resume performs with Applicant Tracking Systems."
                />

                <FeatureCard
                    icon={<FaLightbulb />}
                    title="AI Suggestions"
                    description="Receive intelligent recommendations to improve your resume instantly."
                />

                <FeatureCard
                    icon={<FaBullseye />}
                    title="Skill Recommendation"
                    description="Discover missing technical skills based on your desired job profile."
                />

            </div>

        </section>

    );
}

export default Features;