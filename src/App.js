import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import axios from 'axios';
import ChooseHero from './components/Pages/ChooseHero';
import { useUserStats, UserStatsProvider } from './context/UserStatsContext';

function App() {
    const { updateUserStats, userStats } = useUserStats();

    useEffect(() => {
        const fetchData = async () => {
            const token = localStorage.getItem('authToken');
            if (token) {
                try {
                    const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/userProgress`, {
                        headers: {
                            Authorization: `Bearer ${token}`
                        }
                    });
                    updateUserStats(response.data);
                } catch (error) {
                    console.error('Error fetching user data:', error);
                }
            }
        };
        fetchData();
    }, [updateUserStats]);

    if (!userStats || !userStats.currentHeroId) {
        return (
            <Router>
                <Routes>
                    <Route path="/choose-hero" element={<ChooseHero />} />
                    <Route path="*" element={<Navigate to="/choose-hero" />} />
                </Routes>
            </Router>
        );
    }

    return (
        <Router>
            <Routes>
                <Route path="/choose-hero" element={<ChooseHero />} />
            </Routes>
        </Router>
    );
}

export default function AppWrapper() {
    return (
        <UserStatsProvider>
            <App />
        </UserStatsProvider>
    );
}
