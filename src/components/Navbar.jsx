import React, { useEffect, useState } from "react";
import { Button } from "../components/ui/button";
import { Menu } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "../firebaseConfig";
import "./Navbar.css";

export default function Navbar() {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, []);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      setUser(null);
      navigate("/auth"); // redirect to login page
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        {/* Left: Logo */}
        <div className="navbar-logo">
          <span className="navbar-emoji">🍌</span>
          <span className="navbar-title">Banana Brain Challenge</span>
        </div>

        {/* Right: Links */}
        <div className="navbar-links">
          <Link to="/" className="navbar-link">
            Home
          </Link>
          <Link to="/game" className="navbar-link">
            Game
          </Link>
          <Link to="/Leaderboard" className="navbar-link">
            Leaderboard
          </Link>

          {user ? (
            <button onClick={handleLogout} className="navbar-link logout-btn">
              Logout
            </button>
          ) : (
            <Link to="/auth" className="navbar-link">
              Login
            </Link>
          )}
        </div>

        {/* Mobile Menu Icon */}
        <Button variant="ghost" size="icon" className="navbar-menu-btn">
          <Menu className="menu-icon" />
        </Button>
      </div>
    </nav>
  );
}
