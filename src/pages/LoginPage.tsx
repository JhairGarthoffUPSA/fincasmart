import React, { useState } from 'react';
import './LoginPage.css';
import { useNavigate } from 'react-router-dom';

const LoginPage: React.FC = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleLogin = (event: React.FormEvent) => {
        event.preventDefault();
        // Add login logic here (e.g., API call to authenticate the user)
        console.log('Login submitted', { username, password });

        // Navigate to the Home Page upon successful login
        navigate('/home');
    };

    return (
        <div className="login-page">
            <div className="login-container">
                <h1>FincaSmart Login</h1>
                <form onSubmit={handleLogin}>
                    <div className="login-form-group">
                        <label htmlFor="username">Usuario:</label>
                        <input
                            type="text"
                            id="username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                        />
                    </div>
                    <div className="login-form-group">
                        <label htmlFor="password">Contraseña:</label>
                        <input
                            type="password"
                            id="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>
                    <button className="login-button" type="submit">Login</button>
                </form>
            </div>
        </div>
    );
};

export default LoginPage;
