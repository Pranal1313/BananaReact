import { Button } from "./components/ui/button";
import { Card } from "./components/ui/card";
import { Play, Menu } from "lucide-react";
import { motion } from "framer-motion";

export default function App() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-100 via-orange-50 to-pink-100 font-sans text-gray-800 relative overflow-hidden">
      {/* === Navbar === */}
      <nav className="relative z-20 bg-amber-50/80 backdrop-blur shadow-md">
        <div className="max-w-6xl mx-auto px-2 py-3">
          <div className="flex items-center justify-between">
            {/* Left: Logo */}
            <div className="flex items-center gap-2">
              <span className="text-3xl ml-0">🍌</span>
              <span className="text-2xl font-semibold bg-gradient-to-r from-yellow-700 to-orange-700 bg-clip-text text-transparent">
                Banana Brain Challenge
              </span>
            </div>

            {/* Right: Navbar Links */}
            <div className="hidden md:flex items-center gap-8 text-lg">
              <a href="#" className="text-gray-700 hover:text-orange-600 transition-colors font-medium">
                Home
              </a>
              <a href="#" className="text-gray-700 hover:text-orange-600 transition-colors font-medium">
                Leaderboard
              </a>
              <a href="#" className="text-gray-700 hover:text-orange-600 transition-colors font-medium">
                How to Play
              </a>
              <a href="#" className="text-gray-700 hover:text-orange-600 transition-colors font-medium">
                About
              </a>
            </div>

            {/* Mobile Menu Icon */}
            <Button variant="ghost" size="icon" className="md:hidden">
              <Menu className="h-6 w-6" />
            </Button>
          </div>
        </div>
      </nav>

      {/* === Floating Bananas (Background Animation) === */}
      <div className="absolute inset-0 pointer-events-none">
       <motion.div
        className="absolute top-60 left-10 text-5xl opacity-40"
        style={{ textShadow: '2px 2px 4px rgba(0,0,0,0.6)' }}
        animate={{ y: [0, -20, 0], rotate: [0, 10, 0] }}
        transition={{ duration: 4, repeat: Infinity }}
        >
        🍌
       </motion.div>

        <motion.div
  className="absolute top-53 right-20 text-5xl opacity-40" // increased opacity for darker look
  style={{ textShadow: '2px 2px 4px rgba(0,0,0,0.6)' }}
  animate={{ y: [0, 20, 0], rotate: [0, -10, 0] }} // this animates the banana
  transition={{ duration: 3.5, repeat: Infinity, delay: 0.5 }}
>
  🍌
</motion.div>


      </div>

      {/* === Main Content === */}
      <div className="max-w-6xl mx-auto px-4 py-16 text-center relative z-10">
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
        <Button
          size="md"
          className="flex items-center justify-center whitespace-nowrap text-lg font-bold px-6 py-3 bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600 shadow-md transform hover:scale-105 transition-all mx-auto"
        >
          <Play className="mr-2 h-5 w-5 flex-shrink-0" />
          <span className="flex-shrink-0">Start Playing</span>
        </Button>

        {/* === Instructions Box === */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-12 mb-16"
        >
          <Card className="max-w-3xl mx-auto p-8 bg-white/90 backdrop-blur shadow-xl font-normal text-gray-700">
            <h2 className="text-3xl text-center mb-6 text-gray-800 font-semibold">
              Game Instructions ⏱️
            </h2>
            <div className="space-y-4">
              <p className="text-center text-lg font-normal">
                Welcome to the Banana Brain Challenge! 🍌
              </p>

              <ul className="space-y-3 text-lg font-normal">
                <li className="flex items-start gap-3">
                  <span className="text-yellow-600 mt-1">•</span>
                  <span>
                    You will be given <strong>5 math equations</strong> to solve.
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-yellow-600 mt-1">•</span>
                  <span>The stopwatch starts as soon as you begin.</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-yellow-600 mt-1">•</span>
                  <span>
                    Your goal is to finish all 5 correctly in the{" "}
                    <strong>shortest possible time</strong>.
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-yellow-600 mt-1">•</span>
                  <span>
                    For each wrong answer, a{" "}
                    <strong>+5 second penalty</strong> will be added to your
                    total time.
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-yellow-600 mt-1">•</span>
                  <span>The player with the lowest final time wins! 🏆</span>
                </li>
              </ul>

              <p className="text-center text-lg pt-4 font-normal">
                💡 Think fast, stay sharp, and aim for the fastest brain! ⚡
              </p>
            </div>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}