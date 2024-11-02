import React, { useState } from "react";
import styles from "./Header.module.scss";
import classNames from "classnames/bind";

import Icons from "./Icon";
import User from "./User";

const cx = classNames.bind(styles);
const Header = () => {
  const [active, setActive] = useState("home")
  return (
    <div className={cx("header")}>
      <div className={cx("header-left")}>
        <Icons.Facebook className = {cx('header-logo')} style = {{color:'blue'}}/>
        <div className={cx("header-search")}>
          <Icons.Search />
          <input type="text" placeholder="Tìm kiếm" />
        </div>
      </div>
      <div className={cx("header-center")}>
        <div className = {cx('header-options',{active:active === "home"})}
        onClick={() => setActive("home")}>
          <Icons.Home />
        </div>
        <div className = {cx('header-options',{active:active === "friend"})}
        onClick={() => setActive("friend")}>
          <Icons.Friend />
        </div >
        <div className = {cx('header-options',{active:active === "video"})}
        onClick={() => setActive("video")}>
          <Icons.Video />
        </div>
        <div className = {cx('header-options',{active:active === "market"})}
        onClick={() => setActive("market")}>
          <Icons.Market />
        </div>
        <div className = {cx('header-options',{active:active === "group"})}
        onClick={() => setActive("group")}>
          <Icons.Group />
        </div>
      </div>
      <div className={cx("header-right")}>
        <Icons.Messenger className = {cx('header-icon')} />
        <Icons.Notification className = {cx('header-icon')} />
        <User className = {cx('header-icon')} />
      </div>
    </div>
  );
};

export default Header;
