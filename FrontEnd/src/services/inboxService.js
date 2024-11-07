import axios from "axios";

const API_URL = "http://localhost:3001/api/inbox"

export const createMessage = async (messageData) => {
    try {
        const response = await axios.post(`${API_URL}`, messageData);
        return response.data;
    } catch (error) {
        console.error("Create message failed", error.response ? error.response.data : error.message);
        throw error;
    }
};

export const getMessages = async () => {
    try {
        const response = await axios.get(`${API_URL}`);
        return response.data;
    } catch (error) {
        console.error("Error fetching message ", error.response ? error.response.data : error.message);
        throw error;
    }
};


