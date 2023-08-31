import axios, { 
  type AxiosInstance, 
  type AxiosRequestConfig, 
  type AxiosResponse 
} from 'axios';
import router from '@/router';


export const http: AxiosInstance = axios.create({
  // timeout: 5000,
  baseURL: '/api',
});

http.interceptors.request.use(
  (config: AxiosRequestConfig): AxiosRequestConfig => {
    (config?.headers as any).Authorization = `Bearer ${localStorage.getItem('Authorization')}`;
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
    if (error.response.status === 401) {
      router.push({ path: '/login' });
    }
    return Promise.reject(error);
  }
);
