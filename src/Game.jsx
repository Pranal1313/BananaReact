import React, { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "./components/Navbar";
import "./Game.css";

export default function Game() {
  const [puzzle, setPuzzle] = useState(null);
  const [answer, setAnswer] = useState("");
  const [feedback, setFeedback] = useState("");
  const [loading, setLoading] = useState(true);
  const [seconds, setSeconds] = useState(0);
  const [questionCount, setQuestionCount] = useState(0);
  const [isFinished, setIsFinished] = useState(false);
  const [penalty, setPenalty] = useState(0);

  // Fetch a puzzle
  const fetchPuzzle = async () => {
    try {
      setLoading(true);
      const res = await axios.get("https://marcconrad.com/uob/banana/api.php");
      setPuzzle(res.data);
      setFeedback("");
      setAnswer("");
      setLoading(false);
    } catch (err) {
      setFeedback("⚠️ Could not load puzzle. Please try again.");
      setLoading(false);
    }
  };

  // Load the first puzzle
  useEffect(() => {
    fetchPuzzle();
  }, []);

  // Timer
  useEffect(() => {
    if (isFinished) return;
    const timer = setInterval(() => {
      setSeconds((prev) => prev + 1);
    }, 1000);
    return () => clearInterval(timer);
  }, [isFinished]);

  const checkAnswer = () => {
    if (!puzzle || isFinished) return;
    const userAnswer = parseInt(answer, 10);

    if (isNaN(userAnswer)) {
      setFeedback("❌ Please enter a number!");
      return;
    }

    if (userAnswer === puzzle.solution) {
      setFeedback("✅ Correct!");
      const nextCount = questionCount + 1;

      if (nextCount < 5) {
        setQuestionCount(nextCount);
        fetchPuzzle();
      } else {
        setIsFinished(true);
      }
    } else {
      setFeedback("❌ Wrong! +15 sec penalty added!");
      setPenalty((prev) => prev + 15);
    }

    setAnswer("");
  };

  const finalTime = seconds + penalty;

  // Format seconds
  const formatTime = (t) => (t < 10 ? `0${t}` : t);

  return (
    <div className="game-page">
      {/* Timer */}
      <div className="timer-display">⏱️ {formatTime(seconds)}s</div>

      <Navbar />

      <div className="game-container">
        <h1 className="title">🍌 Banana Brain Challenge 🍌</h1>

        {!isFinished ? (
          <>
            <p className="instructions">
              Solve 5 puzzles as fast as you can! Wrong answers = +15s ⏱️
            </p>
            <h2>Question {questionCount + 1} / 5</h2>

            {loading ? (
              <p className="loading-text">Loading puzzle...</p>
            ) : (
              <>
                <div className="puzzle-section">
                  <img
                    src={puzzle?.question}
                    alt="Banana Puzzle"
                    className="puzzle-image"
                  />
                </div>

                <div className="input-section">
                  <input
                    type="number"
                    placeholder="Enter your answer"
                    value={answer}
                    onChange={(e) => setAnswer(e.target.value)}
                    className="answer-input"
                  />
                  <button onClick={checkAnswer} className="btn check">
                    Submit
                  </button>
                </div>

                <p className="feedback">{feedback}</p>
              </>
            )}
          </>
        ) : (
          <div className="results-section">
            <h2>🏁 Challenge Complete!</h2>
            <p>Total Time: {seconds}s</p>
            <p>Penalty Time: +{penalty}s</p>
            <h3>🎯 Final Time: {finalTime}s</h3>
            <button
              onClick={() => {
                setIsFinished(false);
                setSeconds(0);
                setPenalty(0);
                setQuestionCount(0);
                fetchPuzzle();
              }}
              className="btn restart"
            >
              Play Again
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
