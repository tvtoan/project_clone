import React from "react";
import styles from "./Message.module.scss";
import classNames from "classnames/bind";

const cx = classNames.bind(styles);

const Message = ({ message, isCurrentUser }) => {
  return (
    <div className={cx("message", { "current-user": isCurrentUser })}>
        <p>{message.senderId}</p>
      <p>{message.text}</p>
    </div>
  );
};

export default Message;
