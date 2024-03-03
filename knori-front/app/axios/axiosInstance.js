// axiosInstance.js
import axios from 'axios';

const instance = axios.create({
  baseURL: 'http://localhost:4001',
});

export default instance;
