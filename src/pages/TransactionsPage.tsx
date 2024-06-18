import React, { useState, ChangeEvent, FormEvent, useEffect } from 'react';
import './TransactionsPage.css';
import { useNavigate } from 'react-router-dom';

interface Transaction {
    date: string;
    type: string;
    item: string;
    units: number;
    amount: string;
}

const TransactionsPage: React.FC = () => {
    const [transactions, setTransactions] = useState<Transaction[]>([
        { date: '2024-06-13', type: 'Compra', item: 'Bolsa Semillas Cebollas', units: 50, amount: '1300' },
        { date: '2024-06-09', type: 'Venta', item: 'Tomates', units: 200, amount: '2800' },
        { date: '2024-06-08', type: 'Compra', item: 'Maquinaria - Regadora', units: 1, amount: '15900' },
    ]);

    const [newTransaction, setNewTransaction] = useState<Transaction>({
        date: '',
        type: '',
        item: '',
        units: 0,
        amount: ''
    });

    const [isFormVisible, setIsFormVisible] = useState<boolean>(false);

    const navigate = useNavigate();

    useEffect(() => {
        // Sort transactions by date (newest to oldest) whenever transactions are updated
        setTransactions(prevTransactions =>
            [...prevTransactions].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
        );
    }, []);

    const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setNewTransaction({
            ...newTransaction,
            [name]: name === 'units' ? parseInt(value) : value
        });
    };

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setTransactions(prevTransactions => {
            const updatedTransactions = [...prevTransactions, newTransaction];
            // Sort transactions by date (newest to oldest) after adding a new transaction
            return updatedTransactions.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
        });
        setNewTransaction({ date: '', type: '', item: '', units: 0, amount: '' });
        setIsFormVisible(false);
    };

    const toggleFormVisibility = () => {
        setIsFormVisible(!isFormVisible);
    };

    return (
        <div className="transactions-page">
            <header className="transactions-header">
                <a href="/" className="transactions-title"
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

            <main className="transactions-main">
                <section className="transactions-history">
                    <h2>Historial de Transacciones</h2>
                    <ul>
                        {transactions.map((transaction, index) => (
                            <li key={index}>
                                {transaction.date} | {transaction.type}: {transaction.item} ({transaction.units} unidades, {transaction.amount} Bs.)
                            </li>
                        ))}
                    </ul>
                </section>

                <section className="register-transaction">
                    <h2>Registrar Nueva Transacción</h2>
                    <button onClick={toggleFormVisibility}>
                        {isFormVisible ? 'Cancelar' : 'Agregar Transacción'}
                    </button>
                    {isFormVisible && (
                        <form onSubmit={handleSubmit}>
                            <label>
                                Fecha:
                                <input type="date" name="date" value={newTransaction.date} onChange={handleInputChange} required />
                            </label>
                            <label>
                                Tipo:
                                <select name="type" value={newTransaction.type} onChange={handleInputChange} required>
                                    <option value="">Seleccione...</option>
                                    <option value="Compra">Compra</option>
                                    <option value="Venta">Venta</option>
                                </select>
                            </label>
                            <label>
                                Artículo:
                                <input type="text" name="item" value={newTransaction.item} onChange={handleInputChange} required />
                            </label>
                            <label>
                                Unidades:
                                <input type="number" name="units" value={newTransaction.units} onChange={handleInputChange} required />
                            </label>
                            <label>
                                Monto (Bs.):
                                <input type="number" name="amount" value={newTransaction.amount} onChange={handleInputChange} required />
                            </label>
                            <button type="submit">Registrar</button>
                        </form>
                    )}
                </section>
            </main>
        </div>
    );
};

export default TransactionsPage;
