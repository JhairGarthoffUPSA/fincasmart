// ProfilePage.tsx
import React from 'react';
import './ProfilePage.css';
import { useNavigate } from 'react-router-dom';

import farm from '../img/farm.jpg';
import farm1 from '../img/farm1.jpg';
import farm2 from '../img/farm2.jpg';
import profileImage from '../img/user.jpg';


const ProfilePage: React.FC = () => {
    // Mock user data
    const user = {
        name: 'Jhair Garthoff',
        profilePicture: profileImage,
        dateJoined: '2023-01-15',
        farms: [
            {
                name: 'Finca #42',
                terrainSize: '42 hectáreas (104 acres)',
                dateBuilt: '2001-05-10',
                numWorkers: 15,
                mainPicture: farm,
                pictures: [farm1, farm2] // Adjust paths to farm images
            }
        ]
    };

    const navigate = useNavigate();

    return (
        <div className="profile-page">
            <header className="homepage-header">
                <a href="/" className="homepage-title"
                   style={{textDecoration: 'none', color: 'white', cursor: 'default'}}
                   onClick={(e) => {
                       e.preventDefault();
                       navigate('/home');
                   }}>
                    <h1>FincaSmart</h1>
                </a>
                <nav>
                    <button onClick={() => navigate('/profile')}>Perfil</button>
                    <button onClick={() => navigate('/inventory')}>Inventarios</button>
                    <button onClick={() => navigate('/transactions')}>Transacciones</button>
                </nav>
            </header>

            <div className="profile-header">
            <img src={user.profilePicture} alt="Profile" className="profile-picture"/>
                <h1>{user.name}</h1>
            </div>
            <div className="profile-details">
                <p><strong>Fecha de Registro:</strong> {new Date(user.dateJoined).toLocaleDateString()}</p>
                <h1>Detalles de Propiedad:</h1>
                <ul>
                    {user.farms.map((farm, index) => (
                        <li key={index}>
                            <h2>{farm.name}</h2>
                            <img src={farm.mainPicture} alt="farm" className="farm-main-image"/>
                            <p><strong>Tamaño del terreno:</strong> {farm.terrainSize}</p>
                            <p><strong>Fecha de
                                construcción:</strong> {new Date(farm.dateBuilt).toLocaleDateString()}</p>
                            <p><strong>Cantidad de trabajadores:</strong> {farm.numWorkers}</p>
                            <h2>Imágenes de la Propiedad</h2>
                            <div className="property-images">
                                {farm.pictures.map((picture, picIndex) => (
                                    <img key={picIndex} src={picture} alt={`Farm ${index + 1} Picture`}
                                         className="property-images"/>
                                ))}
                            </div>
                        </li>
                    ))}

                </ul>
            </div>
        </div>
    );
};

export default ProfilePage;
