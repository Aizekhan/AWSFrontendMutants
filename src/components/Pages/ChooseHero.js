import React, { useState, useEffect } from 'react';
import axios from 'axios';
import config from './config';

const ChooseHero = () => {
    const [heroes, setHeroes] = useState([]);

    useEffect(() => {
        const fetchHeroes = async () => {
            try {
                const response = await axios.get(`${config.BACKEND_URL}/getHeroes`);
                setHeroes(response.data);
            } catch (error) {
                console.error('Error fetching heroes:', error);
            }
        };

        fetchHeroes();
    }, []);

    return (
        <div>
            <h1>Виберіть свого героя</h1>
            <ul>
                {heroes.map((hero) => (
                    <li key={hero.HeroID}>{hero.Name}</li>
                ))}
            </ul>
        </div>
    );
};

export default ChooseHero;
