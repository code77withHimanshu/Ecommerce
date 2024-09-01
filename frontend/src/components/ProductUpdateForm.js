import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Box, TextField, Button, Typography, Container } from '@mui/material';
import { useAuth } from '../context/AuthContext';

const ProductUpdateForm = ({ productId }) => {
  const { user } = useAuth();
  const [product, setProduct] = useState({
    name: '',
    description: '',
    price: '',
    stock: '',
    category_id: '',
    image_url: ''
  });
  const [error, setError] = useState(null);

  useEffect(() => {
    // Fetch current product details
    const fetchProduct = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/products/${productId}`, {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
        });
        setProduct(response.data);
      } catch (error) {
        console.error('Error fetching product details:', error);
      }
    };

    fetchProduct();
  }, [productId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduct((prevProduct) => ({
      ...prevProduct,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:5000/products/${productId}`, product, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      });
      // Handle successful update (e.g., show a success message, close modal, etc.)
    } catch (error) {
      console.error('Error updating product:', error);
      setError('Failed to update product');
    }
  };

  return (
    <Container>
      <Box sx={{ mt: 4 }}>
        <Typography variant="h4" gutterBottom>
          Update Product
        </Typography>
        <form onSubmit={handleSubmit}>
          <TextField
            fullWidth
            margin="normal"
            label="Name"
            name="name"
            value={product.name}
            onChange={handleChange}
          />
          <TextField
            fullWidth
            margin="normal"
            label="Description"
            name="description"
            value={product.description}
            onChange={handleChange}
          />
          <TextField
            fullWidth
            margin="normal"
            label="Price"
            name="price"
            type="number"
            value={product.price}
            onChange={handleChange}
          />
          <TextField
            fullWidth
            margin="normal"
            label="Stock"
            name="stock"
            type="number"
            value={product.stock}
            onChange={handleChange}
          />
          <TextField
            fullWidth
            margin="normal"
            label="Category ID"
            name="category_id"
            type="number"
            value={product.category_id}
            onChange={handleChange}
          />
          <TextField
            fullWidth
            margin="normal"
            label="Image URL"
            name="image_url"
            value={product.image_url}
            onChange={handleChange}
          />
          {error && <Typography color="error">{error}</Typography>}
          <Button type="submit" variant="contained" color="primary" sx={{ mt: 2 }}>
            Update Product
          </Button>
        </form>
      </Box>
    </Container>
  );
};

export default ProductUpdateForm;
