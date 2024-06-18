import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './ManagementPage.css'; // Import your CSS file for styling

const ManagementPage: React.FC = () => {
    // Sample data for employees
    const [employees, setEmployees] = useState([
        { id: 1, name: 'Jhair Garthoff', age: 21, role: 'Administrador de la Finca', currentState: 'Ausente', taskAssignment: '' },
        { id: 2, name: 'Mario Dorado', age: 21, role: 'Encargado de Cultivos', currentState: 'Ausente', taskAssignment: '' },
        { id: 3, name: 'Luis Jimenez', age: 35, role: 'Encargado de Ganado', currentState: 'Presente', taskAssignment: '' },
        { id: 4, name: 'Jaime Velasquez', age: 25, role: 'Responsable de Inventario', currentState: 'Presente', taskAssignment: '' },
        { id: 5, name: 'David Añez', age: 33, role: 'Responsable de Inventario', currentState: 'Presente', taskAssignment: '' },
        { id: 6, name: 'María Garcia', age: 27, role: 'Tecnico Agronomo', currentState: 'Presente', taskAssignment: '' },
        { id: 7, name: 'Carlos Martinez', age: 29, role: 'Tecnico Agronomo', currentState: 'Presente', taskAssignment: '' },
        { id: 8, name: 'Lucía Fernandez', age: 31, role: 'Tecnico Agronomo', currentState: 'Ausente', taskAssignment: '' },
        { id: 9, name: 'Javier Fernandez', age: 26, role: 'Tecnico Agronomo', currentState: 'Ausente', taskAssignment: '' },
        { id: 10, name: 'Laura Lopez', age: 33, role: 'Tecnico Agronomo', currentState: 'Presente', taskAssignment: '' },
        { id: 11, name: 'Daniel Ramirez', age: 34, role: 'Tecnico Agronomo', currentState: 'Presente', taskAssignment: '' },
        { id: 12, name: 'Pedro Sanchez', age: 30, role: 'Tecnico Ganadero', currentState: 'Presente', taskAssignment: '' },
        { id: 13, name: 'Sofia Fernandez', age: 20, role: 'Tecnico Ganadero', currentState: 'Ausente', taskAssignment: '' },
        { id: 14, name: 'Juan Torres', age: 27, role: 'Tecnico Ganadero', currentState: 'Presente', taskAssignment: '' },
        { id: 15, name: 'Ana Rodriguez', age: 29, role: 'Tecnico Ganadero', currentState: 'Presente', taskAssignment: '' },
    ]);

    // State to manage form visibility
    const [showForm, setShowForm] = useState(false);

    // State to manage form input values
    const [formData, setFormData] = useState({
        employeeId: 0,
        newState: '',
    });

    // State to manage task assignments
    const [taskAssignments, setTaskAssignments] = useState<{ [key: number]: string }>({});

    // List of tasks
    const tasks = [
        "Preparación de tierra para cosechar.",
        "Asignación de espacios para cosecha.",
        "Provisión de semillas para cosechar.",
        "Plantación de semillas para cosecha.",
        "Registro de plantación.",
        "Mantenimiento de tierras.",
        "Monitoreo y control de plantaciones.",
        "Registro de mantenimiento de tierras y control de plantaciones.",
        "Registro de Inventario presente en almacén.",
        "Registro de ingreso en Inventario.",
        "Registro de salida en Inventario.",
        "Generación de reporte de Inventario (último ciclo).",
        "Registro de Transacciones (entrada y salida).",
        "Reporte de Transacciones y flujo monetario.",
        "Compra de Insumos.",
        "Venta de Insumos.",
        "Mantenimiento de Maquinarias.",
        "Mantenimiento de Herramientas.",
        "Reporte de estado Maquinarias y Herramientas.",
        "Control y cuidado de ganado presente.",
        "Reporte de ganado presente.",
        "Procesamiento de ganado (para venta).",
        "Registro de ganado presente. (entrada y salida).",
        "Descanso (en propiedad).",
        "Chequeo de estado del personal.",
        "Generación reporte general.",
        "Generación reporte producción."
    ];

    // Task descriptions corresponding to each task number
    const taskDescriptions = [
        "Preparación de tierra para cosechar.",
        "Asignación de espacios para cosecha.",
        "Provisión de semillas para cosechar.",
        "Plantación de semillas para cosecha.",
        "Registro de plantación.",
        "Mantenimiento de tierras.",
        "Monitoreo y control de plantaciones.",
        "Registro de mantenimiento de tierras y control de plantaciones.",
        "Registro de Inventario presente en almacén.",
        "Registro de ingreso en Inventario.",
        "Registro de salida en Inventario.",
        "Generación de reporte de Inventario (último ciclo).",
        "Registro de Transacciones (entrada y salida).",
        "Reporte de Transacciones y flujo monetario.",
        "Compra de Insumos.",
        "Venta de Insumos.",
        "Mantenimiento de Maquinarias.",
        "Mantenimiento de Herramientas.",
        "Reporte de estado Maquinarias y Herramientas.",
        "Control y cuidado de ganado presente.",
        "Reporte de ganado presente.",
        "Procesamiento de ganado (para venta).",
        "Registro de ganado presente. (entrada y salida).",
        "Descanso (en propiedad).",
        "Chequeo de estado del personal.",
        "Generación reporte general.",
        "Generación reporte producción."
    ];

    // Function to handle form input change
    const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const { name, value } = e.target;
        setTaskAssignments({
            ...taskAssignments,
            [name]: value,
        });
    };

    // Function to handle form submission
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        // Update employee state based on formData and taskAssignments
        const updatedEmployees = employees.map(emp => {
            if (emp.id === formData.employeeId) {
                return {
                    ...emp,
                    currentState: formData.newState,
                    taskAssignment: taskAssignments[emp.id] || '', // Use task assignment from state
                };
            }
            return emp;
        });
        setEmployees(updatedEmployees);
        // Hide the form after submission
        setShowForm(false);
        // Clear the form data
        setFormData({
            employeeId: 0,
            newState: '',
        });
    };

    // Function to toggle form visibility
    const toggleForm = (id: number) => {
        setFormData({
            employeeId: id,
            newState: '',
        });
        setShowForm(!showForm);
    };

    const navigate = useNavigate();

    return (
        <div className="management-page">
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
                    <button onClick={() => navigate('/management')}>Gestión</button>
                </nav>
            </header>

            <header className="management-header">
                <h1>Gestión de Trabajadores</h1>
            </header>
            <main className="management-main">
                <table className="employee-table">
                    <thead>
                    <tr>
                        <th>Nombre</th>
                        <th>Edad</th>
                        <th>Rol</th>
                        <th>Estado Actual</th>
                        <th>Asignación de Tarea</th>
                        <th>Asistencia</th>
                    </tr>
                    </thead>
                    <tbody>
                    {employees.map(emp => (
                        <tr key={emp.id}>
                            <td>{emp.name}</td>
                            <td>{emp.age}</td>
                            <td>{emp.role}</td>
                            <td>{emp.currentState}</td>
                            <td>

                                <select name={String(emp.id)} value={taskAssignments[emp.id] || ''} onChange={handleChange}>
                                    <option value="">Asignar Tarea</option>
                                    {tasks.map((task, index) => (
                                        <option key={index + 1} value={`${index + 1}`}>Tarea {index + 1}</option>
                                    ))}
                                </select>
                            </td>
                            <td>
                                <button onClick={() => toggleForm(emp.id)}>Actualizar</button>
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>

                {/* Task Descriptions List */}
                <div className="task-descriptions">
                    <h2>Descripción de Tareas</h2>
                    <ul>
                        {taskDescriptions.map((description, index) => (
                            <li key={index}>
                                <strong>Tarea {index + 1}:</strong> {description}
                            </li>
                        ))}
                    </ul>
                </div>

                {/* Form for Changing Employee State */}
                {showForm && (
                    <form className="change-state-form" onSubmit={handleSubmit}>
                        <label>
                            Asistencia:
                            <select name="newState" value={formData.newState} onChange={(e) => setFormData({ ...formData, newState: e.target.value })}>
                                <option value="">Seleccionar:</option>
                                <option value="Presente">Presente</option>
                                <option value="Ausente">Ausente</option>
                            </select>
                        </label>
                        <button type="submit">Actualizar Estado</button>
                    </form>
                )}
            </main>
        </div>
    );
};

export default ManagementPage;
