import React from "react";
import styles from "./Story.module.scss";
import classNames from "classnames/bind";
import User from "../Shared/User";
import { useNavigate } from "react-router-dom";

const cx = classNames.bind(styles);

const Story = ({ story }) => {

  const navigate = useNavigate();

  const handleStoryClick = () => {
    navigate(`/story/${story._id}`);
  }
  return (
    <div className={cx("story")} onClick={handleStoryClick}>
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
