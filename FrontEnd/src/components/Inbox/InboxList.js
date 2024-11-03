import React, { useEffect, useState } from "react";
import inboxService from '../../services/inboxService';
import Message from "./Message";

const InboxList = () => {
    const [messages, setMessages] = useState([]);

    useEffect(() => {
        const fetchMessages = async () => {
            try {
                const data = await inboxService.getMessages();
                setMessages(data);
            } catch (error) {
                console.error("Error fetching messages: ", error);
            }
        };
        fetchMessages();
    }, []);

    return (
        <div>
            <h2>Message</h2>
            {messages.length === 0 ? (
                <p>No message available</p>
            ) : (
            <ul>
                {messages.map((message) => (
                    <li key= {message._id}>
                        <Message message={message} />
                    </li>
                ))}
            </ul>
            )}
            
        </div>
    )
}

export default InboxList;