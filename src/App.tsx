import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import ProfilePage from './pages/ProfilePage';
import InventoryPage from "./pages/InventoryPage";
import IntroPage from "./pages/IntroPage";
import TransactionsPage from "./pages/TransactionsPage";
import ManagementPage from "./pages/ManagementPage";

const App: React.FC = () => {
  return (
      <Router>
          <Routes>
              <Route path="/login" element={<LoginPage />} />
              <Route path="/home" element={<HomePage />} />
              <Route path="/profile" element={<ProfilePage />} />
              <Route path="/inventory" element={<InventoryPage />} />
              <Route path="/transactions" element={<TransactionsPage />} />
              <Route path="/management" element={<ManagementPage />} />
              <Route path="/" element={<IntroPage />} />
          </Routes>
      </Router>
  );
};

export default App;