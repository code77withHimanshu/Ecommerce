import React, { useEffect, useState } from 'react';
import axios from '../axiosConfig';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button, Select, MenuItem, FormControl, InputLabel } from '@mui/material';

const OrderManagement = () => {
  const [orders, setOrders] = useState([]);
  const [selectedOrderId, setSelectedOrderId] = useState(null);
  const [orderStatus, setOrderStatus] = useState('');
  const token = localStorage.getItem('token');

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axios.get('http://localhost:5000/allorders', {
          headers: { Authorization: `Bearer ${token}` },
        });
        setOrders(response.data);
      } catch (error) {
        console.error('Error fetching orders:', error);
      }
    };

    fetchOrders();
  }, [token]);

  const handleStatusChange = async (orderId) => {
    try {
      await axios.put(`http://localhost:5000/orders/${orderId}/status`, 
      { status: orderStatus }, 
      {
        headers: { Authorization: `Bearer ${token}` },
      });
      // Update order status in the UI
      setOrders(orders.map(order => 
        order.order_id === orderId ? { ...order, status: orderStatus } : order
      ));
      window.alert('Order status updated successfully');
    } catch (error) {
      console.error('Error updating order status:', error);
      window.alert('Failed to update order status');
    }
  };

  return (
    <TableContainer component={Paper} sx={{ mt: 4 }}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Order ID</TableCell>
            <TableCell>Username</TableCell>
            <TableCell>Order Date</TableCell>
            <TableCell>Status</TableCell>
            <TableCell>Update Status</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {orders.map((order) => (
            <TableRow key={order.order_id}>
              <TableCell>{order.order_id}</TableCell>
              <TableCell>{order.user_username}</TableCell>
              <TableCell>{new Date(order.created_at).toLocaleDateString()} {new Date(order.created_at).toLocaleTimeString()}</TableCell>
              <TableCell>{order.status}</TableCell>
              <TableCell>
                <FormControl variant="outlined" sx={{ minWidth: 120 }}>
                  <InputLabel>Status</InputLabel>
                  <Select
                    value={selectedOrderId === order.order_id ? orderStatus : order.status}
                    onChange={(e) => {
                      setOrderStatus(e.target.value);
                      setSelectedOrderId(order.order_id);
                    }}
                    label="Status"
                  >
                    <MenuItem value="Pending">Pending</MenuItem>
                    <MenuItem value="Shipped">Shipped</MenuItem>
                    <MenuItem value="Completed">Completed</MenuItem>
                    <MenuItem value="Cancelled">Cancelled</MenuItem>
                  </Select>
                </FormControl>
                <Button
                  variant="contained"
                  color="primary"
                  sx={{ ml: 2, mt: 1 }}
                  onClick={() => handleStatusChange(order.order_id)}
                >
                  Update
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default OrderManagement;
