import React, { createContext, useEffect, useReducer, useState } from "react";
import * as authService from '../services/authService';

export const AuthContext = createContext();

export const AuthProvider = ({children}) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const currentUser = await authService.getCurrentUser();
                setUser(currentUser);
            } catch (error) {
                console.error("Error fetching user", error);
            } finally {
                setLoading(false);
            }
        };
        fetchUser();
    }, []);

    const login = async (userData) => {
        const loggedInUser = await authService.login(userData);
        setUser(loggedInUser);
    };

    const logout = async () => {
        await authService.logout();
        setUser(null);
    };

    return (
        <AuthContext.Provider value = {{user, loading, login, logout}}>
            {children}
        </AuthContext.Provider>
    );
   
}