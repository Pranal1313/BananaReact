
import React, { useRef, useState, useEffect } from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import App from "./App";
import Game from "./Game";
import Auth from "./Auth";
import Leaderboard from "./Leaderboard";
import "./index.css";

function Root() {
  const audioRef = useRef(null);
  const [isMuted, setIsMuted] = useState(false);


  useEffect(() => {
    const audio = audioRef.current;
    if (audio) {
      audio.volume = 0.5; 
      audio.play().catch(() => {
        
        console.log("Autoplay blocked — will play after first click.");
        document.addEventListener("click", () => {
          audio.play();
        }, { once: true });
      });
    }
  }, []);

  const toggleMute = () => {
    if (!audioRef.current) return;
    audioRef.current.muted = !isMuted;
    setIsMuted(!isMuted);
  };

  return (
    <>

      <audio ref={audioRef} src="/bgmusic.mp3" loop />

      <button
        onClick={toggleMute}
  style={{
  position: "fixed",
  top: "80px",
  left: "29px",
  zIndex: 9999,
  padding: "8px 27px",
  width: "118px",          
  borderRadius: "10px",
  fontWeight: "600",
  backgroundColor: "#fff9e6",
  border: "none",
  cursor: "pointer",
  boxShadow: "0px 2px 5px rgba(0,0,0,0.2)",
  whiteSpace: "nowrap",   
  overflow: "hidden",      
}}


      >
        {isMuted ? "Unmute 🔊" : "Mute 🔇"}
      </button>

     
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<App />} />
          <Route path="/game" element={<Game />} />
          <Route path="/leaderboard" element={<Leaderboard />} />
          <Route path="/auth" element={<Auth />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Root />
  </React.StrictMode>
);
