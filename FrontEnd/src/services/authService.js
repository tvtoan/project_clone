import axios from "axios";

const API_URL = "http://localhost:3001/api/auth";

export const register = async (userData) => {
  try {
    const response = await axios.post(`${API_URL}/register`, userData);
    return response.data;
  } catch (error) {
    console.error(
      "Error register user",
      error.response ? error.response.data : error.message
    );
    throw error;
  }
};

export const login = async (email, password) => {
  try {
    const response = await axios.post(
      `${API_URL}/login`,
      {
        email,
        password,
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    if(response.data.token) {
        localStorage.setItem("token", response.data.token);
    }
    return response.data;
  } catch (error) {
    console.error(
      "Login failed",
      error.response ? error.response.data : error.message
    );
    throw error;
  }
};

export const getCurrentUser = async () => {
  const token = localStorage.getItem("token");

  if (!token) {
    throw new Error("No token found");
  }

  try {
    const response = await axios.get(`${API_URL}/current`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  } catch (error) {
    console.error(
      "Error fetching current user",
      error.response ? error.response.data : error.message
    );
    throw error;
  }
};

export const logout = () => {
  localStorage.removeItem("token");
};

export const getUserByUsername = async (username) => {
  try {
    const response = await axios.get(`${API_URL}/users`, {
      params: { username },
    });
    return response.data;
  } catch (error) {
    console.error(
      "Error fetching user by username",
      error.response ? error.response.data : error.message
    );
    throw error;
  }
};
