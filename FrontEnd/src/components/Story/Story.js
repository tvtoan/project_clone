import React from "react";
import styles from "./Story.module.scss";
import classNames from "classnames/bind";
import User from "../Shared/User";

const cx = classNames.bind(styles);

const Story = ({ story }) => {
  return (
    <div className={cx("story")}>
      <img
        src={`http://localhost:3001${story.image}`}
        alt="story"
        className={cx("story-image")}
      />
      <div className={cx("story-info")}>
        <div className = {cx('user')}> 

          <div className={cx('avatar')}>

           <User  /> 
          </div>
          <p className={cx("story-user")}>{story.userId.username}</p>
        </div>

      </div>
    </div>
  );
};

export default Story;
