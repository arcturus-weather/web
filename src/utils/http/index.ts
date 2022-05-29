import { openWeatherCode, qWeatherCode, qqMapCode } from './code';
import { useQuasar } from 'quasar';
import axios, { AxiosInstance, Method } from 'axios';

const $q = useQuasar();

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
    let p: object;
    if (options.method === 'GET') {
      p = { params: options.data };
    } else if (options.method === 'POST') {
      p = { data: options.data };
    }

    return new Promise((resolve, reject) => {
      this.ax({
        url: options.url,
        method: options.method,
        ...p,
      })
        .then((res) => {
          resolve(res);
        })
        .catch((err) => {
          reject(err);
        });
    });
  }

  /*************************
   *       响应拦截器        *
   *************************/

  // qWeather
  static setQweatherInterceptors(ax: AxiosInstance) {
    ax.interceptors.response.use((resp) => {
      const res = resp.data;
      if (res.code === '200') {
        return res;
      } else {
        $q.notify({
          type: 'negative',
          message: qWeatherCode[res.code],
        });
      }
    });
  }

  // openWeather
  static setOpenWeatherInterceptors(ax: AxiosInstance) {
    ax.interceptors.response.use((resp) => {
      if (resp.status === 200) {
        return resp.data;
      } else {
        $q.notify({
          type: 'negative',
          message: openWeatherCode[resp.status],
        });
      }
    });
  }

  // 腾讯地图
  static setQQMapInterceptors(ax: AxiosInstance) {
    ax.interceptors.response.use((resp) => {
      const res = resp.data;
      if (res.status === 0) {
        return res.data;
      } else {
        $q.notify({
          type: 'negative',
          message: qqMapCode[res.status],
        });
      }
    });
  }
}
