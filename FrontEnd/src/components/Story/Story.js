import React from "react";
import styles from "./Story.module.scss";
import classNames from "classnames/bind";
import User from "../Shared/User";

const cx = classNames.bind(styles);

const Story = ({ story }) => {
  return (
    <div className={cx("story")}>
      <h3>User Id: {story.userId}</h3>
      <img src={story.image} alt="story" className={cx("story-image")} />
      <div className= {cx('story-info')}>
        <User />
        <p className= {cx('story-user')}>{Story.userId.username}</p>

        <p className={cx('story-text')}> {story.text}</p>
      </div>
    </div>
  );
};

export default Story;
