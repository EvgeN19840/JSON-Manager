import { newToast } from '@/shared/components/toast';
import axios, {
  AxiosInstance,
  AxiosRequestConfig,
  AxiosResponse,
  InternalAxiosRequestConfig,
} from 'axios';

const API_HEADERS = {
  Accept: 'application/json',
  'Content-Type': 'application/json',
};

const FILE_API_HEADERS = {
  'Content-Type': 'multipart/form-data',
};

const baseURL: string = import.meta.env.VITE_API_URL;
if (!baseURL) {
  throw new Error('VITE_API_URL не задан в .env файле');
}

const createApiInstance = (
  headers: AxiosRequestConfig['headers'],
  customConfig: AxiosRequestConfig = {}
): AxiosInstance => {
  const instance = axios.create({
    baseURL,
    headers,
    ...customConfig,
  });

  instance.interceptors.request.use((config: InternalAxiosRequestConfig) => {
    return config;
  });

  instance.interceptors.response.use(
    (response: AxiosResponse) => {
      if (
        response.config.method !== 'get' &&
        response.data &&
        response.data.successDescription
      ) {
        newToast({
          type: 'success',
          text: response.data.successDescription,
          infin: false
        });
      }
      return response;
    },
    (error) => {
      const errorMessage =
        error.response && error.response.data && error.response.data.errors
          ? error.response.data.errors
          : error.message;
      newToast({ type: 'error', text: errorMessage, infin: false });
      return Promise.reject(error);
    }
  );


  return instance;
};

const apiInstance = createApiInstance(API_HEADERS);
const fileApiInstance = createApiInstance(FILE_API_HEADERS, {
  responseType: 'blob',
});

const createApiMethods = (instance: AxiosInstance) => ({
  get: <T>(
    url: string,
    config?: AxiosRequestConfig
  ): Promise<AxiosResponse<T>> => instance.get(url, config),

  post: <T>(
    url: string,
    data?: unknown,
    config?: AxiosRequestConfig
  ): Promise<AxiosResponse<T>> => instance.post(url, data, config),

  put: <T>(
    url: string,
    data?: unknown,
    config?: AxiosRequestConfig
  ): Promise<AxiosResponse<T>> => instance.put(url, data, config),

  patch: <T>(
    url: string,
    data?: unknown,
    config?: AxiosRequestConfig
  ): Promise<AxiosResponse<T>> => instance.patch(url, data, config),

  delete: <T>(
    url: string,
    config?: AxiosRequestConfig
  ): Promise<AxiosResponse<T>> => instance.delete(url, config),
});

export const api = createApiMethods(apiInstance);
export const fileApi = createApiMethods(fileApiInstance);