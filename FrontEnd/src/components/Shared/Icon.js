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
  FaRegComment,
} from "react-icons/fa";
import { FaFacebookF } from "react-icons/fa6";
import { AiFillHome, AiOutlineSetting, AiOutlineLike } from "react-icons/ai";
import { PiVideoFill, PiShareFat, PiUploadSimple } from "react-icons/pi";
import { MdAdd, MdOutlineGroup, MdDelete, MdOutlineLinkedCamera } from "react-icons/md";
import { RiSendPlaneFill, RiCloseCircleFill } from "react-icons/ri";

const cx = classNames.bind(styles);
const IconWithTooltip = ({
  icon: Icon,
  tooltipText,
  link,
  className,
  onClick,
}) => {
  return (
    <Tippy
      content={tooltipText}
      placement="bottom"
      theme="dark"
      hideOnClick="false"
      delay={[50, 100]}
      offset={[2, 18]}
    >
      {Link ? (
        <Link
          to={link}
          className={cx("icon-wrapper", className)}
          onClick={onClick}
        >
          <Icon size={24} />
        </Link>
      ) : (
        <div className={cx("icon-wrapper", className)} onClick={onClick}>
          <Icon size={24} />
        </div>
      )}
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
  Home: () => (
    <IconWithTooltip icon={AiFillHome} tooltipText="Home" link="/home" />
  ),
  Friend: () => (
    <IconWithTooltip icon={FaUserFriends} tooltipText="Friend" link="/friend" />
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

  Like: ({ onClick, className }) => (
    <IconWithTooltip icon={AiOutlineLike} tooltipText="Like" />
  ),
  Comment: () => <IconWithTooltip icon={FaRegComment} tooltipText="Comment" />,
  Share: () => <IconWithTooltip icon={PiShareFat} tooltipText="Share" />,
  SubmitComment: () => (

    <IconWithTooltip icon={RiSendPlaneFill} tooltipText="Comment" />
  ),
  Upload: () => (<IconWithTooltip icon = {PiUploadSimple} tooltipText= "Upload" />),
  Delete: () => (<IconWithTooltip icon = {MdDelete} tooltipText={'Delete'} />),
  Close: () => (<IconWithTooltip icon = {RiCloseCircleFill} tooltipText={"Close"} />),
  Camera: () => (<IconWithTooltip icon = {MdOutlineLinkedCamera} tooltipText={"Change Img"} />),
  
};

export default Icons;
