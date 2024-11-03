import axios from 'axios';

const API_URL = "http://localhost:3000/api/auth"

export const register = async (userData) => {
    try {
        const response = await axios.post(`${API_URL}/register`, userData);
        return response.data;
    } catch(error) {
        console.error('Error register user', error);
        throw error;
    }
};

export const login = async (userData) => {
    try {
        const response = await axios.post(`${API_URL}/login`, userData);
        return response.data;
    } catch (error) {
        console.error('Error logging in', error);
        throw error;
    }
};