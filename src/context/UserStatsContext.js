import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import axios from 'axios';

const UserStatsContext = createContext();

export const useUserStats = () => useContext(UserStatsContext);

export const UserStatsProvider = ({ children }) => {
    const [userStats, setUserStats] = useState(null);

    const updateUserStats = (newStats) => {
        setUserStats(prevStats => ({
            ...prevStats,
            ...newStats
        }));
    };

    const loadUserStats = useCallback(async () => {
        try {
            const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/userProgress`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('authToken')}`
                }
            });
            setUserStats(response.data);
        } catch (error) {
            console.error('Error loading user progress:', error);
        }
    }, []);

    useEffect(() => {
        loadUserStats();
    }, [loadUserStats]);

    return (
        <UserStatsContext.Provider value={{ userStats, updateUserStats }}>
            {children}
        </UserStatsContext.Provider>
    );
};
