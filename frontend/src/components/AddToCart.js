import React, { useState } from 'react';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import { TextField, Button, Box, Typography, Container } from '@mui/material';
import { useLocation } from 'react-router-dom';

function AddToCart() {
  const [quantity, setQuantity] = useState(1);
  const { user } = useAuth();
  const [error, setError] = useState('');
  const token = localStorage.getItem('token');
  const location = useLocation();
  const productId = location.state?.productId; // Access productId from state
  console.log("ProductId:", productId);
  console.log("Token:", token);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!user) {
      setError('You must be logged in to add items to the cart.');
      return;
    }
    
    try {
      await axios.post(
        'http://localhost:5000/cart',
        { product_id: productId, quantity },
        { headers: { Authorization: `Bearer ${token}` } },
      );
      alert('Item added to cart');
    } catch (err) {
      console.error('Error adding to cart:', err);
      setError('Failed to add item to cart. Please try again.');
    }
  };

  return (
    <Container>
      <Box component="form" onSubmit={handleSubmit} sx={{ display: 'flex', flexDirection: 'column', gap: 2, alignItems: 'center', marginTop: 2 }}>
        <TextField
          label="Quantity"
          type="number"
          value={quantity}
          onChange={(e) => setQuantity(e.target.value)}
          required
          fullWidth
        />
        <Button 
          type="submit" 
          variant="contained" 
          color="primary" 
          fullWidth
        >
          Add to Cart
        </Button>
        {error && <Typography color="error">{error}</Typography>}
      </Box>
    </Container>
  );
}

export default AddToCart;
