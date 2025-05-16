import React, { useState, useEffect, useRef } from "react";
import io from "socket.io-client";
import './Chat.css'

const Chat = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [username, setUsername] = useState(""); // Simulated username
  const [recipient, setRecipient] = useState(""); // Simulated recipient
  const [isOpen, setIsOpen] = useState(false);
  const socket = useRef(null);


  useEffect(() => {
    if (!username || !recipient) return;
  
    // Fetch previous messages
    fetch(
      `http://localhost:5000/api/messages?user1=${username}&user2=${recipient}`
    )
      .then((res) => res.json())
      .then((data) => setMessages(data));
  }, [username, recipient]);
  // Initialize Socket.IO connection
  useEffect(() => {
    if (!username) return;

    socket.current = io("http://localhost:5000", {
      query: { username }, // Pass username as query param
    });

    // Listen for incoming messages
    socket.current.on("receiveMessage", (message) => {
      if ((message.sender === recipient && message.receiver === username) ||
          (message.sender === username && message.receiver === recipient)) {
        setMessages((prev) => [...prev, message]);
      }
    });

    return () => socket.current.disconnect();
  }, [username, recipient]);

  // Toggle chat window
  const toggleChat = () => setIsOpen(!isOpen);

  // Send message
  const sendMessage = () => {
    if (!input.trim() || !recipient) return;

    const message = {
      sender: username,
      receiver: recipient,
      content: input,
      timestamp: new Date(),
    };

    socket.current.emit("sendMessage", message);
    setMessages((prev) => [...prev, message]);
    setInput("");
  };

  return (
    <div>
      {/* Floating Button */}
      <button onClick={toggleChat} className="chat-button">
        💬 Chat
      </button>

      {/* Sliding Chat Window */}
      <div className={`chat-window ${isOpen ? "open" : ""}`}>
        <div className="chat-header">Chat</div>

        {!username ? (
          // Simulated login form
          <div className="login-form">
            <input
              placeholder="Your username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <input
              placeholder="Recipient username"
              value={recipient}
              onChange={(e) => setRecipient(e.target.value)}
            />
          </div>
        ) : (
          // Chat UI
          <>
            <div className="messages">
              {messages.map((msg, i) => (
                <div
                  key={i}
                  className={`message ${
                    msg.sender === username ? "sent" : "received"
                  }`}
                >
                  <strong>{msg.sender}:</strong> {msg.content}
                </div>
              ))}
            </div>
            <div className="chat-input">
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Type a message..."
              />
              <button onClick={sendMessage}>Send</button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Chat;