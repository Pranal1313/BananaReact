import React, { useEffect, useState } from "react";
import { Button } from "../components/ui/button";
import { Menu } from "lucide-react";
import { Link } from "react-router-dom";
import "./Navbar.css"; 
import { auth } from "../firebaseConfig";
import { onAuthStateChanged, signOut } from "firebase/auth";

export default function Navbar() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, []);

  const handleLogout = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      console.error("Logout error:", error);
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
          <Link to="/" className="navbar-link">Home</Link>
          <Link to="/game" className="navbar-link">Game</Link>
          <Link to="/Leaderboard" className="navbar-link">Leaderboard</Link>

          {!user && (
            <Link to="/auth" className="navbar-link">Login</Link>
          )}

          {user && (
            <span 
              className="navbar-link cursor-pointer"
              onClick={handleLogout}
            >
              Logout
            </span>
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
