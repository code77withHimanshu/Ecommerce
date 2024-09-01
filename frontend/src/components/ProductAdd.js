// src/components/ProductAdd.js
import React, { useState } from 'react';
import axios from '../axiosConfig';
import { TextField, Button, Box, Typography, FormControl, InputLabel, Select, MenuItem } from '@mui/material';

const ProductAdd = () => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [stock, setStock] = useState('');
  const [category, setCategory] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [message, setMessage] = useState('');
  const token = localStorage.getItem('token');

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.post('http://localhost:5000/products', {
        name,
        description,
        price,
        stock,
        category_id: category,
        image_url: imageUrl,
      },
      { headers: { Authorization: `Bearer ${token}` } },
    );
      setMessage('Product added successfully');
    } catch (error) {
      console.error('Error adding product:', error);
      setMessage('Error adding product');
    }
  };

  return (
    <div style={{ padding: '20px' }}>
      <Typography variant="h4" align="center" gutterBottom>
        Add Product
      </Typography>

      <form onSubmit={handleSubmit}>
        <Box sx={{ mb: 2 }}>
          <TextField
            fullWidth
            label="Product Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </Box>
        <Box sx={{ mb: 2 }}>
          <TextField
            fullWidth
            label="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
        </Box>
        <Box sx={{ mb: 2 }}>
          <TextField
            fullWidth
            label="Price"
            type="number"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            required
          />
        </Box>
        <Box sx={{ mb: 2 }}>
          <TextField
            fullWidth
            label="Stock"
            type="number"
            value={stock}
            onChange={(e) => setStock(e.target.value)}
            required
          />
        </Box>
        <Box sx={{ mb: 2 }}>
          <FormControl fullWidth required>
            <InputLabel>Category</InputLabel>
            <Select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              label="Category"
            >
              <MenuItem value={1}>Electronics</MenuItem>
              <MenuItem value={2}>Clothing</MenuItem>
              <MenuItem value={3}>Books</MenuItem>
              <MenuItem value={4}>Home Appliances</MenuItem>
            </Select>
          </FormControl>
        </Box>
        <Box sx={{ mb: 2 }}>
          <TextField
            fullWidth
            label="Image URL"
            value={imageUrl}
            onChange={(e) => setImageUrl(e.target.value)}
            required
          />
        </Box>
        <Button variant="contained" color="primary" type="submit">
          Add Product
        </Button>
      </form>

      {message && (
        <Typography variant="body1" align="center" sx={{ mt: 2 }}>
          {message}
        </Typography>
      )}
    </div>
  );
};

export default ProductAdd;
