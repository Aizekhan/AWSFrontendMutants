import React, { useEffect, useState } from 'react';
import './App.css';

function App() {
    const [message, setMessage] = useState('');

    useEffect(() => {
        fetch('https://backend-cryptap.herokuapp.com/api/test')
            .then(response => response.json())
            .then(data => setMessage(data.message))
            .catch(error => console.error('Error fetching data:', error));
    }, []);

    return (
        <div className="App">
            <header className="App-header">
                <h1>Welcome to CrypTapMutants!</h1>
                <p>{message}</p>
            </header>
        </div>
    );
}

export default App;
