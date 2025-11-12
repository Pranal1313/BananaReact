// src/Leaderboard.jsx
import React, { useEffect, useState } from "react";
import Navbar from "./components/Navbar";
import "./Leaderboard.css";
import { db } from "./firebaseConfig";
import { ref, onValue } from "firebase/database";

export default function Leaderboard() {
  const [players, setPlayers] = useState([]);

  useEffect(() => {
    const leaderboardRef = ref(db, "leaderboard");

    // ✅ Listen for real-time updates
    const unsubscribe = onValue(leaderboardRef, (snapshot) => {
      if (snapshot.exists()) {
        const data = snapshot.val();
        const scoreArray = Object.keys(data).map((key) => ({
          uid: key,
          username: data[key].username || "Anonymous",
          time: data[key].time || 0,
        }));

        // ✅ Sort ascending by time
        scoreArray.sort((a, b) => a.time - b.time);

        setPlayers(scoreArray);
      } else {
        setPlayers([]);
      }
    });

    // ✅ Cleanup on unmount
    return () => unsubscribe();
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

          {players.length === 0 ? (
            <p className="no-scores">No scores yet — be the first to play!</p>
          ) : (
            players.map((p, index) => (
              <div
                key={p.uid}
                className={`table-row ${
                  index === 0
                    ? "gold"
                    : index === 1
                    ? "silver"
                    : index === 2
                    ? "bronze"
                    : ""
                }`}
              >
                <span className="col-rank">
                  <span className="medal">{index + 1}</span>
                </span>
                <span className="col-player">
                  <div className="avatar">{p.username.charAt(0).toUpperCase()}</div>
                  <span className="name">{p.username}</span>
                </span>
                <span className="col-time">
                  <span className="clock">⏱️</span> {p.time}s
                </span>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
