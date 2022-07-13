import { openWeatherCode, qWeatherCode, qqMapCode } from './code';
import axios, { AxiosInstance, AxiosResponse, Method } from 'axios';
import { i18n } from 'src/boot/i18n';
import { notify } from 'utils/utils';

export default class Http {
  ax: AxiosInstance;

  constructor(options: { baseUrl: string; timeout?: number }) {
    this.ax = Http.createAxios(options);
  }

  static createAxios({
    baseUrl,
    timeout,
  }: {
    baseUrl: string;
    timeout?: number;
  }) {
    const ax = axios.create({
      timeout: timeout ?? 3000,
      baseURL: baseUrl,
    });

    return ax;
  }

  request({
    url,
    method,
    data,
  }: {
    url: string;
    method: Method;
    data: Record<string, string>;
  }) {
    const p: { [key: string]: object } = {};

    if (method === 'GET') {
      p.params = data;
    } else if (method === 'POST') {
      p.data = data;
    }

    return this.ax({
      url,
      method,
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
          notify.negative(err);
        } else if (typeof err.message === 'string') {
          notify.negative(err.message);
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
        notify.negative(qWeatherCode[res.code]);
        return Promise.reject();
      }
    });
  }

  // openWeather
  static setOpenWeatherResponseInterceptors(ax: AxiosInstance) {
    Http.setResponseInterceptors(ax, (resp) => {
      if (resp.status === 200) {
        return Promise.resolve(resp.data);
      } else {
        notify.negative(openWeatherCode[resp.status]);
        return Promise.reject();
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
        notify.negative(qqMapCode[resp.data.status]);
        return Promise.reject();
      }
    });
  }

  // 小冰天气后端
  static setIceResponseInterceptors(ax: AxiosInstance) {
    Http.setResponseInterceptors(ax, (resp) => {
      const data = resp.data;
      if (data.status === 0) {
        return Promise.resolve(data.data);
      } else {
        notify.negative(qqMapCode[resp.data.status]);
        return Promise.reject();
      }
    });
  }
}

