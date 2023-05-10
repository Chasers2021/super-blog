import axios, { 
  type AxiosInstance, 
  type AxiosRequestConfig, 
  type AxiosResponse 
} from 'axios';

export const http: AxiosInstance = axios.create({
  // timeout: 5000,
  baseURL: '/'
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
    return Promise.reject(error);
  }
);
