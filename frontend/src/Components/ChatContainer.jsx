import MessageBubble from "./MessageBubble";
import MessageInput from "./MessageInput";
import { useState, useEffect, useRef } from "react";
import ChatHeader from "./ChatHeader";
import socket from "./Socket";

export default function ChatContainer() {
  const scrollRef = useRef(null);
  const [messages, setMessages] = useState([]);
  const [nickname, setNickname] = useState("Anonymous");

  useEffect(() => {
    console.log(socket);
    socket.on("user_joined", (nickname) => {
      setNickname(nickname);
    })
    socket.on("chat-message", (data) => {
      setMessages((prev) => [...prev, data]);
    });

    return () => {
      socket.off("chat-message");
    };
  }, [nickname]);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTo({
        top: scrollRef.current.scrollHeight,
        behavior: "smooth",
      });
    }
  }, [messages]);

  const handleSend = (msg) => {
    const newMsg = { text: msg, from: nickname };
    setMessages((prev) => [...prev, { text: msg, from: "You" }]);
    socket.emit("chat-message", newMsg);
  };

  return (
    <div className="flex flex-col w-4/5 h-full">
      <ChatHeader />
      <div
        ref={scrollRef}
        className="flex-1 p-4 space-y-2 overflow-y-auto bg-transparent scrollbar-none"
        style={{
          scrollbarWidth: "none",
          msOverflowStyle: "none",
        }}
      >
        {" "}
        {messages.map((msg, idx) => (
          <MessageBubble key={idx} from={msg.from} text={msg.text} />
        ))}
      </div>

      <MessageInput onSend={handleSend} />
    </div>
  );
}
