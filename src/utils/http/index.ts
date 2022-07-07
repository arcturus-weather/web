import { openWeatherCode, qWeatherCode, qqMapCode } from './code';
import axios, { AxiosInstance, AxiosResponse, Method } from 'axios';
import { Notify } from 'quasar';
import { i18n } from 'src/boot/i18n';

export default class Http {
  ax: AxiosInstance;

  constructor(private options: { baseUrl: string; timeout?: number }) {
    this.ax = Http.createAxios({
      baseUrl: this.options.baseUrl,
      timeout: this.options.timeout ?? 3000,
    });
  }

  static createAxios(options: { baseUrl: string; timeout: number }) {
    const ax = axios.create({
      timeout: options.timeout,
      baseURL: options.baseUrl,
    });

    return ax;
  }

  request(options: {
    url: string;
    method: Method;
    data: Record<string, string>;
  }) {
    const p: { [key: string]: object } = {};

    if (options.method === 'GET') {
      p.params = options.data;
    } else if (options.method === 'POST') {
      p.data = options.data;
    }

    return this.ax({
      url: options.url,
      method: options.method,
      ...p,
    });
  }

  /*************************
   *       请求拦截器        *
   *************************/

  static setRequestInterceptors(ax: AxiosInstance, type: string) {
    ax.interceptors.request.use(
      (config) => {
        if (typeof config.params.key === 'undefined') {
          // 这个 reject 会被抛给响应拦截器
          return Promise.reject(`${type} ${i18n.global.t('waring.key')}`);
        }

        return config;
      },
      (err) => {
        // 请求失败, 如网络错误等, 会被响应拦截器的第二个参数接收
        return Promise.reject(err);
      }
    );
  }

  /*************************
   *       响应拦截器        *
   *************************/

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
          Notify.create({
            type: 'negative',
            message: err,
          });
        } else if (typeof err.message !== 'undefined') {
          Notify.create({
            type: 'negative',
            message: err.message,
          });
        }

        return Promise.reject(err);
      }
    );
  }

  // qWeather
  static setQweatherResponseInterceptors(ax: AxiosInstance) {
    Http.setResponseInterceptors(ax, (resp) => {
      const res = resp.data;
      if (res.code === '200') {
        return Promise.resolve(res);
      } else {
        return Promise.reject(qWeatherCode[res.code]);
      }
    });
  }

  // openWeather
  static setOpenWeatherResponseInterceptors(ax: AxiosInstance) {
    Http.setResponseInterceptors(ax, (resp) => {
      if (resp.status === 200) {
        return Promise.resolve(resp.data);
      } else {
        return Promise.reject(openWeatherCode[resp.status]);
      }
    });
  }

  // 腾讯地图
  static setQQMapResponseInterceptors(ax: AxiosInstance) {
    Http.setResponseInterceptors(ax, (resp) => {
      const data = resp.data;
      if (data.status === 0) {
        return Promise.resolve(data.data);
      } else {
        return Promise.reject(qqMapCode[resp.data.status]);
      }
    });
  }
}
