import axios from 'axios';
import Cookies from 'js-cookie';
import { API_URL } from '../config';

const api = axios.create({
  baseURL: API_URL,
});

// Request interceptor to add auth token
api.interceptors.request.use(
  (config) => {
    // Don't add auth header for public endpoints
    const publicEndpoints = ['/auth/local/register', '/auth/local', '/auth/forgot-password', '/auth/reset-password'];
    const isPublicEndpoint = publicEndpoints.some(endpoint => config.url.includes(endpoint));

    if (!isPublicEndpoint) {
      const token = Cookies.get('jwt');
      console.log('token', token);
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default api; 