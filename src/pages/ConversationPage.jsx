"use client";
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './ConversationPage.css';

const ConversationPage = () => {
  const { conversationId } = useParams();
  const navigate = useNavigate();

  // Retrieve the current user from localStorage (assumes it's stored as JSON)
  const currentUser = JSON.parse(localStorage.getItem('user'));

  console.log("ConversationPage loaded with conversationId:", conversationId);
  console.log("Current User:", currentUser);

  // Initialize messages as an empty array
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');

  // Poll for messages dynamically every 3 seconds
  useEffect(() => {
    const fetchMessages = async () => {
      try {
        // Retrieve access token from localStorage (if using authentication)
        const token = localStorage.getItem("accessToken");
        console.log("Fetching messages for conversation:", conversationId, "with token:", token);
        const res = await axios.get(`http://localhost:5000/api/messages/${conversationId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        console.log("Fetched messages:", res.data);
        setMessages(res.data);
      } catch (error) {
        console.error("Error fetching messages:", error);
      }
    };

    // Initial fetch on mount and polling every 3 seconds
    fetchMessages();
    const interval = setInterval(fetchMessages, 3000);
    return () => clearInterval(interval);
  }, [conversationId]);

  // Handle submitting a new message
  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (newMessage.trim() === '') return;
    try {
      const token = localStorage.getItem("accessToken");
      // Here we're explicitly including the sender's ID in the payload.
      // This is critical if your authentication middleware isn't setting req.user,
      // so the backend can fall back to using the provided sender from our payload.
      const res = await axios.post(
        "http://localhost:5000/api/messages",
        {
          conversationId,
          sender: currentUser._id, // Include sender explicitly
          text: newMessage,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log("Message sent successfully. Response:", res.data);
      setMessages((prev) => [...prev, res.data]);
      setNewMessage('');
    } catch (error) {
      console.error("Error sending message:", error);
    }
  };

  // Handle back button navigation
  const handleBack = () => {
    navigate(-1);
  };

  return (
    <div className="conversation-container">
      <div className="conversation-header">
        <button className="back-button" onClick={handleBack}>
          ← Back
        </button>
        <h2 className="conversation-title">Conversation</h2>
        <div className="header-actions">
          <button className="action-button">
            <span className="material-icons">more_vert</span>
          </button>
        </div>
      </div>

      <div className="messages-container">
        {messages.map((message) => (
          <div 
            key={message._id || message.id} 
            className={`message-wrapper ${message.sender === currentUser._id ? 'client' : 'freelancer'}`}
          >
            <div className="avatar">
              {message.sender === currentUser._id
                ? currentUser.name.charAt(0).toUpperCase()
                : "O"}
            </div>
            <div className="message-content">
              <div className="message-header">
                <span className="sender-name">
                  {message.sender === currentUser._id ? currentUser.name : "Other"}
                </span>
                <span className="message-time">
                  {new Date(message.createdAt).toLocaleTimeString()}
                </span>
              </div>
              <div className="message-bubble">
                {message.text}
              </div>
            </div>
          </div>
        ))}
      </div>

      <form className="message-input-container" onSubmit={handleSendMessage}>
        <input
          type="text"
          placeholder="Type your message..."
          value={newMessage}
          onChange={(e) => { 
            console.log("Input changed. New value:", e.target.value);
            setNewMessage(e.target.value);
          }}
          className="message-input"
        />
        <button type="submit" className="send-button">
          Send
        </button>
      </form>
    </div>
  );
};

export default ConversationPage;
