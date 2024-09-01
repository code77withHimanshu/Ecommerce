// src/pages/Products.js
import React from 'react';
import ProductList from '../components/ProductList';
import { Container, Typography, Paper } from '@mui/material';

const Products = () => {
  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Paper elevation={3} sx={{ padding: 2 }}>
        <Typography variant="h4" component="h2" align="center" gutterBottom>
          Products
        </Typography>
        <ProductList />
      </Paper>
    </Container>
  );
};

export default Products;
