import React from "react";

const Post = ({post}) => {
    return (
        <div>
            <h3> User ID: { post.userId}</h3>
            <p> {post.description}</p>
            {post.image && <img src ={post.image} alt = "Post" /> }
            <div>
                <h4>Comments:</h4>
                <ul>
                    {post.comments.map((comment) => (
                        <li key = {comment._id}>
                            <strong>Comment ID: {comment._id }</strong>
                            <p>{comment.comment}</p>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default Post;