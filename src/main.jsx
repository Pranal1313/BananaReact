// main.jsx
import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import App from "./App";                  // Home page
import Game from "./components/Game";     // Game page
import Auth from "./Auth";                // Sign In / Sign Up page
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        {/* 🏠 Home page */}
        <Route path="/" element={<App />} />

        {/* 🎮 Game page */}
        <Route path="/game" element={<Game />} />

        {/* 🔐 Sign-in / Auth page */}
        <Route path="/auth" element={<Auth />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
