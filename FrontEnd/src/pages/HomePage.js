import React, { useContext, useEffect } from "react";
import PostList from "../components/Post/PostList";
import { PostContext } from "../context/PostContext";

const HomePage = () => {
    const {posts, fetchPosts} = useContext(PostContext);

    useEffect(() => {
        fetchPosts();
    }, []);

    return (
        <div>
            <h1>Home</h1>
            <PostList posts = {posts} />
        </div>
    );
};

export default HomePage;