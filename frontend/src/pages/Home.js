// src/pages/Home.js
import React from 'react';
import ProductList from '../components/ProductList';
import { Link } from 'react-router-dom';
import { Container, Typography, Box, AppBar, Toolbar, CssBaseline, Paper, Button } from '@mui/material';

const Home = () => {
  return (
    <div>
      <CssBaseline />
      {/* <AppBar position="static">
        <Toolbar>
          <Typography variant="h4" component="div" sx={{ flexGrow: 1 }}>
            E-Commerce Store
          </Typography>
        </Toolbar>
      </AppBar> */}
      <Container maxWidth="lg" sx={{ mt: 4 }}>
        <Box sx={{ textAlign: 'center', mb: 4 }}>
          <Typography variant="h2" component="h2" gutterBottom>
            Welcome to Our Store
          </Typography>
        </Box>
        <ProductList />
      </Container>
      <Paper
        sx={{
          position: 'fixed',
          bottom: 0,
          width: '100%',
          textAlign: 'center',
          py: 2,
          mt: 4,
          backgroundColor: '#333',
          color: '#fff',
        }}
      >
        <Typography variant="body2">
          &copy; 2024 E-Commerce Store. All rights reserved.
        </Typography>
      </Paper>
    </div>
  );
};

export default Home;
