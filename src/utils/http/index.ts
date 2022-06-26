import { openWeatherCode, qWeatherCode, qqMapCode } from './code';
import axios, { AxiosInstance, Method } from 'axios';
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
      () => {
        // 请求失败, 如网络错误等
        return Promise.reject();
      }
    );
  }

  /*************************
   *       响应拦截器        *
   *************************/

  static setResponseInterceptors(ax: AxiosInstance, func: (arg: any) => any) {
    ax.interceptors.response.use(
      (resp) => {
        func(resp);
      },
      (err) => {
        if (typeof err === 'string') {
          Notify.create({
            type: 'negative',
            message: err,
          });
        }

        return Promise.reject(err);
      }
    );
  }

  // qWeather
  static setQweatherResponseInterceptors(ax: AxiosInstance) {
    Http.setResponseInterceptors(ax, function (resp) {
      const res = resp.data;
      if (res.code === '200') {
        return res;
      } else {
        return Promise.reject(qWeatherCode[res.code]);
      }
    });
  }

  // openWeather
  static setOpenWeatherResponseInterceptors(ax: AxiosInstance) {
    Http.setResponseInterceptors(ax, function (resp) {
      if (resp.status === 200) {
        return resp.data;
      } else {
        return Promise.reject(openWeatherCode[resp.status]);
      }
    });
  }

  // 腾讯地图
  static setQQMapResponseInterceptors(ax: AxiosInstance) {
    Http.setResponseInterceptors(ax, function (resp) {
      if (resp.data.status === 0) {
        return resp.data;
      } else {
        return Promise.reject(qqMapCode[resp.data.status]);
      }
    });
  }
}
