import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./Auth.css";
export default function Auth() {
  const [isLogin, setIsLogin] = useState(true);

  useEffect(() => {
    // Disable scrolling only on the Auth page
    document.body.style.overflow = "hidden";

    return () => {
      // Re-enable scrolling when leaving the Auth page
      document.body.style.overflow = "auto";
    };
  }, []);
  return (
    <div className="auth-container">
      {/* === Navbar === */}
      <nav className="navbar">
        <div className="navbar-inner">
          <div className="navbar-logo">
            <span className="logo-icon">🍌</span>
            <span className="logo-text">Banana Brain Challenge</span>
          </div>
          <div className="navbar-links">
            <Link to="/" className="nav-link">Home</Link>
            <a href="#" className="nav-link">Leaderboard</a>
            <a href="#" className="nav-link">How to Play</a>
            <Link to="/signin" className="nav-link">Sign In</Link>
          </div>
        </div>
      </nav>

      {/* === Auth Page === */}
      <div className={`auth-page ${!isLogin ? "signup-page" : ""}`}>
        <div className="auth-wrapper">
          <div className="auth-icon">🍌</div>
          {isLogin ? (
            <>
              <h2 className="auth-title">Welcome Back!</h2>
              <p className="auth-subtitle">
                Sign in to continue your brain training
              </p>
            </>
          ) : (
            <>
              <h2 className="auth-title">Join the Challenge!</h2>
              <p className="auth-subtitle">
                Create your account and start training your brain
              </p>
            </>
          )}

          <div className="auth-card">
            {isLogin ? (
              <form className="auth-form">
                <div className="input-group">
                  <label>Email</label>
                  <input type="email" placeholder="email@example.com" required />
                </div>
                <div className="input-group">
                  <label>Password</label>
                  <input type="password" placeholder="Enter your password" required />
                </div>
                <button type="submit" className="auth-btn">
                  Sign In
                </button>
              </form>
            ) : (
              <form className="auth-form">
                <div className="input-group">
                  <input type="text" placeholder="Choose a cool username" required />
                </div>
                <div className="input-group">
                  <input type="email" placeholder="Type your Email" required />
                </div>
                <div className="input-group">
                  <input type="password" placeholder="Create a strong password" required />
                </div>
                <div className="input-group">
                  <input type="password" placeholder="Confirm your password" required />
                </div>
                <button type="submit" className="auth-btn">
                  Create Account
                </button>
              </form>
            )}
          </div>

          {isLogin ? (
            <p className="auth-footer">
              Don't have an account?{" "}
              <span className="link" onClick={() => setIsLogin(false)}>
                Sign up now
              </span>
            </p>
          ) : (
            <p className="auth-footer">
              Already have an account?{" "}
              <span className="link" onClick={() => setIsLogin(true)}>
                Sign in here
              </span>
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
