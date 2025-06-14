import { useState } from "react";
import { motion } from "framer-motion";
import { FaCommentDots } from "react-icons/fa";

export default function LandingPage({ onJoin }) {
  const [nickname, setNickname] = useState("");

  const handleJoin = () => {
    if (nickname.trim()) {
      onJoin(nickname);
    }
  };

  return (
    <div className="relative w-full h-screen bg-gradient-to-br from-gray-200 to-gray-300 flex items-center justify-center overflow-hidden">
      {/* Cool floating bubbles */}
      <div className="absolute top-0 left-0 w-full h-full z-10 overflow-hidden">
       {[...Array(15)].map((_, i) => {
  const size = Math.random() * 10 + 10; 
  const startX = Math.random() * window.innerWidth;
  const startY = Math.random() * window.innerHeight;
  const deltaX = Math.random() * 200 - 100; // range: -100 to +100
  const deltaY = Math.random() * 200 - 100;
  const duration = 3 + Math.random() * 12;

  return (
    <motion.div
      key={i}
      className="absolute bg-purple-900 opacity-20  rounded-full"
      style={{
        width: `${size}px`,
        height: `${size}px`,
        top: startY,
        left: startX,
      }}
      animate={{
        x: [0, deltaX, 0],
        y: [0, deltaY, 0],
        rotate: [0, 360, 0],
      }}
      transition={{
        duration,
        repeat: Infinity,
        ease: "easeInOut",
      }}
    />
  );
})}

      </div>

      <div className="backdrop-blur-md bg-white/50 border border-white/30 rounded-2xl shadow-xl px-10 py-12 text-center max-w-md z-10 ">
        <div className="flex justify-center mb-6">
          <FaCommentDots className="text-5xl text-purple-600 drop-shadow-sm" />
        </div>
        <h1 className="text-3xl font-bold text-gray-800 mb-4">
          Welcome to GroupieLoop 💬
        </h1>
        <p className="text-gray-600 mb-6">
          Enter your nickname to join the conversation
        </p>
        <input
          type="text"
          placeholder="Your nickname..."
          value={nickname}
          onChange={(e) => setNickname(e.target.value)}
          className="w-full p-3 mb-4 border border-gray-400 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400 bg-white/80"
        />
        <button
          onClick={handleJoin}
          className="w-full py-3 rounded-lg text-white font-semibold bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 transition"
        >
          Join Chat 🚀
        </button>
      </div>
    </div>
  );
}
