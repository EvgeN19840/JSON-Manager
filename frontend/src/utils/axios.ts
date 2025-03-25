import axios, {
  AxiosInstance,
  AxiosRequestConfig,
  AxiosResponse,
  InternalAxiosRequestConfig,
} from 'axios';

const API_HEADERS = {
  Accept: 'application/ld+json',
  'Content-Type': 'application/ld+json',
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
