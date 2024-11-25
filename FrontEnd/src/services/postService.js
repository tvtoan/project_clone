import axios from 'axios';

const API_URL = "http://localhost:3001/api/posts"

export const createPost = async (formData) => {
    try {
        const token = localStorage.getItem('token');  // Lấy token từ localStorage
        const response = await axios.post(`${API_URL}`, formData, {
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "multipart/form-data",  //  Content-Type
            }
        });
        return response.data;
    } catch (error) {
        console.error('Create post failed', error.response ? error.response.data : error.message);
        throw error;
    }
};

export const addComment = async (postId, commentData) => {
    try {
        const token = localStorage.getItem('token');
        const response = await axios.post( 
            `${API_URL}/${postId}/comments`,
            commentData, 
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }
        );
        return response.data
    }  catch (error) {
        console.error("Error adding comment", error.response? error.response.data: error.message);
        throw error;
    }
};

export const getPosts = async () => {
    try {
        const token = localStorage.getItem('token');
        const response = await axios.get(`${API_URL}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return response.data;
    } catch(error) {
        console.error("Error fetching posts", error.response ? error.response.data : error.message);
        throw error;
    }
};

export const getPostById = async (postId) => {
    try {
        const token = localStorage.getItem('token');
        const response = await axios.get(`${API_URL}/${postId}`, {
            headers: {
                Authorization: `Bearer ${token}`, // Add token into header
            }
        });
        return response.data;
    } catch(error) {
        console.error(`Error fetching post with ID: ${postId}`, error.response ? error.response.data : error.message);
        throw error;
    }
};

export const getPostsByUserId = async (userId) => {
    try {
        const token = localStorage.getItem('token');
        const response = await axios.get(`${API_URL}/user/${userId}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return response.data;
    } catch (error) {
        console.error("Error fetching user posts", error.message);
        throw error;
    }
};

export const deletePost = async (postId) => {
    try {
        const token = localStorage.getItem('token');
        const response = await axios.delete(`${API_URL}/${postId}`, {
            headers: {
                Authorization: `Bearer ${token}`,  
            }
        });
        return response.data;
    } catch (error) {
        console.error(`Error deleting post with ID: ${postId}`);
        throw error;
    }
};