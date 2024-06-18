// ProfilePage.tsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
import './ProfilePage.css';
import farm from '../img/farm.jpg';
import farm1 from '../img/farm1.jpg';
import farm2 from '../img/farm2.jpg';
import profileImage from '../img/user.jpg';

// Sample employee data
const employees = [
    { id: 1, name: 'Jhair Garthoff', age: 21, role: 'Administrador de la Finca', yearsWorking: 3, currentState: 'Ausente' },
    { id: 2, name: 'Mario Dorado', age: 21, role: 'Encargado de Cultivos', yearsWorking: 3, currentState: 'Ausente' },
    { id: 3, name: 'Luis Jimenez', age: 35, role: 'Encargado de Ganado', yearsWorking: 7, currentState: 'Presente' },
    { id: 4, name: 'Jaime Velasquez', age: 25, role: 'Responsable de Inventario', yearsWorking: 2, currentState: 'Presente' },
    { id: 5, name: 'David Añez', age: 33, role: 'Responsable de Inventario', yearsWorking: 4, currentState: 'Presente' },
    { id: 6, name: 'María Garcia', age: 27, role: 'Tecnico Agronomo', yearsWorking: 6, currentState: 'Presente' },
    { id: 7, name: 'Carlos Martinez', age: 29, role: 'Tecnico Agronomo', yearsWorking: 3, currentState: 'Presente' },
    { id: 8, name: 'Lucía Fernandez', age: 31, role: 'Tecnico Agronomo', yearsWorking: 5, currentState: 'Ausente' },
    { id: 9, name: 'Javier Fernandez', age: 26, role: 'Tecnico Agronomo', yearsWorking: 4, currentState: 'Ausente' },
    { id: 10, name: 'Laura Lopez', age: 33, role: 'Tecnico Agronomo', yearsWorking: 7, currentState: 'Presente' },
    { id: 11, name: 'Daniel Ramirez', age: 34, role: 'Tecnico Agronomo', yearsWorking: 6, currentState: 'Presente' },
    { id: 12, name: 'Pedro Sanchez', age: 30, role: 'Tecnico Ganadero', yearsWorking: 5, currentState: 'Presente' },
    { id: 13, name: 'Sofia Fernandez', age: 20, role: 'Tecnico Ganadero', yearsWorking: 1, currentState: 'Ausente' },
    { id: 14, name: 'Juan Torres', age: 27, role: 'Tecnico Ganadero', yearsWorking: 3, currentState: 'Presente' },
    { id: 15, name: 'Ana Rodriguez', age: 29, role: 'Tecnico Ganadero', yearsWorking: 6, currentState: 'Presente' },
];

const ProfilePage: React.FC = () => {
    const user = {
        name: 'Jhair Garthoff',
        profilePicture: profileImage,
        dateJoined: '2023-12-10',
        farms: [
            {
                name: 'Finca #47',
                terrainSize: '47 hectáreas (116 acres)',
                dateBuilt: '2001-05-10',
                numWorkers: 15,
                mainPicture: farm,
                pictures: [farm1, farm2]
            }
        ]
    };

    const navigate = useNavigate();

    const handleLogout = () => {
        navigate('/');
    };

    return (
        <div className="profile-page">
            <header className="homepage-header">
                <a href="/" className="homepage-title"
                   style={{ textDecoration: 'none', color: 'white', cursor: 'default' }}
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
                    <button onClick={() => navigate('/management')}>Gestión</button>
                </nav>
            </header>

            <div className="profile-header">
                <div className="profile-header-content">
                    <img src={user.profilePicture} alt="Profile" className="profile-picture" />
                    <h1>{user.name}</h1>
                    <button className="logout-button" onClick={handleLogout}>Cerrar Sesión</button>
                </div>
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
                            <p><strong>Fecha de construcción:</strong> {new Date(farm.dateBuilt).toLocaleDateString()}
                            </p>
                            <p><strong>Cantidad de trabajadores:</strong> {farm.numWorkers}</p>
                            <h1>Lista de Trabajadores:</h1>
                            <table className="workers-table">
                                <thead>
                                <tr>
                                    <th>Nombre</th>
                                    <th>Edad</th>
                                    <th>Rol</th>
                                    <th>Años Trabajando</th>
                                </tr>
                                </thead>
                                <tbody>
                                {employees.map((employee) => (
                                    <tr key={employee.id}>
                                        <td>{employee.name}</td>
                                        <td>{employee.age}</td>
                                        <td>{employee.role}</td>
                                        <td>{employee.yearsWorking}</td>
                                    </tr>
                                ))}
                                </tbody>
                            </table>
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
