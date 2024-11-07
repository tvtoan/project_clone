import React from "react";

const Post = ({post}) => {
    return (
        <div>
            <h3> User : { post.userId?.username || "Unknown User"}</h3>
            <p> {post.description}</p>
            {post.image && <img src ={post.image} alt = "Post" /> }
            <div>
                <h4>Comments:</h4>
                <ul>
                    {Array.isArray(post.comments) && post.comments.length > 0 ? (
                        post.comments.map((comment) => (
                            <li key = {comment._id}>
                                <strong>Comment By: {comment.userId?.username || "Unknown User" }</strong>
                                <p>{comment.comment}</p>
                            </li>
                        ))
                    ) : (
                        <p> No comments available</p>
                    )}
                    
                </ul>
            </div>
        </div>
    );
};

export default Post;