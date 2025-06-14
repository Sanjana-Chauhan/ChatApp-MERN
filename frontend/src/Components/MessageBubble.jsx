export default function MessageBubble({ from, text }) {
  const isSelf = from === "You";

  return (
    <div className={`flex  mb-2 ${isSelf ? "justify-end" : "justify-start"}`}>
      <div
        className={`px-4 py-2 rounded-xl max-w-md break-words text-sm shadow-md
          ${
            isSelf
              ? "text-white bg-gradient-to-br from-pink-500 to-purple-500"
              : "text-black  bg-gray-300/70  backdrop-blur-md border border-white/10"
          }`}
      >
        <div
          className={`text-xs font-bold mb-1 `}
        >
          {from}
        </div>
        {text}
      </div>
    </div>
  );
}
