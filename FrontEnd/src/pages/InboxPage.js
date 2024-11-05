import React, { useContext, useEffect, useState } from "react";
import { getMessages } from "../services/inboxService";
import { AuthContext } from "../context/AuthContext";

const InboxPage = () => {
  const { user } = useContext(AuthContext);
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchMessages = async () => {
    try {
      const fetchedMessages = await getMessages(user.id);
      setMessages(fetchedMessages);
    } catch (error) {
      console.error("Error fetching messages", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user) {
      fetchMessages();
    }
  }, [user]);

  if (loading) return <div> Loading messages...</div>;

  return (
    <div>
      <ul>
        {messages.map((message) => (
          <li key={message._id}>
            <strong> {message.senderId}</strong> : {message.text}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default InboxPage;
