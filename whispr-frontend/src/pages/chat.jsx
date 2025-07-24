// src/pages/Chat.js
import React, { useState, useEffect, useRef } from "react";

const Chat = () => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const socketRef = useRef(null);

  useEffect(() => {
    const token = localStorage.getItem("access");
    if (!token) {
      console.warn("No access token found.");
      return;
    }

    const socket = new WebSocket(`ws://localhost:8000/ws/chat/?token=${token}`);
    socketRef.current = socket;

    socket.onopen = () => {
      console.log("WebSocket connected");
    };

    socket.onmessage = (event) => {
      const data = JSON.parse(event.data);
      setMessages((prevMessages) => [...prevMessages, data.message]);
    };

    socket.onerror = (error) => {
      console.error("WebSocket error:", error);
    };

    socket.onclose = () => {
      console.log("WebSocket disconnected");
    };

    return () => {
      socket.close();
    };
  }, []);

  const handleSendMessage = () => {
    const message = newMessage.trim();
    if (message && socketRef.current.readyState === WebSocket.OPEN) {
      socketRef.current.send(JSON.stringify({ message }));
      setNewMessage("");
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Chat Room</h2>

      <div style={{ height: "300px", border: "1px solid #ccc", padding: "10px", overflowY: "auto" }}>
        {messages.map((msg, index) => (
          <div key={index} style={{ margin: "5px 0" }}>{msg}</div>
        ))}
      </div>

      <div style={{ marginTop: "10px" }}>
        <input
          type="text"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSendMessage()}
          placeholder="Type your message..."
          style={{ padding: "8px", width: "80%" }}
        />
        <button onClick={handleSendMessage} style={{ padding: "8px 12px", marginLeft: "5px" }}>
          Send
        </button>
      </div>
    </div>
  );
};

export default Chat;
