import React, { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "../components/Navbar";
import "./Game.css";

export default function Game() {
  const [puzzle, setPuzzle] = useState(null);
  const [answer, setAnswer] = useState("");
  const [feedback, setFeedback] = useState("");
  const [loading, setLoading] = useState(true);
  const [seconds, setSeconds] = useState(0);

  // Fetch puzzle from Banana API
  const fetchPuzzle = async () => {
    try {
      setLoading(true);
      const res = await axios.get("https://marcconrad.com/uob/banana/api.php");
      setPuzzle(res.data);
      setFeedback("");
      setAnswer("");
      setSeconds(0); // Reset timer when new puzzle loads
    } catch (err) {
      console.error("Error fetching puzzle:", err);
      setFeedback("⚠️ Could not load puzzle. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // Load puzzle on first render
  useEffect(() => {
    fetchPuzzle();
  }, []);

  // Simple timer count-up
  useEffect(() => {
    const interval = setInterval(() => {
      setSeconds((prev) => prev + 1);
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const checkAnswer = () => {
    if (!puzzle) return;

    const userAnswer = parseInt(answer, 10);
    if (isNaN(userAnswer)) {
      setFeedback("❌ Please enter a number!");
      return;
    }

    if (userAnswer === puzzle.solution) {
      setFeedback("✅ Correct! Great job!");
    } else {
      setFeedback("❌ Wrong! Try again!");
    }
  };

  // Format seconds as two-digit string
  const formattedTime = seconds < 10 ? `0${seconds}` : seconds;

  return (
    <div className="game-page">
      {/* Timer Display top-right */}
      <div className="timer-display" aria-label="Timer">
        ⏱️: {formattedTime}
      </div>

      {/* Navbar */}
      <Navbar />

      <div className="game-container">
        <h1 className="title">Round 1</h1>

        {loading ? (
          <p className="loading-text">Loading puzzle...</p>
        ) : (
          <>
            {/* Puzzle Image */}
            <div className="puzzle-section">
              <img
                src={puzzle?.question}
                alt="Banana Puzzle"
                className="puzzle-image"
              />
            </div>

            {/* Input Section */}
            <div className="input-section">
              <input
                type="number"
                placeholder="Enter your answer"
                value={answer}
                onChange={(e) => setAnswer(e.target.value)}
                className="answer-input"
              />
              <div className="buttons">
                <button onClick={checkAnswer} className="btn check">
                  Enter
                </button>
                <button onClick={fetchPuzzle} className="btn next">
                  Next Puzzle
                </button>
              </div>
            </div>

            {/* Feedback */}
            <p className="feedback">{feedback}</p>
          </>
        )}
      </div>
    </div>
  );
}
