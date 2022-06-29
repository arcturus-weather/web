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

  // qWeather
  static setQweatherResponseInterceptors(ax: AxiosInstance) {
    ax.interceptors.response.use(
      (resp) => {
        const res = resp.data;
        if (res.code === '200') {
          return res;
        } else {
          Notify.create({
            type: 'negative',
            message: qWeatherCode[res.code],
          });

          return Promise.reject();
        }
      },
      (err) => {
        Notify.create({
          type: 'negative',
          message: err,
        });
      }
    );
  }

  // openWeather
  static setOpenWeatherResponseInterceptors(ax: AxiosInstance) {
    ax.interceptors.response.use(
      (resp) => {
        if (resp.status === 200) {
          return resp.data;
        } else {
          Notify.create({
            type: 'negative',
            message: openWeatherCode[resp.status],
          });
        }
      },
      (err) => {
        Notify.create({
          type: 'negative',
          message: err,
        });
      }
    );
  }

  // 腾讯地图
  static setQQMapResponseInterceptors(ax: AxiosInstance) {
    ax.interceptors.response.use(
      (resp) => {
        if (resp.data.status === 0) {
          return resp.data.data;
        } else {
          Notify.create({
            type: 'negative',
            message: qqMapCode[resp.data.status],
          });
        }
      },
      (err) => {
        Notify.create({
          type: 'negative',
          message: err,
        });
      }
    );
  }
}
