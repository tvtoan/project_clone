import React from "react";
import "tippy.js/dist/tippy.css";
import styles from "./User.module.scss";
import classNames from "classnames/bind";

const cx = classNames.bind(styles);
const User = () => {
  return (
    
      <img
        src="https://media.istockphoto.com/id/517188688/vi/anh/phong-c%E1%BA%A3nh-n%C3%BAi-non.jpg?s=612x612&w=0&k=20&c=WWWaejSo6EWGZMZSK7QK6LCfwd0rL2KB3ImCX2VkW4A="
        alt="User Avatar"
        className={cx("img")}
      />
  );
};

export default User;
