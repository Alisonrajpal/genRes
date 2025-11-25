import React from "react";
import { Link } from "react-router-dom";
import {
  FileText,
  Brain,
  CheckCircle,
  Download,
  Sparkles,
  Rocket,
  Users,
  Shield,
  Palette,
} from "lucide-react";
import "./Home.css";

const Home: React.FC = () => {
  return (
    <div className="home-container">
      {/* Hero Section with Mesh Blob Animation */}
      <section className="hero-section">
        {/* Mesh Blob Gradient Background */}
        <div className="blob-container">
          <div className="blob blob-1"></div>
          <div className="blob blob-2"></div>
          <div className="blob blob-3"></div>
        </div>

        {/* Stars background */}
        <div className="hero-stars">
          {[...Array(25)].map((_, i) => (
            <div
              key={i}
              className="hero-star"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 3}s`,
              }}
            />
          ))}
        </div>

        <div className="hero-content">
          <h1 className="hero-title">
            Build Your AI-Powered Resume
          </h1>
          <p className="hero-subtitle">
            Create a professional resume in minutes using our AI-powered builder.
            Powered by intelligence, crafted for success.
          </p>
          <div className="hero-buttons">
            <Link
              to="/builder"
              className="btn btn-primary"
            >
              <Rocket className="h-5 w-5" />
              Start Building
            </Link>
            <Link
              to="/templates"
              className="btn btn-secondary"
            >
              <Palette className="h-5 w-5" />
              View Templates
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="features-section">
        <h2 className="section-title">
          Why Choose Our Resume Builder?
        </h2>
        <div className="features-grid">
          {/* Feature 1 */}
          <div className="feature-card">
            <Brain className="feature-icon" />
            <h3 className="feature-title">
              AI-Powered Content
            </h3>
            <p className="feature-text">
              Let our AI help you craft compelling descriptions for your work
              experience and skills.
            </p>
          </div>

          {/* Feature 2 */}
          <div className="feature-card">
            <Sparkles className="feature-icon" />
            <h3 className="feature-title">
              Beautiful Templates
            </h3>
            <p className="feature-text">
              Choose from professionally designed templates that make your resume
              stand out.
            </p>
          </div>

          {/* Feature 3 */}
          <div className="feature-card">
            <Download className="feature-icon" />
            <h3 className="feature-title">
              Easy Export
            </h3>
            <p className="feature-text">
              Download your resume as PDF or share it directly with employers.
            </p>
          </div>

          {/* Feature 4 */}
          <div className="feature-card">
            <CheckCircle className="feature-icon" />
            <h3 className="feature-title">
              Easy to Use
            </h3>
            <p className="feature-text">
              Simple, intuitive interface that doesn't require any design skills.
            </p>
          </div>

          {/* Feature 5 */}
          <div className="feature-card">
            <Shield className="feature-icon" />
            <h3 className="feature-title">
              Secure & Private
            </h3>
            <p className="feature-text">
              Your data is safe with us. We never share your information with
              third parties.
            </p>
          </div>

          {/* Feature 6 */}
          <div className="feature-card">
            <Users className="feature-icon" />
            <h3 className="feature-title">
              Trusted by Thousands
            </h3>
            <p className="feature-text">
              Join thousands of professionals who've built their careers with us.
            </p>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta-section">
        <div className="cta-content">
          <h2 className="cta-title">Ready to Get Started?</h2>
          <p className="cta-subtitle">
            Create your professional resume in just a few minutes.
          </p>
          <Link
            to="/builder"
            className="btn btn-cta"
          >
            <Rocket className="h-5 w-5" />
            Start Building Now
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Home;
