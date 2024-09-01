// src/components/ProductDetail.js
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from '../axiosConfig';
import { Card, CardMedia, CardContent, Typography, Box } from '@mui/material';

const ProductDetail = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/products/${id}`);
        setProduct(response.data);
      } catch (error) {
        console.error('Error fetching product:', error);
      }
    };

    fetchProduct();
  }, [id]);

  if (!product) return <p>Loading...</p>;

  return (
    <Box sx={{ maxWidth: 600, margin: 'auto', padding: 2 }}>
      <Card>
        <CardMedia
          component="img"
          height="400"
          image={product.image_url}
          alt={product.name}
        />
        <CardContent>
          <Typography variant="h4" component="div" gutterBottom>
            {product.name}
          </Typography>
          <Typography variant="body1" color="text.secondary" paragraph>
            {product.description}
          </Typography>
          <Typography variant="h6" color="primary" gutterBottom>
            ${product.price}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Stock: {product.stock}
          </Typography>
        </CardContent>
      </Card>
    </Box>
  );
};

export default ProductDetail;
