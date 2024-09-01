import React, { useEffect, useState, useCallback } from 'react';
import axios from 'axios';
import {
    Box,
    Card,
    CardContent,
    CardMedia,
    Typography,
    Grid,
    CircularProgress,
    Alert,
    Button,
    Tooltip,
    Divider
} from '@mui/material';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';

const Cart = () => {
    const [cartItems, setCartItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const [total, setTotal] = useState(0);
    const [error, setError] = useState(null);
    const token = localStorage.getItem('token');

    useEffect(() => {
        const fetchCart = async () => {
            try {
                const response = await axios.get('http://localhost:5000/cart', {
                    headers: { Authorization: `Bearer ${token}` },
                });
                setCartItems(response.data);
                setLoading(false);
            } catch (err) {
                setError(err.response ? err.response.data.error : 'Error fetching cart');
                setLoading(false);
            }
        };

        fetchCart();
    }, [token]);

    useEffect(() => {
        const calculateTotalPrice = () => {
            const totalPrice = cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
            setTotal(totalPrice.toFixed(2));
        };

        calculateTotalPrice();
    }, [cartItems]);

    const handleRemoveFromCart = useCallback(async (productId) => {
        try {
            await axios.delete(`http://localhost:5000/remove-from-cart/${productId}`, {
                headers: { Authorization: `Bearer ${token}` },
            });
            setCartItems(prevItems => prevItems.filter(item => item.product_id !== productId));
        } catch (err) {
            setError(err.response ? err.response.data.error : 'Error removing item from cart');
        }
    }, [token]);

    const handlePlaceOrder = async () => {
        setError(null);

        try {
            const response = await axios.post(
                'http://localhost:5000/orders',
                {
                    items: cartItems.map(item => ({
                        product_id: item.product_id,
                        quantity: item.quantity,
                        price: item.price
                    })),
                    total,
                    status: "pending"
                },
                {
                    headers: { Authorization: `Bearer ${token}` }
                }
            );

            if (response.status === 201) {
              // Clear the cart on the server side after placing the order
              await axios.delete('http://localhost:5000/clear-cart', {
                headers: { Authorization: `Bearer ${token}` },
              });
              alert('Order Placed Successfully.');
              setCartItems([]);
            }
        } catch (err) {
            setError(err.response ? err.response.data : 'Error placing order');
        }
    };

    if (loading) return <CircularProgress />;
    if (error) return <Alert severity="error">{error}</Alert>;
    if (cartItems.length === 0) return <Alert severity="info">Your cart is empty</Alert>;

    return (
        <Box sx={{ padding: 3 }}>
            <Grid container spacing={3}>
                {cartItems.map((item) => (
                    <Grid item xs={12} sm={6} md={4} key={item.product_id}>
                        <Card>
                            <CardMedia
                                component="img"
                                height="140"
                                image={item.imageUrl || 'https://via.placeholder.com/140'}
                                alt={item.product_name}
                            />
                            <CardContent>
                                <Typography variant="h6" component="div">
                                    {item.product_name}
                                </Typography>
                                <Typography variant="body1" component="div">
                                    {item.product_description}
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                    Price: ${item.price}
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                    Quantity: {item.quantity}
                                </Typography>
                                <Tooltip title="Remove from cart">
                                    <Button
                                        variant="contained"
                                        color="error"
                                        startIcon={<ShoppingCartIcon />}
                                        onClick={() => handleRemoveFromCart(item.product_id)}
                                        sx={{ mt: 2 }}
                                    >
                                        Remove from Cart
                                    </Button>
                                </Tooltip>
                            </CardContent>
                        </Card>
                    </Grid>
                ))}
            </Grid>
            <Divider sx={{ my: 3 }} />
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mt: 2 }}>
                <Typography variant="h6" component="div">
                    Total Price: ${total}
                </Typography>
                <Button
                    variant="contained"
                    color="primary"
                    onClick={handlePlaceOrder}
                >
                    Place Order
                </Button>
            </Box>
        </Box>
    );
};

export default Cart;
