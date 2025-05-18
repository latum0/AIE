import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./conversation-manager.css";

// Set the Axios base URL: all relative API calls will be prefixed with "http://localhost:5000/api"
axios.defaults.baseURL = "http://localhost:5000/api";

// Retrieve the access token from localStorage (for this mini project, security is not critical)
const accessToken = localStorage.getItem("accessToken");
if (accessToken) {
  axios.defaults.headers.common["Authorization"] = `Bearer ${accessToken}`;
} else {
  console.warn("No accessToken found in localStorage");
}

// Retrieve the current freelancer's info (must be stored as JSON under the key "user")
const currentUser = JSON.parse(localStorage.getItem("user"));

export default function ConversationManager() {
  // State for the list of conversations, the active conversation, and new message text.
  const [conversations, setConversations] = useState([]);
  const [activeConversation, setActiveConversation] = useState(null);
  const [newMessage, setNewMessage] = useState("");
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const navigate = useNavigate();

  // Helper: Format a timestamp into a readable time string.
  const formatTime = (date) => {
    return new Date(date).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  };

  // Helper: Format a date as "Today", "Yesterday" or a locale string.
  const formatDate = (date) => {
    const d = new Date(date);
    const today = new Date();
    const yesterday = new Date();
    yesterday.setDate(today.getDate() - 1);
    if (d.toDateString() === today.toDateString()) return "Today";
    if (d.toDateString() === yesterday.toDateString()) return "Yesterday";
    return d.toLocaleDateString();
  };

  // Helper: Group messages in a conversation by date for display purposes.
  const groupMessagesByDate = (messages) => {
    const groups = {};
    messages.forEach((message) => {
      // Use message.timestamp (or createdAt) in the proper format.
      const dateKey = formatDate(message.timestamp);
      if (!groups[dateKey]) groups[dateKey] = [];
      groups[dateKey].push(message);
    });
    return Object.entries(groups);
  };

  // Fetch the logged-in user's conversations on component mount.
  useEffect(() => {
    const fetchConversations = async () => {
      try {
        // GET request to /conversations will return the list for the authenticated user.
        const response = await axios.get("/conversations");
        setConversations(response.data);
        if (response.data.length > 0) {
          // Load messages for the first conversation by default.
          // Note: Use _id instead of id.
          fetchMessages(response.data[0]);
        }
      } catch (error) {
        console.error("Error fetching conversations:", error);
      }
    };

    fetchConversations();
  }, []);

  // Helper: Fetch messages for a given conversation.
  const fetchMessages = async (conversationData) => {
    try {
      // Use conversationData._id instead of conversationData.id.
      const response = await axios.get(`/messages/${conversationData._id}`);
      const updatedConversation = { ...conversationData, messages: response.data };
      setActiveConversation(updatedConversation);
    } catch (error) {
      console.error("Error fetching messages:", error);
    }
  };

  // When a conversation is selected (clicked), set it as active.
  const handleSelectConversation = (conversation) => {
    fetchMessages(conversation);
    if (window.innerWidth < 768) setSidebarOpen(false);
  };

  // Send a new message in the active conversation.
  const handleSendMessage = async () => {
    if (!newMessage.trim() || !activeConversation) return;
    // Use _id for the conversation identifier.
    const payload = {
      conversationId: activeConversation._id,
      text: newMessage,
      sender: currentUser ? currentUser._id : "freelancer",
    };

    try {
      const response = await axios.post("/messages", payload);
      const createdMessage = response.data;
      // Append the new message to the active conversation.
      const updatedConversation = {
        ...activeConversation,
        lastMessage: newMessage,
        messages: [...(activeConversation.messages || []), createdMessage],
      };

      // Update the conversation list.
      const updatedConversations = conversations.map((conv) =>
        conv._id === activeConversation._id ? updatedConversation : conv
      );
      setConversations(updatedConversations);
      setActiveConversation(updatedConversation);
      setNewMessage("");
    } catch (error) {
      console.error("Error sending message:", error);
    }
  };

  // Toggle sidebar visibility (useful for mobile view).
  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <div className="conversation-manager">
      {/* Mobile menu button */}
      <button className="mobile-menu-button" onClick={toggleSidebar}>
        {sidebarOpen ? (
          <svg xmlns="http://www.w3.org/2000/svg"
            width="24" height="24" viewBox="0 0 24 24"
            fill="none" stroke="currentColor" strokeWidth="2"
            strokeLinecap="round" strokeLinejoin="round">
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        ) : (
          <svg xmlns="http://www.w3.org/2000/svg"
            width="24" height="24" viewBox="0 0 24 24"
            fill="none" stroke="currentColor" strokeWidth="2"
            strokeLinecap="round" strokeLinejoin="round">
            <line x1="3" y1="12" x2="21" y2="12" />
            <line x1="3" y1="6" x2="21" y2="6" />
            <line x1="3" y1="18" x2="21" y2="18" />
          </svg>
        )}
      </button>

      {/* Conversation Sidebar */}
      <aside className={`conversation-sidebar ${sidebarOpen ? "sidebar-open" : "sidebar-closed"}`}>
        <div className="sidebar-header">
          <h2>Conversations</h2>
        </div>
        <div className="conversation-list">
          {conversations.map((conversation) => (
            <div key={conversation._id}
              className={`conversation-item ${activeConversation && activeConversation._id === conversation._id ? "active" : ""} ${conversation.unread ? "unread" : ""}`}
              onClick={() => handleSelectConversation(conversation)}
            >
              <div className="conversation-avatar">
                <img src={conversation.clientAvatar || "/placeholder.svg"} alt={conversation.clientName} />
              </div>
              <div className="conversation-details">
                <div className="conversation-name">{conversation.clientName}</div>
                <div className="conversation-preview">{conversation.lastMessage}</div>
              </div>
              {conversation.unread && <div className="unread-indicator" />}
            </div>
          ))}
        </div>
      </aside>

      {/* Main Chat Area */}
      <main className="conversation-main">
        {activeConversation ? (
          <>
            <div className="chat-header">
              <div className="client-avatar">
                <img src={activeConversation.clientAvatar || "/placeholder.svg"} alt={activeConversation.clientName} />
              </div>
              <h2>{activeConversation.clientName}</h2>
            </div>
            <div className="messages-container">
              {activeConversation.messages &&
                groupMessagesByDate(activeConversation.messages).map(([date, messages]) => (
                  <div key={date} className="message-group">
                    <div className="date-divider">
                      <span>{date}</span>
                    </div>
                    {messages.map((message) => (
                      // Compare message.sender against currentUser._id for styling.
                      <div key={message.id} className={`message ${message.sender === currentUser._id ? "sent" : "received"}`}>
                        <div className="message-content-cm">
                          {message.text}
                          <span className="message-time">{formatTime(message.timestamp)}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                ))}
            </div>
            <div className="message-input-container">
              <input className="message-input"
                placeholder="Type your message..."
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" && !e.shiftKey) {
                    e.preventDefault();
                    handleSendMessage();
                  }
                }}
              />
              <button className="send-button" onClick={handleSendMessage} disabled={!newMessage.trim()}>
                <svg xmlns="http://www.w3.org/2000/svg"
                  width="18" height="18" viewBox="0 0 24 24"
                  fill="none" stroke="currentColor" strokeWidth="2"
                  strokeLinecap="round" strokeLinejoin="round">
                  <line x1="22" y1="2" x2="11" y2="13" />
                  <polygon points="22 2 15 22 11 13 2 9 22 2" />
                </svg>
              </button>
            </div>
          </>
        ) : (
          <div className="no-conversation">
            <p>Select a conversation to start chatting</p>
          </div>
        )}
      </main>
    </div>
  );
}
