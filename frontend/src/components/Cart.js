import React, { useEffect, useState } from 'react';
import { useCart } from '../context/CartContext';
import Navbar from './Navbar';
import { getAllCarts } from '../api/api'

const Cart = () => {
  const { cart, setCart, removeFromCart, increaseQuantity, decreaseQuantity } = useCart();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCartData = async () => {
      try {
        const cartData = await getAllCarts();
        setCart(cartData); 
      } catch (err) {
        setError('Failed to fetch cart data.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchCartData();
  }, [setCart]);

  if (loading) {
    return <p className='ml-4'>Loading...</p>;
  }

  if (error) {
    return <p className='ml-4'>{error}</p>;
  }

  return (
    <>
      <Navbar />
      <div className="p-4">
        <h1 className="text-2xl font-bold mb-4 ml-4 mt-4">Your Cart</h1>
        {cart.length === 0 ? (
          <p className='ml-4'>Your cart is empty.</p>
        ) : (
          <div className="flex flex-wrap -mx-2">
            {cart.map((item) => (
              <div key={item.id} className="border-b py-2 px-2 w-full sm:w-1/2 md:w-1/3">
                <div className="border rounded-lg overflow-hidden shadow-lg">
                  <img
                    src={item.Product.imageUrl}
                    alt={item.Product.name}
                    className="h-60 w-full object-cover"
                  />
                  <div className="p-4">
                    <h2 className="text-lg font-bold">{item.Product.name}</h2>
                    <p className="text-gray-600">{item.Product.description}</p>
                    <p className="text-lg font-semibold">${item.Product.price}</p>
                    <p className="text-gray-600">Quantity: {item.quantity}</p>
                    <div className="flex items-center mt-2">
                      <button
                        onClick={() => decreaseQuantity(item.id)}
                        className="bg-yellow-500 text-white px-2 py-1 mr-2"
                      >
                        -
                      </button>
                      <button
                        onClick={() => increaseQuantity(item.id)}
                        className="bg-green-500 text-white px-2 py-1"
                      >
                        +
                      </button>
                    </div>
                    <br />
                    <button
                      onClick={() => removeFromCart(item.id)}
                      className="bg-blue-900 text-white px-4 py-2 rounded mt-2"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
};

export default Cart;