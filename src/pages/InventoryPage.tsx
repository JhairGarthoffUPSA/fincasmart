// InventoryPage.tsx
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Chart, registerables } from 'chart.js'; // Import Chart.js and its registerables
import './InventoryPage.css';

Chart.register(...registerables); // Register Chart.js components

type ChartInstance = Chart<'doughnut', number[], string>; // Define custom type for chart instance

const InventoryPage: React.FC = () => {
    const [inventory] = useState([
        { product: 'Tomates', quantity: 105 },
        { product: 'Maíz', quantity: 180 },
        { product: 'Lechugas', quantity: 310 },
        { product: 'Zanahorias', quantity: 20 },
    ]);

    const productionVolumes = [
        { product: 'Tomates', volumes: [363, 255, 301, 280, 242, 579] },
        { product: 'Maíz', volumes: [154, 200, 229, 291, 230, 241] },
        { product: 'Lechugas', volumes: [402, 411, 419, 398, 390, 392] },
        { product: 'Zanahorias', volumes: [102, 147, 151, 195, 102, 58] },
    ];

    const createProductionVolumeCharts = (productionVolumes: { product: string; volumes: number[] }[]) => {
        productionVolumes.forEach(({ product, volumes }, index) => {
            const canvasId = `production-volume-chart-${index}`;
            const canvas = document.getElementById(canvasId) as HTMLCanvasElement;

            // Check if canvas element exists before creating the chart
            if (canvas) {
                const ctx = canvas.getContext('2d');
                if (ctx) {
                    new Chart(ctx, {
                        type: 'line',
                        data: {
                            labels: ['Enero', 'Febrero', 'Marzo', 'Abil', 'Mayo', 'Junio'],
                            datasets: [{
                                label: product,
                                data: volumes,
                                borderColor: getRandomColor(),
                                backgroundColor: 'rgba(0, 0, 0, 0)',
                                borderWidth: 1
                            }]
                        },
                        options: {
                            scales: {
                                y: {
                                    beginAtZero: true
                                }
                            }
                        }
                    });
                }
            }
        });
    };

    const getRandomColor = () => {
        const letters = '0123456789ABCDEF';
        let color = '#';
        for (let i = 0; i < 6; i++) {
            color += letters[Math.floor(Math.random() * 16)];
        }
        return color;
    };

    useEffect(() => {
        // Create and update charts
        const overallInventoryChart = createDoughnutChart('overall-inventory-chart', inventory.map(item => item.quantity), inventory.map(item => item.product));
        const seedsInventoryChart = createDoughnutChart('seeds-inventory-chart', [50, 30, 20], ['Semillas de Tomate', 'Semillas de Maíz', 'Semillas de Lechuga']);
        const cattleInventoryChart = createDoughnutChart('cattle-inventory-chart', [15, 10, 22], ['Vacas', 'Gallinas', 'Cerdos']);
        const cattleProductsInventoryChart = createDoughnutChart('cattle-products-inventory-chart', [200, 150, 41], ['Leche', 'Huevos', 'Carne de Cerdo']);

        return () => {
            overallInventoryChart.destroy();
            seedsInventoryChart.destroy();
            cattleInventoryChart.destroy();
            cattleProductsInventoryChart.destroy();
            createProductionVolumeCharts(productionVolumes);
        };
    }, []);

    const createDoughnutChart = (canvasId: string, data: number[], labels: string[]) => {
        const ctx = document.getElementById(canvasId) as HTMLCanvasElement;
        return new Chart(ctx, {
            type: 'doughnut',
            data: {
                labels: labels,
                datasets: [{
                    data: data,
                    backgroundColor: ['#FF6384', '#FFFF56', '#42FF12', '#FF9056'],
                    hoverBackgroundColor: ['#FF6384', '#FFFF56', '#42FF12', '#FF9056']
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        position: 'bottom',
                    },
                },
            },
        });
    };

    const [newEntry, setNewEntry] = useState<{ type: string, name: string, amount: number }>({ type: '', name: '', amount: 0 });
    const [showForm, setShowForm] = useState(false);
    const navigate = useNavigate();

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLSelectElement>) => {
        const { name, value } = e.target;
        setNewEntry(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        console.log('New Entry:', newEntry);
        // You can add your logic here to handle the form submission, like sending data to a backend API
    };

    const toggleForm = () => {
        setShowForm(prevState => !prevState);
    };

    return (
        <div className="inventarios-page">
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

            <div className="inventarios-content">
                <h1>Inventarios</h1>

                <h2>Registrar nueva entrada a Inventario</h2>

                <div className="product-list">
                    <div className="add-inventory-button-container">
                        <button className="add-inventory-button" onClick={() => setShowForm(!showForm)}>
                            {showForm ? 'Cerrar Formulario' : 'Agregar Nuevo Inventario'}
                        </button>
                    </div>
                    {showForm && (

                        <div className="form-container">
                            <form onSubmit={handleFormSubmit}>

                                <div className="form-group">
                                    <label>Nombre del Producto:</label>
                                    <input type="text" name="name" value={newEntry.name} onChange={handleInputChange}/>
                                </div>
                                <div className="form-group">
                                    <label>Tipo:</label>
                                    <select name="type" value={newEntry.type} onChange={handleInputChange}>
                                        <option value="">Seleccionar Tipo</option>
                                        <option value="crop">Cosecha</option>
                                        <option value="cattle">Ganado</option>
                                    </select>
                                </div>
                                <div className="form-group">
                                    <label>Cantidad:</label>
                                    <input type="number" name="amount" value={newEntry.amount}
                                           onChange={handleInputChange}/>
                                </div>
                                <button type="submit">Agregar al Registro</button>

                            </form>
                        </div>)}
                </div>


                {/* Product List */}
                <div className="product-list">
                    <h3>Productos Sembrados en Propiedad:</h3>
                    <ul>
                        {inventory.map((item, index) => (
                            <li key={index}>{item.product}</li>
                        ))}
                    </ul>
                    <h2>Existencias en Almacén</h2>
                    <div className="donut-graphs">
                        <div className="overall-inventory-chart">
                            <canvas id="overall-inventory-chart"></canvas>
                        </div>
                        <div className="seeds-inventory-chart">
                            <canvas id="seeds-inventory-chart"></canvas>
                        </div>
                    </div>


                    <h3>Ganado Criado en Propiedad:</h3>
                    <ul>
                        <li>Vacas</li>
                        <li>Gallinas</li>
                        <li>Cerdos</li>
                    </ul>
                    <h2>Ganado en Crianza</h2>
                    <div className="donut-graphs">
                        <div className="cattle-inventory-chart">
                            <canvas id="cattle-inventory-chart"></canvas>
                        </div>
                        <div className="cattle-products-inventory-chart">
                            <canvas id="cattle-products-inventory-chart"></canvas>
                        </div>
                    </div>
                </div>


                {/* Line Graphs */}
                <div className="production-volume-charts">
                    <h1>Volúmenes de Producción</h1>
                    <h1>Cosechas</h1>
                    {productionVolumes.map((product, index) => (
                        <div key={index} className="production-volume-chart">
                            <h2>{product.product}</h2>
                            <canvas id={`production-volume-chart-${index}`}></canvas>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default InventoryPage;
