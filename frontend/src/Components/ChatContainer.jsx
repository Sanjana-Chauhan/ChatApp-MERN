import { useEffect, useRef, useState } from "react";
import useChatSocket from "../Hooks/useSocket";
import MessageBubble from "./MessageBubble";
import MessageInput from "./MessageInput";
import ChatHeader from "./ChatHeader";
import Sidebar from "./Sidebar";
import LandingPage from "./LandingPage";

export default function ChatContainer() {
  const [nickname, setNickname] = useState("");
  const [nicknameSet, setNicknameSet] = useState(false);
  const { messages, userList, sendMessage } = useChatSocket(nickname, nicknameSet);

  const bottomRef = useRef(null); // 📌 To scroll to the last message

  // 📦 Smooth scroll into view on new message
  useEffect(() => {
    if (bottomRef.current) {
      bottomRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  if (!nicknameSet) {
    return (
      <LandingPage
        onJoin={(name) => {
          setNickname(name);
          setNicknameSet(true);
        }}
      />
    );
  }

  return (
    <div className="flex w-full h-full">
      <Sidebar users={userList} />
      <div className="flex flex-col w-4/5 h-full">
        <ChatHeader />
        
        <div
          className="flex-1 p-4 space-y-2 overflow-y-auto hide-scrollbar"
        >
          {messages.map((msg, idx) => (
            <MessageBubble key={idx} from={msg.from} text={msg.text} />
          ))}
          <div ref={bottomRef} /> {/* 👈 Dummy div for scroll anchor */}
        </div>

        <MessageInput onSend={sendMessage} />
      </div>
    </div>
  );
}
