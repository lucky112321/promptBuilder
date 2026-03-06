import axios from 'axios';

const defaultBaseUrl = import.meta.env.DEV ? 'http://localhost:5000/api' : '/api';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || defaultBaseUrl
});

export const setAuthToken = (token) => {
  if (token) {
    api.defaults.headers.common.Authorization = `Bearer ${token}`;
  } else {
    delete api.defaults.headers.common.Authorization;
  }
};

export default api;
