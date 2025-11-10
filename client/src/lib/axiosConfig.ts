import axios from 'axios';

const serverBaseUrl = import.meta.env.VITE_API_URL; 

const api = axios.create({
  baseURL: `${serverBaseUrl}/api`,
});

api.interceptors.request.use(
  (config) => {
    const userInfoString = localStorage.getItem('userInfo');
    
    if (userInfoString) {
      const userInfo = JSON.parse(userInfoString);
      const token = userInfo.token;
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