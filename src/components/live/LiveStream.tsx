"use client";
import { useEffect, useState } from "react";
import io from "socket.io-client";

export default function LiveStream() {
  const [messages, setMessages] = useState<string[]>([]);
  const [message, setMessage] = useState("");
  const socket = io();

  useEffect(() => {
    socket.on("message", (msg) => {
      setMessages((prev) => [...prev, msg]);
    });
  }, []);

  const sendMessage = () => {
    socket.emit("message", message);
    setMessage("");
  };

  return (
    <div className="p-4">
      <input type="text" value={message} onChange={(e) => setMessage(e.target.value)} />
      <button onClick={sendMessage}>Send</button>
      <ul>{messages.map((msg, idx) => <li key={idx}>{msg}</li>)}</ul>
    </div>
  );
}
