// src/App.jsx
import React, { useState, useEffect } from "react";
import { Button } from "./components/ui/button";
import { Card } from "./components/ui/card";
import { Play } from "lucide-react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import Navbar from "./components/Navbar"; // Import the reusable Navbar
import { onAuthStateChanged } from "firebase/auth";
import { auth, db } from "./firebaseConfig";
import { ref, get } from "firebase/database";

export default function App() {
  const [username, setUsername] = useState("Guest");

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        try {
          // Fetch username from Realtime Database
          const userRef = ref(db, "users/" + user.uid);
          const snapshot = await get(userRef);
          if (snapshot.exists()) {
            setUsername(snapshot.val().username || user.email.split("@")[0]);
          } else {
            // fallback to email prefix if username not found
            setUsername(user.email.split("@")[0]);
          }
        } catch (error) {
          console.error("Error fetching username from database:", error);
          setUsername(user.email.split("@")[0]);
        }
      } else {
        setUsername("Guest");
      }
    });

    return () => unsubscribe();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-100 via-orange-50 to-pink-100 font-sans text-gray-800 relative overflow-hidden mt-[-20px]">
      {/* === Navbar === */}
      <Navbar />

      {/* === Floating Bananas (Background Animation) === */}
      <div className="absolute inset-0 pointer-events-none">
        <motion.div
          className="absolute top-60 left-10 text-5xl opacity-40"
          style={{ textShadow: "2px 2px 4px rgba(0,0,0,0.6)" }}
          animate={{ y: [0, -20, 0], rotate: [0, 10, 0] }}
          transition={{ duration: 4, repeat: Infinity }}
        >
          🍌
        </motion.div>

        <motion.div
          className="absolute top-53 right-20 text-5xl opacity-40"
          style={{ textShadow: "2px 2px 4px rgba(0,0,0,0.6)" }}
          animate={{ y: [0, 20, 0], rotate: [0, -10, 0] }}
          transition={{ duration: 3.5, repeat: Infinity, delay: 0.5 }}
        >
          🍌
        </motion.div>
      </div>

      {/* === Main Content === */}
      <div className="max-w-6xl mx-auto px-4 py-16 text-center relative z-10 mt-20">
        {/* Banana Animation */}
        <motion.div
          animate={{ rotate: [0, 10, -10, 0] }}
          transition={{ duration: 2, repeat: Infinity, repeatDelay: 1 }}
          className="text-8xl mb-6"
        >
          🍌
        </motion.div>

        {/* Header */}
        <h1 className="text-6xl mb-6 font-extrabold tracking-tight bg-gradient-to-r from-yellow-600 via-orange-600 to-pink-600 bg-clip-text text-transparent font-[Poppins]">
          Banana Brain Challenge
        </h1>

        {/* Subtitle */}
        <p className="text-xl text-gray-700 max-w-2xl mx-auto mb-12 font-normal">
          Put your math skills to the test! Solve equations, beat the clock, and become a mental math master.
        </p>

        {/* Start Button */}
        <Link to="/game" style={{ textDecoration: "none" }}>
          <Button
            size="md"
            className="flex items-center justify-center whitespace-nowrap text-lg font-bold px-6 py-3 bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600 shadow-md transform hover:scale-105 transition-all mx-auto"
          >
            <Play className="mr-2 h-5 w-5 flex-shrink-0" />
            <span className="flex-shrink-0">Start Playing</span>
          </Button>
        </Link>

        {/* === Instructions Box === */}
        <motion.div
  initial={{ opacity: 0, y: 20, scale: 0.95 }}
  animate={{ opacity: 1, y: 0, scale: 1 }}
  transition={{ duration: 0.6, delay: 0.3 }}
  whileHover={{ scale: 1.02 }}
  className="mt-12 mb-16"
>
  <Card className="max-w-3xl mx-auto p-8 bg-white/80 backdrop-blur-lg shadow-2xl rounded-2xl border-4 border-gradient-to-r from-yellow-400 via-orange-400 to-pink-500">
   <h2
  className="text-5xl text-center mb-6 text-gray-800 font-semibold tracking-wider"
  style={{ fontFamily: "'bangers', cursive" }}
>
  Game Instructions ⏱️
</h2>
    <div className="space-y-4">
      <p className="text-center text-2xl ">
  Welcome to the Banana Brain Challenge{" "}
        <span style={{ fontFamily: "'Lobster', cursive" }}>{username}</span> ! 🍌
      </p>
      <ul className="space-y-3 text-lg font-normal">
        <li className="flex items-start gap-3">
          <span className="text-orange-500 mt-0">1.</span>
          <span>You will be given 3 math equations to solve.</span>
        </li>
        <li className="flex items-start gap-3">
          <span className="text-orange-500 mt-0">2.</span>
          <span>The stopwatch starts as soon as you begin.</span>
        </li>
        <li className="flex items-start gap-3">
  <span className="text-orange-500 mt-0">3.</span>
  <span>For each wrong answers a <strong>+30s</strong> penalty will be added.</span>
</li>
        <li className="flex items-start gap-3">
          <span className="text-orange-500 mt-0">4.</span>
          <span>Your goal is to finish all 3 correctly in the shortest possible time.</span>
        </li>
      </ul>
      <p className="text-center text-lg pt-4 font-normal">
        💡 Think fast, stay sharp, and aim for the Leaderboard! 🏆
      </p>
    </div>
  </Card>
</motion.div>

      </div>
    </div>
  );
}