import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://blog-site-hgt8.onrender.com', 
});


// const instance = axios.create({
//   baseURL: 'http://localhost:3000', 
// });
export default instance;
