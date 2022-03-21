/*************************
 *     axios 的封装       *
 *************************/
import { openWeather, qweather, qqMap } from './code'; // 状态码
import axios from 'axios';
import { Message } from 'element-ui';

/**
 * @param { String } baseUrl
 * @param { * } code : 成功响应的状态码
 * @param { Object } codes : 非成功响应的状态码列表
 * @returns
 */
export function createAxios(baseURL) {
  const ax = axios.create({
    timeout: 10000,
    baseURL,
  });

  return ax;
}

// 实际发送请求
export function request({ url, method = 'GET', data }) {
  let p;
  if (method === 'GET') {
    p = { params: data };
  } else if (method === 'POST') {
    p = { data };
  }

  return new Promise((resolve, reject) => {
    this.ax({
      url,
      method,
      ...p,
    })
      .then(res => {
        resolve(res);
      })
      .catch(err => {
        reject(err);
      });
  });
}

/*************************
 *    设置响应拦截器      *
 *************************/
// qWeather
export function setQweatherInterceptors(ax) {
  ax.interceptors.response.use(
    resp => {
      const res = resp.data;
      if (res.code === '200') {
        return res;
      } else {
        Message.error(qweather[res.code]);
      }
    },
    err => {
      return Promise.reject(err);
    }
  );
}

// openWeather
export function setOpenWeatherInterceptors(ax) {
  ax.interceptors.response.use(
    resp => {
      if (resp.status === 200) {
        return resp.data;
      } else {
        Message.error(openWeather[resp.status]);
      }
    },
    err => {
      return Promise.reject(err);
    }
  );
}

// 腾讯地图
export function setQQMapInterceptors(ax) {
  ax.interceptors.response.use(
    resp => {
      let res = resp.data;
      if (res.status === 0) {
        return res.data;
      } else {
        Message.error(qqMap[res.status]);
      }
    },
    err => {
      return Promise.reject(err);
    }
  );
}