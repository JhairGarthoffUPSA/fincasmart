// HomePage.tsx
import React, { useEffect, useState } from 'react';
import { Chart, registerables } from 'chart.js'; // Import Chart.js and its registerables
import './HomePage.css';


Chart.register(...registerables); // Register Chart.js components

type ChartInstance = Chart<'doughnut', number[], string>; // Define custom type for chart instance

const HomePage: React.FC = () => {
    const [chart, setChart] = useState<ChartInstance | null>(null); // Use custom type for chart state
    const [inventory] = useState([
        { product: 'Tomates', quantity: 105 },
        { product: 'Maíz', quantity: 180 },
        { product: 'Lechugas', quantity: 310 },
        { product: 'Zanahorias', quantity: 20 },
    ]);
    const transactions = [
        { date: '2024-06-13', type: 'Compra', item: 'Bolsa Semillas Cebollas', units: 50, amount: '1300' },
        { date: '2024-06-09', type: 'Venta', item: 'Tomates', units: 200, amount: '2800' },
        { date: '2024-06-08', type: 'Compra', item: 'Maquinaria - Regadora', units: 1, amount: '15900' },
    ];

    useEffect(() => {
        let newChart: ChartInstance | null = null; // Initialize newChart variable
        const ctx = document.getElementById('inventory-chart') as HTMLCanvasElement;

        if (chart) {
            chart.destroy(); // Destroy the chart instance if it exists
        }

        newChart = new Chart(ctx, {
            type: 'doughnut',
            data: {
                labels: inventory.map(item => item.product),
                datasets: [
                    {
                        data: inventory.map(item => item.quantity),
                        backgroundColor: ['#FF6384', '#FFFF56', '#42FF12', '#FF9056'],
                        hoverBackgroundColor: ['#FF6384', '#FFFF56', '#42FF12', '#FF9056']
                    }
                ]
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



        setChart(newChart); // Set the chart instance to state

        // Clean up the chart instance when the component unmounts
        return () => {
            if (newChart) {
                newChart.destroy();
            }
        };
    }, [inventory]);

    return (
        <div className="homepage">
            <header className="homepage-header">
                <h1>FincaSmart</h1>
                <nav>
                    <button onClick={() => { /* Navigate to User Profile */ }}>Perfil</button>
                    <button onClick={() => { /* Navigate to Inventory */ }}>Inventarios</button>
                    <button onClick={() => { /* Navigate to Transactions */ }}>Transacciones</button>
                </nav>
            </header>

            <main className="homepage-main">
                <section className="farm-info">
                    <h1>Estancia "Prosperidad"</h1>
                    <p>Propietario: Jhair Garthoff</p>
                </section>

                <section className="inventory">
                    <h2>Inventario Actual</h2>
                    <div className="charts-container">
                        <canvas id="inventory-chart"></canvas> {/* Canvas element for the chart */}
                    </div>

                </section>

                <section className="transactions">
                    <h3>Transacciones Recientes</h3>
                    <ul>
                        {transactions.map((transaction, index) => (
                            <li key={index}>
                                {transaction.date} | {transaction.type}: {transaction.item} ({transaction.amount} Bs.)
                            </li>
                        ))}
                    </ul>
                </section>
            </main>
        </div>
    );
};

export default HomePage;
