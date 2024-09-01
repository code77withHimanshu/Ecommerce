import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import Home from './pages/Home';
import Products from './pages/Products';
import Product from './pages/Product';
import Cart from './components/Cart';
import Login from './pages/Login';
import Logout from './pages/Logout';
import { useAuth } from './context/AuthContext';
import Register from './pages/Register';
import AddToCart from './components/AddToCart';
import Order from './pages/Orders';
import Orders from './pages/Orders';
import ProductAdd from './components/ProductAdd';
import OrderManagement from './components/OrderManagement';
import ChangePassword from './components/ChangePassword';

const App = () => {
  const { user } = useAuth();
  console.log("User:",user);

  return (
    <Router>
      <div className="App">
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          {user ? (
            <>
              <Route path="/products" element={<Products />} />
              <Route path="/ordermanagement" element={<OrderManagement />} />
              <Route path="/changepassword" element={<ChangePassword />} />
              <Route path="/productadd" element={<ProductAdd />} />
              <Route path="/products/:id" element={<Product />} />
              <Route path="/cart" element={<Cart />} />
              <Route path="/orders" element={<Orders />} />
              <Route path="/logout" element={<Logout />} />
              <Route path="/addtocart" element={<AddToCart />} />
            </>
          ) : (
            <Route path="*" element={<Login />} /> // Redirects unauthenticated users to the login page
          )}
        </Routes>
      </div>
    </Router>
  );
};

export default App;
