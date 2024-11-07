import axios from "axios";

const API_URL= "http://localhost:3001/api/videos";

export const createVideo = async (videoData) => {
    try {
        const response = await axios.post(`${API_URL}`, videoData);
        return response.data;
    } catch (error) {
        console.error("Create video failed", error.response ? error.response.data : error.message);
        throw error;
    }
};

export const getVideos = async () => {
    try {
        const response = await axios.get(`${API_URL}`);
        return response.data;
    } catch (error) {
        console.error("Error fetching videos", error.response ? error.response.data : error.message);
        throw error;
    }
};

export const getVideoById = async (videoId) => {
    try {
        const response = await axios.get(`${API_URL}/${videoId}`);
        return response.data;
    } catch (error) {
        console.error(`Error fetching video with ID: ${videoId}`, error.response ? error.response.data : error.message);
        throw error;
    }
};

export const deleteVideo = async (videoId) => {
    try {
        const response = await axios.delete(`${API_URL}/${videoId}`);
        return response.data;
    } catch ( error) {
        console.error(`Error deleting video with ID: ${videoId}`, error.response ? error.response.data : error.message);
        throw error;
    }
};