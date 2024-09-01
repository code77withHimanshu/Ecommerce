import axios from 'axios';

export const login = async (email, password) => {
  return await axios.post('/login', { email, password });
};

export const register = async (name, email, password) => {
  return await axios.post('/register', { name, email, password });
};
