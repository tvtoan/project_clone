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
        const token = response.data.token;
        localStorage.setItem('token', token);
        return response.data;
    } catch (error) {
        console.error('Error logging in', error);
        throw error;
    }
};

export const getCurrentUser = async () => {
    const token = localStorage.getItem('token');
    if(!token) {
        throw new Error("No token found");
    }
    
    try {
        const response = await axios.get(`${API_URL}/current`, {
            headers: {Authorization: `Bearer ${token}`}
        });
        return response.data;
    } catch (error) {
        console.error('Error fetching current user', user);
        throw error;
    }
};

export const logout = () => {
    localStorage.removeItem('token');
};