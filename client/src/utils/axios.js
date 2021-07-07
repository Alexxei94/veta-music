import axios from 'axios';

// ----------------------------------------------------------------------

const axiosInstance = axios.create({
  baseURL: process.env.NODE_ENV === 'production' ? window.location.origin : 'http://localhost:5000'
});

axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => Promise.reject((error.response && error.response.data) || console.log(error))
);

export default axiosInstance;
