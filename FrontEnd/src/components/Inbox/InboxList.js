import React, { useEffect, useState } from "react";
import { createMessage, getMessages } from "../../services/inboxService";

import Message from "./Message";
import styles from "./InboxList.module.scss";
import classNames from "classnames/bind";

const cx = classNames.bind(styles);

const InboxList = ({ receiverId, currentUser }) => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  
  const fetchMessages = async () => {
    try {
      const data = await getMessages(receiverId);
      console.log(data)
      setMessages(data);
    } catch (error) {
      console.error("Error fetching messages: ", error);
    }
  };

  const handleSendMessage = async () => {
    if (!newMessage.trim() || !receiverId) return;

    try {
      // send message to receiver
      const sendMessage = await createMessage(receiverId, newMessage);

      // update list message after send message
      setMessages((prevMessages) => [...prevMessages, sendMessage]);
      setNewMessage("");
    } catch (error) {
      console.error("Error sending message", error);
      alert("Failed to send message. Please try again later.");
    }
  };

  useEffect(() => {
    if (receiverId) fetchMessages(); // get messages from receiver
  }, [receiverId]);

  return (
    <div className={cx("inbox-list")}>
      <div className={cx("message")}>
        {messages.length === 0 ? (
          <p>No message available</p>
        ) : (
          <ul>
            {messages.map((message) => (
              <li key={message._id}>
                <Message
                  message={message}
                  isCurrentUser={message.senderId === currentUser.id}
                />
                
              </li>
            ))}
          </ul>
        )}
      </div>

      <div className={cx("message-input")}>
        <input
          type="text"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          placeholder="Type a message"
          className={cx("input")}
        />

        <button onClick={handleSendMessage} className={cx("send-button")}>
          Send
        </button>
      </div>
    </div>
  );
};

export default InboxList;
