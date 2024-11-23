import React, { useState } from "react";
import styles from "./Video.module.scss";
import classNames from "classnames/bind";
import User from "../Shared/User";
import {  formatDistanceToNowStrict, parseISO } from "date-fns";
import Icons from "../Shared/Icon";
import { addComment } from "../../services/videoService";

const cx = classNames.bind(styles);

const formatVideoDate = (dateString) => {
  const parsedDate = parseISO(dateString);
  return formatDistanceToNowStrict(parsedDate, { addSuffix: true });
};
const Video = ({ video }) => {
  const [commentText, setCommentText] = useState("");
  const [comments, setComments] = useState(video.comments || []);

  const timeAgo = formatVideoDate(video.createdAt);

  const handleCommentSubmit = async (e) => {
    e.preventDefault();
    if (!commentText.trim()) return;

    try {
      const newVideo = await addComment(video._id, { comment: commentText });
      setComments(newVideo.comments); //render comments list
      setCommentText("");
    } catch (error) {
      console.error("Failed to add comment", error);
    }
  };

  return (
    <div className={cx("video")}>
      <div className={cx("user-info")}>
        <User />
        <p>{video.userId?.username || "Unknown User"}</p>
      </div>
      <p className={cx("time-ago")}>{timeAgo}</p>
      <h3 className={cx("description")}>{video.description}</h3>
      <video controls className={cx("file-video")}>
        <source
          src={`http://localhost:3001/${video.videoPath}`}
          type="video/mp4"
        />
      </video>
      <div className={cx("video-actions")}>
        <Icons.Like className={cx("button-icon")} />
        <Icons.Comment className={cx("button-icon")} />
        <Icons.Share className={cx("button-icon")} />
      </div>
      <div classname={cx("comments")}>
        <h4 className={cx("comment-title")}> Comments</h4>
        <ul className={cx("comment-list")}>
          {Array.isArray(comments) && comments.length > 0 ? (
            comments.map((comment) => {
              console.log(comment);
              const commentTime = formatVideoDate(comment.createAt);
              return (
                <li key={comment._id} className={cx("comment-item")}>
                  <div className={cx("comment-details")}>
                      <User />
                    <div className={cx('comment-user')}>
                      <strong className={cx("comment-username")}>
                        {comment.userId?.username || "Unknown User"}
                      </strong>
                      <p className={cx("time-comment")}>{commentTime}</p>
                      <p className={cx("comment-text")}>{comment.comment}</p>
                    </div>
                  </div>
                </li>
              );
            })
          ) : (
            <p className={cx("no-comments")}>No Comments Available</p>
          )}
        </ul>
        {/* Form add comment */}
        <form onSubmit={handleCommentSubmit} className={cx("form-comment")}>
          <input
            type="text"
            value={commentText}
            onChange={(e) => setCommentText(e.target.value)}
            placeholder="Add a comment..."
            className={cx("comment-input")}
          />
          <button
            type="submit"
            className={cx("button-submit")}
            onClick={handleCommentSubmit}
          >
            <Icons.SubmitComment />
          </button>
        </form>
      </div>
    </div>
  );
};

export default Video;
