import { useEffect, useState, useRef } from "react";
import socket from "../Components/Socket";

export default function useChatSocket(nickname, nicknameSet) {
  const [messages, setMessages] = useState([]);
  const [userList, setUserList] = useState([]);
  const hasSentNickname = useRef(false); 

  useEffect(() => {
    socket.on("connect", () => {
      console.log("🔌 Connected to socket:", socket.id);
      if (nicknameSet && !hasSentNickname.current) {
        socket.emit("set_nickname", nickname);
        hasSentNickname.current = true;
        console.log("✅ Emitted set_nickname (on connect):", nickname);
      }
    });

    socket.on("user_list", (users) => {
      console.log("📥 User list received:", users);
      setUserList(users);
    });

    socket.on("chat-message", (data) => {
      setMessages((prev) => [...prev, data]);
    });

    socket.on("user_joined", (joinedName) => {
      setMessages((prev) => [
        ...prev,
        { from: "System", text: `${joinedName} joined the chat` },
      ]);
    });

    socket.on("user_left", (msg) => {
      setMessages((prev) => [...prev, { from: "System", text: msg }]);
    });

    return () => {
      socket.off("connect");
      socket.off("user_list");
      socket.off("chat-message");
      socket.off("user_joined");
      socket.off("user_left");
    };
  }, []);

  useEffect(() => {
    if (nicknameSet && socket.connected && !hasSentNickname.current) {
      socket.emit("set_nickname", nickname);
      hasSentNickname.current = true;
      console.log("✅ Emitted set_nickname (manual):", nickname);
    }
  }, [nicknameSet, nickname]);

  const sendMessage = (msg) => {
    const newMsg = { text: msg, from: nickname };
    setMessages((prev) => [...prev, { text: msg, from: "You" }]);
    socket.emit("chat-message", newMsg);
  };

  return {
    messages,
    userList,
    sendMessage,
  };
}
