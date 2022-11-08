import axios, { 
  type AxiosInstance, 
  type AxiosRequestConfig, 
  type AxiosResponse 
} from 'axios';

export const service: AxiosInstance = axios.create({
  timeout: 5000,
  baseURL: '/'
});

service.interceptors.request.use(
  (config: AxiosRequestConfig): AxiosRequestConfig => {
    return config;
  },
  (error): Promise<any> => {
    return Promise.reject(error);
  }
);

service.interceptors.response.use(
  (response: AxiosResponse) => {
    return response.data;
  },
  error => {
    return Promise.reject(error);
  }
);
