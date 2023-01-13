import axios, {
  AxiosInstance,
  AxiosRequestConfig,
  AxiosResponse,
  Method,
} from 'axios';
import { notify } from '@utils/utils';

interface httpOption {
  baseUrl: string;
  timeout?: number;
  headers?: Record<string, string>;
}

export interface requestOption {
  url: string;
  method?: Method;
  data?: Record<string, any>;
  headers?: Record<string, string>;
}

export default class Http {
  ax: AxiosInstance;

  constructor(options: httpOption) {
    this.ax = Http.createAxios(options);
  }

  static createAxios({ baseUrl, timeout, headers }: httpOption) {
    const ax = axios.create({
      timeout: timeout ?? 20000,
      baseURL: baseUrl,
      headers,
    });

    return ax;
  }

  request({ url, method = 'GET', data = {}, headers = {} }: requestOption) {
    return this.ax({ url, method, ...data, headers });
  }

  static setRequestInterceptors(
    ax: AxiosInstance,
    handler?: (
      value: AxiosRequestConfig
    ) => AxiosRequestConfig | Promise<AxiosRequestConfig>
  ) {
    if (typeof handler === 'undefined') {
      handler = (config) => config;
    }

    ax.interceptors.request.use(handler, (err) => {
      // 请求失败, 如网络错误等, 会被响应拦截器的第二个参数接收
      return Promise.reject(err);
    });
  }

  static setResponseInterceptors(
    ax: AxiosInstance,
    fn: (resp: AxiosResponse<any>) => Promise<any>
  ) {
    ax.interceptors.response.use(
      (resp) => {
        return fn(resp);
      },
      (err) => {
        if (typeof err === 'string') {
          notify.negative(err);
        } else if (typeof err.message === 'string') {
          notify.negative(err.message);
        }

        return Promise.reject(err.response.data);
      }
    );
  }
}

