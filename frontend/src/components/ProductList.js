import React from 'react';
import { useCart } from '../context/CartContext';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const ProductList = ({ products }) => {
  const { addToCart } = useCart();

  console.log('Rendered Products:', products); 

  const handleAddToCart = (product) => {
    addToCart(product);
    toast.success('Added to cart successfully!');
  };

  return (
  <>
    <ToastContainer />
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 p-4">
      {products.length === 0 ? (
        <div>No products found.</div>
      ) : (
        products.map((product) => (
          <div key={product.id} className="border p-4">
            <img
              src={product.imageUrl}
              alt={product.name}
              className="h-40 w-full object-cover"
            />
            <h2 className="text-xl font-bold">{product.name}</h2>
            <p>{product.description}</p>
            <p className="text-lg font-semibold">${product.price}</p>
            <button
              onClick={() => handleAddToCart(product)}
              className="bg-blue-900 text-white px-4 py-2 mt-2 rounded "
            >
              Add to Cart
            </button>
          </div>
        ))
      )}
    </div>
    </>
  );
};

export default ProductList;
