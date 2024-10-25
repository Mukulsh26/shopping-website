import React, { useEffect, useState } from 'react';
import { getAllProducts } from '../api/api'; 
import Navbar from '../components/Navbar';
import ProductFilters from './ProductFilters'; 
import ProductList from '../components/ProductList'; 

const Home = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filters, setFilters] = useState({
    category: '',
    minPrice: '',
    maxPrice: ''
  });

  // Function to fetch products based on filters
  const fetchProducts = async (filters) => {
    try {
      const productsData = await getAllProducts(filters); 
      setProducts(productsData);
    } catch (error) {
      setError('Failed to fetch products');
    } finally {
      setLoading(false); 
    }
  };

  
  useEffect(() => {
    fetchProducts(filters);
  }, [filters]); 

 
  const handleFilterChange = (newFilters) => {
    setFilters(newFilters); 
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div>
      <Navbar/>
      <br />
      <ProductFilters onFilterChange={handleFilterChange} />
      <h1 className="text-2xl font-bold mb-4 ml-4 mt-4">Product List</h1>
      <ProductList products={products} />
    </div>
  );
};

export default Home;
