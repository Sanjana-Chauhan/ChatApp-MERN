import { useState } from "react";

export default function MessageInput({ onSend }) {
  const [message, setMessage] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!message.trim()) return;
    onSend(message);
    setMessage("");
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="p-3 flex items-center gap-3  bg-gray-300/60 backdrop-blur-md shadow-inner"
    >
      <input
        type="text"
        placeholder="Type something fun..."
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        className="flex-1 px-4 py-2 text-gray-800s border border-gray-300 placeholder-gray-400 rounded-lg focus:outline-none  transition-all"
      />
      <button
        type="submit"
        className="px-4 py-2 rounded-lg bg-purple-500 hover:bg-purple-600 text-white font-medium shadow-sm transition"
      >
        Send
      </button>
    </form>
  );
}
