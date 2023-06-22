import axios from 'axios';
const envType = process.env.NODE_ENV;
const contextPath = () => {
  return window.location.pathname.substring(0, window.location.pathname.indexOf('/', 2));
};
const getBaseUrl = () => {
  if (envType === 'development') {
    return 'http://localhost:8080/api';
  } else if (envType === 'production') return contextPath() + '/api';
};

const axiosInstance = axios.create({
  baseURL: getBaseUrl(),
  headers: {
    'Content-Type': 'application/json',
  },
});

export default axiosInstance;
