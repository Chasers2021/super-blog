import axios, { 
  type AxiosInstance, 
  type AxiosRequestConfig, 
  type AxiosResponse 
} from 'axios';
import router from '@/router';


export const http: AxiosInstance = axios.create({
  // timeout: 5000,
  baseURL: '/api',
  headers: { 'Auth': 'true' }
});

http.interceptors.request.use(
  (config: AxiosRequestConfig): AxiosRequestConfig => {
    return config;
  },
  (error): Promise<any> => {
    return Promise.reject(error);
  }
);

http.interceptors.response.use(
  (response: AxiosResponse) => {
    return response.data;
  },
  error => {
    if (error.response.status === 403) {
      router.push({ path: '/login' });
    }
    return Promise.reject(error);
  }
);
