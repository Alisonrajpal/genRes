import React, { useState } from "react";
import { signUp, signIn } from "../../services/supabaseClient";
import "./SignIn.css";

interface SignInProps {
  onSuccess?: () => void;
}

const SignIn: React.FC<SignInProps> = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSignUp, setIsSignUp] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      if (isSignUp) {
        await signUp(email, password);
        setError(null);
        alert("Sign up successful! Please check your email to confirm.");
      } else {
        await signIn(email, password);
        window.location.href = "/";
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Authentication failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="signin-container">
      {/* Animated Globe Background */}
      <div className="globe-background">
        <svg className="globe" viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <radialGradient id="globeGradient" cx="35%" cy="35%">
              <stop offset="0%" stopColor="rgba(59, 130, 246, 0.3)" />
              <stop offset="100%" stopColor="rgba(29, 78, 216, 0.1)" />
            </radialGradient>
          </defs>
          <circle cx="100" cy="100" r="95" fill="url(#globeGradient)" stroke="rgba(59, 130, 246, 0.2)" strokeWidth="2" />
          {/* Continents simplified */}
          <path d="M 40 60 Q 50 55 60 65 L 65 75 L 55 80 Z" fill="rgba(96, 165, 250, 0.4)" />
          <path d="M 130 50 Q 145 55 150 70 L 145 85 Q 130 80 125 65 Z" fill="rgba(96, 165, 250, 0.4)" />
          <path d="M 60 110 Q 75 105 85 115 L 80 130 Q 65 128 60 120 Z" fill="rgba(96, 165, 250, 0.4)" />
          {/* Latitude/Longitude grid */}
          <circle cx="100" cy="100" r="50" fill="none" stroke="rgba(59, 130, 246, 0.15)" strokeWidth="1" />
          <circle cx="100" cy="100" r="70" fill="none" stroke="rgba(59, 130, 246, 0.1)" strokeWidth="1" />
          <line x1="30" y1="100" x2="170" y2="100" stroke="rgba(59, 130, 246, 0.1)" strokeWidth="1" />
          <line x1="100" y1="30" x2="100" y2="170" stroke="rgba(59, 130, 246, 0.1)" strokeWidth="1" />
        </svg>
      </div>

      {/* Stars background */}
      <div className="stars">
        {[...Array(30)].map((_, i) => (
          <div
            key={i}
            className="star"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
            }}
          />
        ))}
      </div>

      {/* Auth Form */}
      <div className="auth-form-container">
        <div className="auth-form-card">
          <div className="form-header">
            <h1 className="form-title">
              {isSignUp ? "Create Account" : "Sign In"}
            </h1>
            <p className="form-subtitle">
              {isSignUp
                ? "Join us to build your perfect resume"
                : "Welcome back to AI Resume Builder"}
            </p>
          </div>

          <form onSubmit={handleSubmit} className="form">
            <div className="form-group">
              <label className="form-label">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="form-input"
                placeholder="you@example.com"
              />
            </div>

            <div className="form-group">
              <label className="form-label">Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="form-input"
                placeholder="••••••••"
              />
            </div>

            {error && <div className="error-message">{error}</div>}

            <button
              type="submit"
              disabled={loading}
              className="submit-button"
            >
              {loading
                ? "Loading..."
                : isSignUp
                ? "Create Account"
                : "Sign In"}
            </button>
          </form>

          <div className="form-footer">
            <p className="footer-text">
              {isSignUp ? "Already have an account?" : "Don't have an account?"}{" "}
              <button
                onClick={() => {
                  setIsSignUp(!isSignUp);
                  setError(null);
                }}
                className="toggle-button"
              >
                {isSignUp ? "Sign In" : "Sign Up"}
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
