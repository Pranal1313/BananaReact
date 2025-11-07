import React, { useState, useEffect } from "react";
import Navbar from "./components/Navbar";
import "./Auth.css";

export default function Auth() {
  const [isLogin, setIsLogin] = useState(true);
  const [form, setForm] = useState({ username: "", email: "", password: "", confirm: "" });

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();

    const action = isLogin ? "login" : "signup";
    const response = await fetch("http://localhost/BananaReact/backend/auth.php", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        action,
        username: form.username,
        email: form.email,
        password: form.password,
      }),
    });

    const data = await response.json();
    alert(data.message);

    if (data.status === "success" && isLogin) {
      // Example redirect
      window.location.href = "/";
    }
  };

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);

  return (
    <div className="auth-container">
      <Navbar hideAuthLink />

      <div className={`auth-page ${!isLogin ? "signup-page" : ""}`}>
        <div className="auth-wrapper">
          <div className="auth-icon">🍌</div>
          {isLogin ? (
            <>
              <h2 className="auth-title">Welcome Back!</h2>
              <p className="auth-subtitle">Sign in to continue your brain training</p>
            </>
          ) : (
            <>
              <h2 className="auth-title">Join the Challenge!</h2>
              <p className="auth-subtitle">Create your account and start training your brain</p>
            </>
          )}

          <div className="auth-card">
            <form className="auth-form" onSubmit={handleSubmit}>
              {!isLogin && (
                <div className="input-group">
                  <input
                    type="text"
                    name="username"
                    placeholder="Choose a cool username"
                    onChange={handleChange}
                    required
                  />
                </div>
              )}
              <div className="input-group">
                <input
                  type="email"
                  name="email"
                  placeholder="email@example.com"
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="input-group">
                <input
                  type="password"
                  name="password"
                  placeholder={isLogin ? "Enter your password" : "Create a strong password"}
                  onChange={handleChange}
                  required
                />
              </div>
              {!isLogin && (
                <div className="input-group">
                  <input
                    type="password"
                    name="confirm"
                    placeholder="Confirm your password"
                    onChange={handleChange}
                    required
                  />
                </div>
              )}
              <button type="submit" className="auth-btn">
                {isLogin ? "Sign In" : "Create Account"}
              </button>
            </form>
          </div>

          {isLogin ? (
            <p className="auth-footer">
              Don't have an account?{" "}
              <span className="link" onClick={() => setIsLogin(false)}>Sign up now</span>
            </p>
          ) : (
            <p className="auth-footer">
              Already have an account?{" "}
              <span className="link" onClick={() => setIsLogin(true)}>Sign in here</span>
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
