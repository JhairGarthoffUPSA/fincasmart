// IntroPage.tsx
import React from 'react';
import { Link } from 'react-router-dom';
import './IntroPage.css';
// @ts-ignore
import video from '../img/video.mp4';



const IntroPage: React.FC = () => {
    return (
        <div className="intro-page">
            <video className="video-background" autoPlay loop muted>
                <source src={video} type="video/mp4" />
                Your browser does not support the video tag.
            </video>
            <div className="content">
                <p>Solución inteligente exlusivo para la Finca #42.</p>
                <Link to="/login" className="login-button">Login</Link>
            </div>
        </div>
    );
};

export default IntroPage;
