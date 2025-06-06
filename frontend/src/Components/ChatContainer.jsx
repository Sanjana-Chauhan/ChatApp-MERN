import MessageBubble from "./MessageBubble";
import MessageInput from "./MessageInput";
import { useState } from "react";
import ChatHeader from "./ChatHeader";
export default function ChatContainer() {
  const [messages, setMessages] = useState([
    { from: "Alice", text: "Hey How r u. Long time no see. come to my home today. i have organized a super cool christmas party!" },
    { from: "You", text: "Hi there!" },
  ]);

  const handleSend = (msg) => {
    if (msg.trim()) {
      setMessages([...messages, { from: "You", text: msg }]);
    }
  };

  return (
    <div className="flex flex-col w-4/5 h-full">
        <ChatHeader/>
      <div className="flex-1 p-4 space-y-2 overflow-y-auto bg-transparent scrollbar-thin scrollbar-thumb-[#555]">
        {messages.map((msg, idx) => (
          <MessageBubble key={idx} from={msg.from} text={msg.text} />
        ))}
      </div>

      <MessageInput onSend={handleSend} />
    </div>
  );
}
