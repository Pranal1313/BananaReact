import React from "react";
import { Button } from "../components/ui/button";
import { Menu } from "lucide-react";
import { Link } from "react-router-dom";
import "./Navbar.css"; // Import CSS

export default function Navbar() {
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
          <Link to="/leaderboard" className="navbar-link">
            Leaderboard
          </Link>
          <Link to="/auth" className="navbar-link">
            Sign In
          </Link>
        </div>

        {/* Mobile Menu Icon */}
        <Button variant="ghost" size="icon" className="navbar-menu-btn">
          <Menu className="menu-icon" />
        </Button>
      </div>
    </nav>
  );
}
