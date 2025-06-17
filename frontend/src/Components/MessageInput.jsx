import { useState } from "react";
import VoiceInput from "./VoiceInput";

const MessageInput = ({ onSend }) => {
  const [message, setMessage] = useState("");
  const [isVoiceActive, setIsVoiceActive] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!message.trim()) return;
    onSend(message);
    setMessage("");
  };

  const handleTranscript = (transcript) => {
    setMessage(transcript);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex items-center gap-2 p-4 bg-white rounded-lg shadow"
    >
      <input
        type="text"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder={isVoiceActive ? "Speak now..." : "Type a message..."}
        className="flex-1 px-4 py-2 text-gray-800 border border-gray-300 placeholder-gray-400 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all"
      />

      <VoiceInput
        onTranscriptUpdate={handleTranscript}
        onListeningChange={setIsVoiceActive}
      />

      <button
        type="submit"
        disabled={!message.trim()}
        className="px-4 py-2 rounded-lg bg-blue-500 hover:bg-purple-600 text-white font-medium shadow-sm transition"
      >
        Send
      </button>
    </form>
  );
};

export default MessageInput;
