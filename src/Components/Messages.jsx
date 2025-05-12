import React, { useState } from "react";
import emailjs from "emailjs-com";
// import "./Messages.css";

// Messages.jsx

const Messages = () => {
    const [messages, setMessages] = useState([]);
    const [reply, setReply] = useState("");
    const [selectedMessage, setSelectedMessage] = useState(null);

    const fetchMessages = () => {
        // Simulate fetching messages (replace with your backend logic)
        const dummyMessages = [
            { id: 1, sender: "user1@example.com", content: "Hello!" },
            { id: 2, sender: "user2@example.com", content: "How are you?" },
        ];
        setMessages(dummyMessages);
    };

    const handleReply = (e) => {
        e.preventDefault();
        if (!selectedMessage) return;

        emailjs
            .send(
                "service_gwb7p78",
                "template_seep82i",
                {
                    to_email: selectedMessage.sender,
                    reply_message: reply,
                },
                "v5aPguYOmfofDxXmy"
            )
            .then(
                (result) => {
                    alert("Reply sent successfully!");
                    setReply("");
                },
                (error) => {
                    alert("Failed to send reply. Please try again.");
                }
            );
    };

    return (
        <div className="messages-container">
            <h1>Messages</h1>
            <button onClick={fetchMessages} className="fetch-button">
                Fetch Messages
            </button>
            <div className="messages-list">
                {messages.map((message) => (
                    <div
                        key={message.id}
                        className={`message-item ${
                            selectedMessage?.id === message.id ? "selected" : ""
                        }`}
                        onClick={() => setSelectedMessage(message)}
                    >
                        <p><strong>From:</strong> {message.sender}</p>
                        <p>{message.content}</p>
                    </div>
                ))}
            </div>
            {selectedMessage && (
                <form onSubmit={handleReply} className="reply-form">
                    <h2>Reply to {selectedMessage.sender}</h2>
                    <textarea
                        value={reply}
                        onChange={(e) => setReply(e.target.value)}
                        placeholder="Write your reply here..."
                        required
                    />
                    <button type="submit" className="reply-button">
                        Send Reply
                    </button>
                </form>
            )}
        </div>
    );
};

export default Messages;