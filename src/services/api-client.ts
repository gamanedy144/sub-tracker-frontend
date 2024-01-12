import axios from 'axios';

export const apiService = axios.create({
  baseURL: 'http://localhost:8080/api/v1',
  withCredentials: true,
});

export const setAuthHeaders = (token: string) => {
  if (token) {
    apiService.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  } else {
    delete apiService.defaults.headers.common['Authorization'];
  }
};
