import axios from 'axios';

const api = axios.create({
  baseURL: 'https://shopping-site-umber.vercel.app/api',
});


export const getAllProducts = async (filters = {}) => {
  const { category, minPrice, maxPrice } = filters; 
  const params = {};

  if (category) {
    params.category = category;
  }

  if (minPrice || maxPrice) {
    params.priceRange = `${minPrice}-${maxPrice}`; 
  }

  try {
    const response = await api.get('/products', { params });
    return response.data; 
  } catch (error) {
    console.error('Error fetching products:', error);
    throw error; 
  }
};


export const getAllCarts = async () => {

  try {
    const response = await api.get('/getCart');
    return response.data; 
  } catch (error) {
    console.error('Error fetching products:', error);
    throw error; 
  }
};


export const addCarts = async (productId, quantity) => {
  try {
    const response = await api.post('/addCart', {
      productId,
      quantity,
    });
    return response.data; 
  } catch (error) {
    console.error('Error adding item to cart:', error);
    throw error; 
  }
};

export const removeCartItem = async (id) => {
  try {
    const response = await api.delete(`/removeCart/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error removing item from cart:', error);
    throw error;
  }
};

export const login = async (email, password) => {
  try {
    const response = await api.post('/auth/login', { email, password });
    const { token } = response.data;

    localStorage.setItem('authToken', token);

    return response.data;
  } catch (error) {
    console.error('Error during login:', error);
    throw error;
  }
};

export const register = async (email, password) => {
  try {
    const response = await api.post('/auth/register', { email, password });
    return response.data;
  } catch (error) {
    console.error('Error during registration:', error);
    throw error;
  }
};





