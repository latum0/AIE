import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './ConversationPage.css';

const ConversationPage = () => {
  const conversationName = "Website Redesign Project";

  // Sample conversation data
  const [messages, setMessages] = useState([
    {
      id: 1,
      sender: 'client',
      senderName: 'Alex Johnson',
      text: 'Hi Sarah, I was wondering if you could help me redesign my company website.',
      timestamp: 'Yesterday, 2:30 PM'
    },
    {
      id: 2,
      sender: 'freelancer',
      senderName: 'Sarah Miller',
      text: 'Hello Alex! I’d be happy to help with your website redesign. Could you tell me more about what you’re looking for?',
      timestamp: 'Yesterday, 2:45 PM'
    },
    {
      id: 3,
      sender: 'client',
      senderName: 'Alex Johnson',
      text: 'We need a modern look that showcases our products better. Our current site is outdated and not mobile-friendly.',
      timestamp: 'Yesterday, 3:00 PM'
    },
    {
      id: 4,
      sender: 'freelancer',
      senderName: 'Sarah Miller',
      text: 'I understand. Mobile responsiveness is crucial these days. Do you have any specific design preferences or examples of sites you like?',
      timestamp: 'Yesterday, 3:10 PM'
    },
    {
      id: 5,
      sender: 'client',
      senderName: 'Alex Johnson',
      text: 'I like minimalist designs with clean layouts. I’ll send you some examples later today.',
      timestamp: 'Yesterday, 3:15 PM'
    },
    {
      id: 6,
      sender: 'freelancer',
      senderName: 'Sarah Miller',
      text: 'Perfect! That helps a lot. What’s your timeline for this project?',
      timestamp: 'Today, 9:30 AM'
    },
    {
      id: 7,
      sender: 'client',
      senderName: 'Alex Johnson',
      text: 'We’d like to launch the new site within 2 months. Is that feasible?',
      timestamp: 'Today, 10:15 AM'
    },
    {
      id: 8,
      sender: 'freelancer',
      senderName: 'Sarah Miller',
      text: 'Yes, 2 months should be enough time. I can prepare a proposal with timeline and cost estimates by tomorrow. Would that work for you?',
      timestamp: 'Today, 10:20 AM'
    }
  ]);

  const [newMessage, setNewMessage] = useState('');
  const navigate = useNavigate();

  const handleBack = () => {
    // Navigate to the FreelancerProfile route
    navigate('/freelancer');
  };

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (newMessage.trim() === '') return;

    const message = {
      id: messages.length + 1,
      sender: 'client', // Default as client for this demo
      senderName: 'Alex Johnson',
      text: newMessage,
      timestamp: 'Just now'
    };

    setMessages([...messages, message]);
    setNewMessage('');
  };

  return (
    <div className="conversation-container">
      <div className="conversation-header">
        <button className="back-button" onClick={handleBack}>
          ← Back
        </button>
        <h2 className="conversation-title">{conversationName}</h2>
        <div className="header-actions">
          <button className="action-button">
            <span className="material-icons">more_vert</span>
          </button>
        </div>
      </div>

      <div className="messages-container">
        {messages.map((message) => (
          <div 
            key={message.id} 
            className={`message-wrapper ${message.sender === 'client' ? 'client' : 'freelancer'}`}
          >
            <div className="avatar">
              {message.sender === 'client' ? 'AJ' : 'SM'}
            </div>
            <div className="message-content">
              <div className="message-header">
                <span className="sender-name">{message.senderName}</span>
                <span className="message-time">{message.timestamp}</span>
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
          placeholder="Type a message..."
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
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
