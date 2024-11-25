import React from "react";
import "tippy.js/dist/tippy.css";
import styles from "./User.module.scss";
import classNames from "classnames/bind";
import { useAuth } from "../../context/AuthContext";
import anhBia from '../../../src/img/anhbia.jpg';

const cx = classNames.bind(styles);
const User = () => {
  const {user } = useAuth();
  if(!user) {
    return <p>Loading user...</p>
  }
  return (
    
      <img
        src= {user.profilePicture || anhBia }
        alt="User Avatar"
        className={cx("img")}
      />
  );
};

export default User;
