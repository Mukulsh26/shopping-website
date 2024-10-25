import React, { useState } from 'react';

const ProductFilters = ({ onFilterChange }) => {
  const [category, setCategory] = useState('');
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');

  const handleCategoryChange = (e) => {
    const newCategory = e.target.value;
    setCategory(newCategory);
    onFilterChange({ category: newCategory, minPrice, maxPrice });
  };

  const handleMinPriceChange = (e) => {
    const newMinPrice = e.target.value;
    setMinPrice(newMinPrice);
    if (newMinPrice || maxPrice) {
      onFilterChange({ category, minPrice: newMinPrice, maxPrice });
    }
  };

  const handleMaxPriceChange = (e) => {
    const newMaxPrice = e.target.value;
    setMaxPrice(newMaxPrice);
    if (minPrice || newMaxPrice) {
      onFilterChange({ category, minPrice, maxPrice: newMaxPrice });
    }
  };

  const removeFilters = () => {
    setCategory('');
    setMinPrice('');
    setMaxPrice('');
    onFilterChange({ category: '', minPrice: '', maxPrice: '' });
  };

  return (
    <div className="p-4 border-b">
      
      <div className="flex items-center mb-2">
        <div className="mr-4">
          <label className="block font-medium">Category</label>
          <select
            value={category}
            onChange={handleCategoryChange}
            className="border px-2 py-1 w-full"
          >
            <option value="">All Categories</option>
            <option value="electronics">Electronics</option>
            <option value="clothing">Clothing</option>
            <option value="home">Home</option>
          </select>
        </div>

        <div className="mr-4">
          <label className="block font-medium">Min Price</label>
          <input
            type="number"
            value={minPrice}
            onChange={handleMinPriceChange}
            className="border px-2 py-1 w-full"
            placeholder="Min Price"
          />
        </div>

        <div className="mr-4">
          <label className="block font-medium">Max Price</label>
          <input
            type="number"
            value={maxPrice}
            onChange={handleMaxPriceChange}
            className="border px-2 py-1 w-full"
            placeholder="Max Price"
          />
        </div>

        <button
          onClick={removeFilters}
          className="bg-blue-900 text-white px-4 py-1 rounded mt-6"
        >
          Remove Filters
        </button>
      </div>
    </div>
  );
};

export default ProductFilters;