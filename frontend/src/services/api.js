import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://blog-site-hgt8.onrender.com', 
});

export default instance;
