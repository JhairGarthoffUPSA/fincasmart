import React from 'react';
import './HomePage.css';

const HomePage: React.FC = () => {
    const farmName = 'Hacienda Prosperidad';
    const ownerName = 'Juan Perez';
    const inventory = [
        { product: 'Tomates', quantity: 150 },
        { product: 'Maíz', quantity: 200 },
        { product: 'Lechugas', quantity: 100 },
    ];
    const transactions = [
        { date: '2024-06-01', type: 'Compra', item: 'Bolsa de Semillas', units: 12, amount: '680' },
        { date: '2024-06-05', type: 'Venta', item: 'Tomates', units: 300, amount: '1280' },
        { date: '2024-06-10', type: 'Compra', item: 'Maquinaria', amount: '23700' },
    ];

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

            <main>
                <section className="farm-info">
                    <h2>{farmName}</h2>
                    <p>Propietario: {ownerName}</p>
                </section>

                <section className="inventory">
                    <h3>Inventario Actual</h3>
                    <ul>
                        {inventory.map((item, index) => (
                            <li key={index}>{item.product}: {item.quantity}</li>
                        ))}
                    </ul>
                </section>

                <section className="transactions">
                    <h3>Transacciones Recientes</h3>
                    <ul>
                        {transactions.map((transaction, index) => (
                            <li key={index}>
                                {transaction.date}       {transaction.type}: {transaction.item}. {transaction.units} Unidades ({transaction.amount}Bs.).
                            </li>
                        ))}
                    </ul>
                </section>
            </main>
        </div>
    );
};

export default HomePage;
