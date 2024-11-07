import axios from "axios";

const API_URL = "http://localhost:3001/api/stories";

export const CreateStory = async (storyData) => {
    try {
        const response = await axios.post(`${API_URL}`, storyData);
        return response.data;
    } catch (error) {
        console.error("Create story failed", error.response ? error.response.data : error.message);
        throw error;
    }
};

export const getStories = async () => {
    try {
        const response = await axios.get(`${API_URL}`);
        return response.data;
    } catch (error) {
        console.error("Error fetching story", error.response ? error.response.data : error.message);
        throw error;
    }
};

export const getStoryById = async (storyId) => {
    try {
        const response = await axios.get(`${API_URL}/${storyId}`);
        return response.data;
    } catch (error) {
        console.error(`Error fetching story with ID: ${storyId}`);
        throw error;
    }
};

export const deleteStory = async (storyId) => {
    try {
        const response = await axios.delete(`${API_URL}/${storyId}`);
        return response.data;
    } catch (error) {
        console.error(`Error deleting story with ID: ${storyId}`);
        throw error;
    }
};