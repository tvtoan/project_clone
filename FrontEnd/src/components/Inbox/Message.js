import React from "react";

const Message = ({message}) => {
    return (
        <div>
            <h3>Sender ID: {message.senderId}</h3>
            <p>{message.text}</p>
        </div>
    )
}

export default Message;