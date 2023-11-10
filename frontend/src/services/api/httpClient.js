import axios from 'axios';

const httpClient = axios.create({
  baseURL: 'http://localhost:8000', 
  withCredentials: true
});

// Interceptor para incluir el token en las solicitudes si está presente
httpClient.interceptors.request.use(config => {
  const token = localStorage.getItem('token'); // o tu método preferido para almacenar el token
  if (token) {
    config.headers['Authorization'] = `Bearer ${token}`;
  }
  return config;
}, error => {
  return Promise.reject(error);
});

export default httpClient;
