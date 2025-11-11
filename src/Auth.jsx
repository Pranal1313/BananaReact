import React, { useState, useEffect } from "react";
import Navbar from "./components/Navbar";
import "./Auth.css";
import { auth, provider, db } from "./firebaseConfig";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signInWithPopup,
} from "firebase/auth";
import { ref, set } from "firebase/database";

export default function Auth() {
  const [isLogin, setIsLogin] = useState(true);
  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
    confirm: "",
  });

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (isLogin) {
        await signInWithEmailAndPassword(auth, form.email, form.password);
        alert("Login successful!");
      } else {
        if (form.password !== form.confirm) {
          alert("Passwords do not match!");
          return;
        }

        const userCredential = await createUserWithEmailAndPassword(
          auth,
          form.email,
          form.password
        );
        const user = userCredential.user;

        await set(ref(db, "users/" + user.uid), {
          username: form.username,
          email: form.email,
        });

        alert("Account created successfully!");
      }

      window.location.href = "/";
    } catch (error) {
      alert(error.message);
    }
  };

  const handleGoogleLogin = async () => {
    try {
      provider.setCustomParameters({ prompt: "select_account" });
      const result = await signInWithPopup(auth, provider);
      const user = result.user;

      await set(ref(db, "users/" + user.uid), {
        username: user.displayName,
        email: user.email,
      });

      alert("Google Sign-in successful!");
      window.location.href = "/";
    } catch (error) {
      if (
        error.code === "auth/cancelled-popup-request" ||
        error.code === "auth/popup-closed-by-user"
      ) {
        console.log("Google sign-in popup closed or cancelled — ignoring.");
        return;
      }
      alert(error.message);
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
          {/* 🍌 Only show banana icon on login page */}
          {isLogin && <div className="auth-icon">🍌</div>}

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
                  placeholder={
                    isLogin
                      ? "Enter your password"
                      : "Create a strong password"
                  }
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

              {/* ✅ Styled Google Sign-in Button */}
              <button
                type="button"
                onClick={handleGoogleLogin}
                className="google-btn match-auth"
              >
                <img
                  src="https://developers.google.com/identity/images/g-logo.png"
                  alt="Google Logo"
                  className="google-logo"
                />
                <span>Sign in with Google</span>
              </button>
            </form>
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
