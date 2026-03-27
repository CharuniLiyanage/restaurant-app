import { useState } from "react";
import { useAdmin } from "../context/AdminContext";
import "./AdminChat.css";

export default function AdminChat() {
  const { messages, addMessage } = useAdmin(); // get all messages
  const [reply, setReply] = useState("");

  const handleSendReply = (userId) => {
    if (!reply.trim()) return;

    addMessage({
      userId,
      text: reply,
      from: "admin",
      timestamp: new Date().toISOString(),
    });
    setReply("");
  };

  return (
    <div className="chat-container">
      <h1>Customer Messages 💬</h1>

      {messages.length === 0 ? (
        <p>No messages yet.</p>
      ) : (
        <div className="chat-list">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`chat-message ${msg.from === "admin" ? "admin" : "user"}`}
            >
              <p className="message-text">{msg.text}</p>
              <small>{new Date(msg.timestamp).toLocaleString()}</small>

              {/* Reply input only for user messages */}
              {msg.from === "user" && (
                <div className="reply-section">
                  <input
                    type="text"
                    placeholder="Type reply..."
                    value={reply}
                    onChange={(e) => setReply(e.target.value)}
                  />
                  <button onClick={() => handleSendReply(msg.id)}>Send</button>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}