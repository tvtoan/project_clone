// Post.js
import React, { useState } from "react";
import styles from "./Post.module.scss";
import classNames from "classnames/bind";
import Icons from "../Shared/Icon";
import { formatDistanceToNow, parseISO } from "date-fns";
import { addComment } from "../../services/postService";
import { useNavigate } from "react-router-dom";

const cx = classNames.bind(styles);

const formatPostDate = (dateString) => {
  const parsedDate = parseISO(dateString); // parse string ISO to Date
  return formatDistanceToNow(parsedDate, { addSuffix: true }); // calc distance time and add 'ago'
};

const Post = ({ post }) => {
  const [isLiked, setIsLiked] = useState(false);
  const [commentText, setCommentText] = useState("");
  const [comments, setComments] = useState(post.comments || []);
  const timeAgo = formatPostDate(post.createdAt);
console.log(post)
  const navigate = useNavigate();

  const handleAvatarClick = () => {
    navigate(`/profile/${post.userId?._id}`);
  };
  const handleLikeClick = (e) => {
    setIsLiked(!isLiked); //
  };

  const handleCommentSubmit = async (e) => {
    e.preventDefault();
    if (!commentText.trim()) return;

    try {
      const newPost = await addComment(post._id, { comment: commentText });
      setComments(newPost.comments); // render comments list
      setCommentText(""); // clear text after comment success
    } catch (error) {
      console.error("Failed to add comment", error);
    }
  };

  return (
    <div className={cx("post")}>
      <div className={cx("user-info")}>
        <img
          src={`http://localhost:3001${post.userId?.profilePicture}`}
          className={cx("img")}
          onClick={post.userId ? handleAvatarClick : undefined}
        />
        <h3 className={cx("username")}>
          {post.userId?.username || "Unknown User"}
        </h3>
      </div>
      <p className={cx("post-time")}>{timeAgo}</p>
      <p className={cx("description")}>{post.description}</p>

      {post.image && (
        <img
          src={`http://localhost:3001${post.image}`}
          alt="Post"
          className={cx("post-image")}
        />
      )}
      <div className={cx("post-actions")}>
        <Icons.Like
          className={cx("button-icon", { active: isLiked })}
          onClick={handleLikeClick}
        />
        <Icons.Comment className={cx("button-icon")} />
        <Icons.Share className={cx("button-icon")} />
      </div>
      <div className={cx("comments")}>
        <h4 className={cx("comments-title")}>Comments:</h4>
        <ul className={cx("comments-list")}>
          {Array.isArray(comments) && comments.length > 0 ? (
            comments.map((comment) => {
              const commentTime = formatPostDate(comment.createAt); //  calc comment time ago
              return (
                <li key={comment._id} className={cx("comment-item")}>
                  <div className={cx("comment-user")}>
                    <img
                      src={`http://localhost:3001${comment.userId?.profilePicture}`}
                      className={cx("img")}
                     
                    />
                    <div className={cx("comment-details")}>
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
            <p className={cx("no-comments")}>No comments available</p>
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

export default Post;
