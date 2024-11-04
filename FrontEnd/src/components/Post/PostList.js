import React, { useEffect, useState } from "react";
import postService from "../../services/postService";
import Post from "./Post";
import CreatePost from "./CreatePost";

const PostList = ({ userId }) => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const data = await postService.getPosts();
        setPosts(data);
      } catch (error) {
        console.error("Error fetching posts", error);
      }
    };
    fetchPosts();
  }, []);

  const handlePostCreated = (newPost) => {
    setPosts((prevPost) => [newPost, ...prevPost]);
  };

  return (
    <div>
      <CreatePost onPostCreated={handlePostCreated} userId={userId} />
      <h2>Posts</h2>
      <ul>
        {posts.map((post) => (
          <li key={post._id}>
            <Post post={post} />
          </li>
        ))};
      </ul>
    </div>
  );
};

export default PostList;