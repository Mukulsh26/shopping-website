import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import CartPage from './pages/CartPage';
import { CartProvider } from './context/CartContext';
import Login from './components/Login';
import ProtectedRoute from './components/ProtectedRoute';

const App = () => (
  <CartProvider>
    <Router>
      <Routes>
        <Route path="/" element={
          <ProtectedRoute>
            <Home />
          </ProtectedRoute>
        } 
        />
        <Route path="/login" element={<Login />} />
        <Route
          path="/cart"
          element={
              <CartPage />
          }
        />
      </Routes>
    </Router>
  </CartProvider>
);

export default App;
