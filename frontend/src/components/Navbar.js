import React from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';

const Navbar = () => {
  const { cart } = useCart();

  const handleLogout = () => {
    localStorage.removeItem('authToken');
    window.location.href = '/login'; 
  };

  return (
    <nav className="bg-blue-900 p-4 text-white">
      <div className="flex justify-between items-center">
        <Link to="/" className="text-xl font-bold">Shop</Link>

        <div className="flex items-center space-x-4">
          <Link to="/Cart" className="text-lg">
            Cart ({cart.length})
          </Link>
          <button 
            onClick={handleLogout} 
            className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition"
          >
            Logout
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
