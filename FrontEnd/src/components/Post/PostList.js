import React, { useEffect, useState } from "react";
import {getPosts} from "../../services/postService";
import Post from "./Post";
import CreatePost from "./CreatePost";

const PostList = ({ userId }) => {
  const [posts, setPosts] = useState([]);
  const fetchPosts = async () => {
      try {
        const data = await getPosts();
        setPosts(data);
      } catch (error) {
        console.error("Error fetching posts", error);
      }
    };
  useEffect(() => {
    
    fetchPosts();
  }, []);

  const handlePostCreated = (newPost) => {
    setPosts((prevPost) => [newPost, ...prevPost]);
    fetchPosts();
  };

  return (
    <div>
      <CreatePost onPostCreated={handlePostCreated} userId={userId} />
      
      <ul style = {{listStyle :"none"}}>
        {posts.map((post) => (
          <li key={post._id}>
            <Post post={post} />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PostList;