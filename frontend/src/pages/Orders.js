import React, { useEffect, useState } from 'react';
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
    Divider,
} from '@mui/material';

const Orders = () => {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const token = localStorage.getItem('token');

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const response = await axios.get('http://localhost:5000/orders', {
                    headers: { Authorization: `Bearer ${token}` },
                });
                console.log("orders:", response.data);
                setOrders(response.data);
            } catch (err) {
                setError(err.response ? err.response.data.error : 'Error fetching orders');
            } finally {
                setLoading(false);
            }
        };

        fetchOrders();
    }, [token]);

    const handleCancelOrder = async (order_id) => {
        try {
            await axios.put(
                `http://localhost:5000/orders/${order_id}/cancel`,
                {},
                { headers: { Authorization: `Bearer ${token}` } }
            );

            // Update the order list after successful cancellation
            setOrders((prevOrders) =>
                prevOrders.map((order) =>
                    order.order_id === order_id ? { ...order, status: 'cancelled' } : order
                )
            );
        } catch (err) {
            setError(err.response ? err.response.data : 'Error canceling order');
        }
    };

    if (loading) return <CircularProgress />;
    if (error) return <Alert severity="error">{error}</Alert>;
    if (orders.length === 0) return <Alert severity="info">No orders found</Alert>;

    return (
        <Box sx={{ padding: 3 }}>
            {(orders || []).map((order) => (
                <Box key={order.order_id} sx={{ marginBottom: 20 }}>
                    <Typography variant="h6" component="div">
                        Order ID: {order.order_id}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        Status: {order.status}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        Total Price: ${order.total}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        Date: {new Date(order.created_at).toLocaleDateString()} {new Date(order.created_at).toLocaleTimeString()}
                    </Typography>
                    <Divider sx={{ my: 2 }} />

                    <Grid container spacing={2}>
                        {order.items.map((item) => (
                            <Grid item xs={12} sm={6} md={4} key={item.order_item_id}>
                                <Card>
                                    <CardMedia
                                        component="img"
                                        height="140"
                                        image={item.product.image_url || 'https://via.placeholder.com/140'}
                                        alt={item.product.name}
                                    />
                                    <CardContent>
                                        <Typography variant="h6" component="div">
                                            Name: {item.product.name}
                                        </Typography>
                                        <Typography variant="body2" color="text.secondary">
                                            Description: {item.product.description}
                                        </Typography>
                                        <Typography variant="body2" color="text.secondary">
                                            Quantity: {item.quantity}
                                        </Typography>
                                        <Typography variant="body2" color="text.secondary">
                                            Price: ${item.price}
                                        </Typography>
                                    </CardContent>
                                </Card>
                            </Grid>
                        ))}
                    </Grid>

                    {order.status === 'pending' && (
                        <Button
                            variant="contained"
                            color="error"
                            sx={{ mt: 2 }}
                            onClick={() => handleCancelOrder(order.order_id)}
                        >
                            Cancel Order
                        </Button>
                    )}
                </Box>
            ))}
        </Box>
    );
};

export default Orders;
