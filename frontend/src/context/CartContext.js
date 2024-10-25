import React, { createContext, useState, useContext } from 'react';
import { addCarts, removeCartItem } from '../api/api';

const CartContext = createContext();

export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);

  const addToCart = async (product) => {
    try {
      const newCartItem = await addCarts(product.id, 1); 

      setCart((prevCart) => {
        const existingItem = prevCart.find((item) => item.id === newCartItem.id);
        if (existingItem) {
          return prevCart.map((item) =>
            item.id === newCartItem.id
              ? { ...item, quantity: item.quantity + 1 } 
              : item
          );
        } else {
          return [...prevCart, { ...newCartItem, quantity: 1 }]; 
        }
      });
    } catch (error) {
      console.error('Failed to add item to cart:', error);
    }
  };


  const removeFromCart = async (id) => {
    try {
      await removeCartItem(id); 
      setCart((prevCart) => prevCart.filter((item) => item.id !== id)); 
    } catch (error) {
      console.error('Error removing item from cart:', error);
    }
  };

  const increaseQuantity = (id) => {
    setCart((prevCart) =>
      prevCart.map((item) =>
        item.id === id ? { ...item, quantity: item.quantity + 1 } : item
      )
    );
  };

  const decreaseQuantity = (id) => {
    setCart((prevCart) => {
      const itemToDecrease = prevCart.find((item) => item.id === id);
      if (itemToDecrease.quantity > 1) {
        return prevCart.map((item) =>
          item.id === id ? { ...item, quantity: item.quantity - 1 } : item
        );
      } else {
        return prevCart.filter((item) => item.id !== id);
      }
    });
  };

  return (
    <CartContext.Provider value={{ cart, setCart, addToCart, removeFromCart, increaseQuantity, decreaseQuantity }}>
      {children}
    </CartContext.Provider>
  );
};