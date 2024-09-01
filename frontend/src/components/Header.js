import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AppBar, Toolbar, Typography, Button, Container, Avatar, Box, Menu, MenuItem } from '@mui/material';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { useAuth } from '../context/AuthContext';

const Header = () => {
  const { user } = useAuth(); 
  const [anchorEl, setAnchorEl] = useState(null);
  const navigate = useNavigate();

  const handleAvatarClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleChangePassword = () => {
    navigate('/changepassword');
    handleClose(); // Close the menu after navigation
  };

  return (
    <AppBar position="sticky">
      <Container maxWidth="lg">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            E-Commerce Store
          </Typography>
          {user ? (
            <>
              {user.role === 'customer' ? (
                <>
                  <Button color="inherit" component={Link} to="/" sx={{ mr: 2 }}>
                    Home
                  </Button>
                  <Button color="inherit" component={Link} to="/products" sx={{ mr: 2 }}>
                    Products
                  </Button>
                  <Button color="inherit" component={Link} to="/cart" startIcon={<ShoppingCartIcon />} sx={{ mr: 2 }}>
                    Cart
                  </Button>
                  <Button color="inherit" component={Link} to="/orders" sx={{ mr: 2 }}>
                    Orders
                  </Button>
                </>
              ) : user.role === 'vendor' ? (
                <>
                  <Button color="inherit" component={Link} to="/products" sx={{ mr: 2 }}>
                    Products
                  </Button>
                  <Button color="inherit" component={Link} to="/productadd" sx={{ mr: 2 }}>
                    Add Product
                  </Button>
                  <Button color="inherit" component={Link} to="/ordermanagement" sx={{ mr: 2 }}>
                    Order Management
                  </Button>
                </>
              ) : null}
              <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <Avatar 
                  sx={{ marginBottom: 1, cursor: 'pointer' }} 
                  onClick={handleAvatarClick}
                >
                  {user.username.charAt(0).toUpperCase()}
                </Avatar>
                <Typography variant="body1" component="div">
                  {user.username}
                </Typography>
              </Box>
              <Menu
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={handleClose}
              >
                <MenuItem onClick={handleChangePassword}>Change Password</MenuItem>
              </Menu>
              <Button color="inherit" component={Link} to="/logout">
                Logout
              </Button>
            </>
          ) : (
            <Button color="inherit" component={Link} to="/login">
              Login
            </Button>
          )}
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Header;
