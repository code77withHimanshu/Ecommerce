// src/components/ProductList.js
import React, { useEffect, useState } from 'react';
import axios from '../axiosConfig';
import { Card, CardMedia, CardContent, Typography, Grid, Button, Box, MenuItem, Select, FormControl, InputLabel } from '@mui/material';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import ProductUpdateModal from './ProductUpdateModal';
import ProductUpdateForm from './ProductUpdateForm';

const ProductList = () => {
  const { user } = useAuth();
  const [products, setProducts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [openModal, setOpenModal] = useState(false);
  const [currentProductId, setCurrentProductId] = useState(null);
  const navigate = useNavigate();
  const token = localStorage.getItem('token');

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get('http://localhost:5000/products');
        setProducts(response.data);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    fetchProducts();
  }, []);

  const handleAddToCart = (productId) => {
    navigate('/addtocart', { state: { productId } });
  };

  const handleDeleteProduct = async (productId) => {
    try {
      await axios.delete(`http://localhost:5000/products/${productId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setProducts(products.filter(product => product.id !== productId));
      window.alert('Product deleted successfully');
    } catch (error) {
      console.error('Error deleting product:', error);
      window.alert('Failed to delete product');
    }
  };

  const handleUpdateProduct = (productId) => {
    setCurrentProductId(productId);
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
    setCurrentProductId(null);
  };

  // Filter products based on selected category name
  const filteredProducts = selectedCategory === 'All'
    ? products
    : products.filter(product => product.category_name === selectedCategory);

  return (
    <div style={{ padding: '20px' }}>
      <Typography variant="h4" align="center" gutterBottom>
        Product List
      </Typography>

      <Box sx={{ mb: 3, display: 'flex', justifyContent: 'center' }}>
        <FormControl variant="outlined" sx={{ minWidth: 200 }}>
          <InputLabel>Category</InputLabel>
          <Select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            label="Category"
          >
            <MenuItem value="All">All</MenuItem>
            <MenuItem value="Electronics">Electronics</MenuItem>
            <MenuItem value="Clothing">Clothing</MenuItem>
            <MenuItem value="Books">Books</MenuItem>
            <MenuItem value="Home Appliances">Home Appliances</MenuItem>
          </Select>
        </FormControl>
      </Box>

      <Grid container spacing={4}>
        {filteredProducts.map((product) => (
          <Grid item key={product.product_id} xs={12} sm={6} md={4}>
            <Link to={`/products/${product.product_id}`} style={{ textDecoration: 'none' }}>
              <Card>
                <CardMedia
                  component="img"
                  height="200"
                  image={product.image_url}
                  alt={product.name}
                />
                <CardContent>
                  <Typography variant="h6" component="div">
                    {product.name}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {product.description}
                  </Typography>
                  <Typography variant="h6" color="primary" sx={{ mt: 2 }}>
                    ${product.price}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Category: {product.category_name}
                  </Typography>
                </CardContent>
              </Card>
            </Link>
            {user && user.role === 'customer' && (
              <Box sx={{ display: 'flex', justifyContent: 'space-between', p: 2 }}>
                <Button
                  variant="contained"
                  color="primary"
                  startIcon={<ShoppingCartIcon />}
                  onClick={() => handleAddToCart(product.product_id)}
                >
                  Add to Cart
                </Button>
              </Box>
            )}
            {user && user.role === 'vendor' && (
              <Box 
                sx={{ 
                  display: 'flex', 
                  justifyContent: 'space-between', 
                  p: 2, 
                  backgroundColor: '#f5f5f5', // Light gray background
                  borderRadius: 1, // Rounded corners
                  boxShadow: 1, // Subtle shadow
                  mb: 2 // Margin bottom for spacing
                }}
              >
                <Button
                  variant="contained"
                  color="error" // Red color for Delete
                  sx={{ 
                    mr: 2, // Margin right for spacing between buttons
                    '&:hover': {
                      backgroundColor: '#d32f2f' // Darker red on hover
                    }
                  }}
                  onClick={() => handleDeleteProduct(product.product_id)}
                >
                  Delete Product
                </Button>
                <Button
                  variant="contained"
                  color="primary" // Blue color for Update
                  sx={{ 
                    '&:hover': {
                      backgroundColor: '#1976d2' // Darker blue on hover
                    }
                  }}
                  onClick={() => handleUpdateProduct(product.product_id)}
                >
                  Update Product
                </Button>
              </Box>
            )}
          </Grid>
        ))}
      </Grid>
      {currentProductId && (
        <ProductUpdateModal
          open={openModal}
          onClose={handleCloseModal}
          productId={currentProductId}
        />
      )}
    </div>
  );
};

export default ProductList;
