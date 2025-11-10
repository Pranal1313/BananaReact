import React, { useEffect, useState } from "react";
import Navbar from "./components/Navbar";
import "./Leaderboard.css";

export default function Leaderboard() {
  const [players, setPlayers] = useState([]);

  useEffect(() => {
    // Simulate leaderboard data
    setPlayers([
      { rank: 1, name: "BananaKing", time: "1:23" },
      { rank: 2, name: "MathWizard", time: "1:45" },
      { rank: 3, name: "Logic Ninja", time: "2:05" },
    ]);
  }, []);

  return (
    <div className="leaderboard-page">
      <Navbar />

      <div className="leaderboard-container">
        <div className="header-section">
          <div className="trophy-icon">🏆</div>
          <h2>Leaderboard</h2>
          <p className="subtitle">Top players in Banana Brain Challenge</p>
        </div>

        <div className="table">
          <div className="table-header">
            <span className="col-rank">Rank</span>
            <span className="col-player">Player</span>
            <span className="col-time">Time</span>
          </div>

          {players.map((p) => (
            <div
              key={p.rank}
              className={`table-row ${
                p.rank === 1 ? "gold" : p.rank === 2 ? "silver" : "bronze"
              }`}
            >
              <span className="col-rank">
                <span className="medal">{p.rank}</span>
              </span>
              <span className="col-player">
                <div className="avatar">{p.name.charAt(0)}</div>
                <span className="name">{p.name}</span>
              </span>
              <span className="col-time">
                <span className="clock">⏱️</span> {p.time}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}