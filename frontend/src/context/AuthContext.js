import React, { createContext, useState, useContext, useEffect } from 'react';
import axios from 'axios';

const AuthContext = createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Fetch user data if token exists
    const fetchUser = async () => {
      const token = localStorage.getItem('token');
      console.log("token:", token);
      if (token) {
        try {
          const response = await axios.get('http://localhost:5000/auth/current_user', {
            headers: { Authorization: `Bearer ${token}` } // Include JWT token in request
          });
          setUser(response.data); // Set user from response
        } catch (error) {
          console.error('Failed to fetch user', error);
          setUser(null); // Clear user if fetching fails
        }
      }
    };

    fetchUser();
  }, []);

  const login = async (email, password) => {
    try {
      const response = await axios.post('http://localhost:5000/login', { email, password });
      const { token, user } = response.data;
      localStorage.setItem('token', token); // Store the JWT token in localStorage
      setUser(user); // Update the user state
    } catch (error) {
      console.error('Login failed', error);
    }
  };

  const logout = async () => {
    try {
      localStorage.removeItem('token'); // Remove the JWT token from localStorage
      setUser(null);
    } catch (error) {
      console.error('Logout failed', error);
    }
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}
