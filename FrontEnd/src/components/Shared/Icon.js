import React from "react";
import Tippy from "@tippyjs/react";
import { Link } from "react-router-dom";
import "tippy.js/dist/tippy.css";
import styles from "./Icon.module.scss";
import classNames from "classnames/bind";

import {
  FaBell,
  FaFacebookMessenger,
  FaSearch,
  FaUserFriends,
  FaStore,
} from "react-icons/fa";
import { FaFacebookF } from "react-icons/fa6";
import { AiFillHome, AiOutlineSetting } from "react-icons/ai";
import { PiVideoFill } from "react-icons/pi";
import { MdAdd, MdOutlineGroup } from "react-icons/md";

const cx = classNames.bind(styles);
const IconWithTooltip = ({ icon: Icon, tooltipText, link }) => {
  return (
    <Tippy
      content={tooltipText}
      placement="bottom"
      theme="dark"
      hideOnClick= "false"
      delay={[50, 700]}
      offset={[2, 18]}
    >
      <Link to={link} className={cx("icon-wrapper")}>
        <Icon size={24} />
      </Link>
    </Tippy>
  );
};

export const Icons = {
  Facebook: () => (
    <IconWithTooltip
      icon={FaFacebookF}
      tooltipText="Facebook"
      link="/"
      style={{ fill: "#007bff" }}
    />
  ),
  Home: () => <IconWithTooltip icon={AiFillHome} tooltipText="Home" link="/home" />,
  Friend: () => (
    <IconWithTooltip
      icon={FaUserFriends}
      tooltipText="Friend"
      link="/friend"
    />
  ),
  Search: () => (
    <IconWithTooltip icon={FaSearch} tooltipText="Search" link="/search" />
  ),
  Setting: () => (
    <IconWithTooltip
      icon={AiOutlineSetting}
      tooltipText="Settings"
      link="/setting"
    />
  ),
  Video: () => (
    <IconWithTooltip icon={PiVideoFill} tooltipText="Video" link="/video" />
  ),
  Messenger: () => (
    <IconWithTooltip
      icon={FaFacebookMessenger}
      tooltipText="Messenger"
      link="inbox"
    />
  ),
  Add: () => <IconWithTooltip icon={MdAdd} tooltipText="Add" link="/add" />,
  Notification: () => (
    <IconWithTooltip
      icon={FaBell}
      tooltipText="Notification"
      link="notification"
    />
  ),
  Market: () => (
    <IconWithTooltip icon={FaStore} tooltipText="Market" link="/market" />
  ),
  Group: () => (
    <IconWithTooltip icon={MdOutlineGroup} tooltipText="Group" link="/group" />
  ),
};

export default Icons;
