import React, { createContext, useContext, useEffect, useState } from "react";
import postService  from '../services/postService';

export const PostContext = createContext();

export const PostProvider = ({children}) => {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchPosts = async () => {
        setLoading(true);
        try {
            const fetchedPosts = await postService.getPosts();
            setPosts(fetchedPosts);
        } catch (error) {
            console.error('Error fetching posts', error);
        } finally {
            setLoading(false);
        }
    };

    const createPost = async (postData) => {
        try {
            const newPost = await postService.createPost(postData);
            setPosts((prevPosts) => [...prevPosts, newPost]);
        } catch (error) {
            console.error("Error creating post", error);
        }
    };

    const deletePost = async (postId) => {
        try {
            await postService.deletePost(postId);
            setPosts((prevPosts) => prevPosts.filter(post => post._id !== postId));
        } catch (error) {
            console.error("Error deleting post", error);
        }
    };

    useEffect(() => {
        fetchPosts();
    },[]);

    return (
        <PostContext.Provider value = {{posts, loading, fetchPosts, createPost, deletePost}}>
            {children}
        </PostContext.Provider>
    )

};

export const usePost = () => {
    return useContext(PostContext);
};