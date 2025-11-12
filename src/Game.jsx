import React, { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "./components/Navbar";
import { useNavigate } from "react-router-dom";
import "./Game.css";
import { saveScore } from "./Score"; // ✅ Correct import
import { auth } from "./firebaseConfig";

export default function Game() {
  const [puzzle, setPuzzle] = useState(null);
  const [answer, setAnswer] = useState("");
  const [feedback, setFeedback] = useState("");
  const [loading, setLoading] = useState(true);
  const [seconds, setSeconds] = useState(0);
  const [questionCount, setQuestionCount] = useState(0);
  const [isFinished, setIsFinished] = useState(false);
  const [penalty, setPenalty] = useState(0);
  const [saving, setSaving] = useState(false);
  const [saveMessage, setSaveMessage] = useState("");

  const navigate = useNavigate();

  // ✅ Fetch puzzle
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

  useEffect(() => {
    fetchPuzzle();
  }, []);

  // ✅ Timer logic
  useEffect(() => {
    if (isFinished) return;
    const timer = setInterval(() => {
      setSeconds((prev) => prev + 1);
    }, 1000);
    return () => clearInterval(timer);
  }, [isFinished]);

  // ✅ Handle Enter key
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Enter" && !isFinished) {
        checkAnswer();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  });

  // ✅ Check answer
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

      if (nextCount < 1) {
        // currently only 1 round (can increase later)
        setTimeout(() => {
          setQuestionCount(nextCount);
          fetchPuzzle();
        }, 1000);
      } else {
        setIsFinished(true);
      }
    } else {
      setFeedback("❌ Wrong! +30s penalty!");
      setPenalty((prev) => prev + 30);
      setTimeout(() => {
        fetchPuzzle();
      }, 1000);
    }

    setAnswer("");
  };

  // ✅ Restart Game
  const handleRestart = () => {
    setQuestionCount(0);
    setSeconds(0);
    setPenalty(0);
    setIsFinished(false);
    setSaving(false);
    setSaveMessage("");
    fetchPuzzle();
  };

  const finalTime = seconds + penalty;
  const formatTime = (t) => (t < 10 ? `0${t}` : t);

  // ✅ Save score after finishing
  useEffect(() => {
    const saveUserScore = async () => {
      if (!isFinished) return;
      if (!auth.currentUser) return;

      setSaving(true);
      try {
        // ✅ only pass uid and time
        await saveScore(auth.currentUser.uid, finalTime);
        setSaveMessage("✅ Your time has been saved!");
      } catch (err) {
        console.error("Error saving score:", err);
        setSaveMessage("❌ Failed to save time. Try again.");
      } finally {
        setSaving(false);
      }
    };

    saveUserScore();
  }, [isFinished, finalTime]);

  return (
    <div className="game-page">
      <div className="restart-button">
        🔁 <button onClick={handleRestart}>Restart</button>
      </div>

      <div className="timer-display">⏱️ {formatTime(seconds)}s</div>

      <Navbar />

      {!isFinished ? (
        <div className="game-container">
          <h2>Round {questionCount + 1}</h2>

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
        </div>
      ) : (
        <div className="result-section">
          <h2 className="result-title">🎉 Challenge Complete!</h2>

          <p className="result-summary">
            ⏱️ Your Time: <span className="result-highlight">{seconds}s</span>
          </p>
          <p className="result-summary">
            ⚠️ Penalty Time: <span className="result-highlight">{penalty}s</span>
          </p>
          <p className="result-summary total">
            🏁 Final Score = {seconds}s + {penalty}s ={" "}
            <span className="result-highlight">{finalTime}s</span>
          </p>

          <div className="result-buttons">
            <button
              className="btn play-again"
              onClick={handleRestart}
              disabled={saving}
            >
              Play Again
            </button>
            <button className="btn home" onClick={() => navigate("/")}>
              Go Home
            </button>
            <button
              className="btn leaderboard"
              onClick={() => navigate("/leaderboard")}
            >
              View Leaderboard
            </button>
          </div>

          {saveMessage && <p className="save-message">{saveMessage}</p>}

          {!auth.currentUser && (
            <div className="signin-prompt">
              🔴 Sign in to save your score!{" "}
              <button className="btn signin" onClick={() => navigate("/auth")}>
                Sign In
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
