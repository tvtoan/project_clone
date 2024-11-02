import axios from 'axios';

const API_URL = "http://localhost:3000/api/posts"

export const createPost = async (postData) => {
    try {
        const response = await axios.post(`${API_URL}`, postData);
        return response.data;
    } catch( error) {
        console.log('Create post failed', error);
        throw error;
    }
};

export const getPosts = async () => {
    try {
        const response = await axios.get(`${API_URL}`);
        return response.data;
    } catch(error) {
        console.log("Error fetching posts", error);
        throw error;
    }
};

export const getPostById = async (postId) => {
    try {
        const response = await axios.get(`${API_URL}/${postId}`);
        return response.data;
    } catch(error) {
        console.log(`Error fetching post with ID: ${postId}`, error);
        throw error;
    }
};

export const deletePost = async (postId) => {
    try {
        const response = await axios.delete(`${API_URL}/${postId}`);
        return response.data;
    } catch (error) {
        console.log(`Error deleting post with ID: ${postId}`);
        throw error;
    }
};