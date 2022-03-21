/*************************
 *     和风天气数据的类   *
 *************************/
import { createAxios, request, setQweatherInterceptors } from '../http';
import { appKey } from '../../../appKey';

class Qweather {
  constructor(key) {
    this.key = key; // 和风天气的 key
    this.baseUrl = 'https://devapi.qweather.com/v7/';
    this.ax = createAxios(this.baseUrl);
    setQweatherInterceptors(this.ax); // 设置响应拦截器
    this.request = function ({ url, method = 'GET', data }) {
      return request.call(this, {
        url,
        method,
        data: {
          key: this.key,
          ...data,
        },
      });
    };
  }

  // 获取 AQI 指数
  getAqi(location) {
    return this.request({
      url: 'air/now',
      data: { location },
    }).then(res => {
      return res.now;
    });
  }

  // 获取日出日落时间
  getSunTime(location, date) {
    return this.request({
      url: 'astronomy/sun',
      data: { location, date: date || new Date().format('yyyyMMdd') },
    }).then(res => {
      return {
        sunRise: res.sunrise,
        sunSet: res.sunset,
      };
    });
  }

  // 获取月升月落
  getMoonTime(location, date) {
    return this.request({
      url: 'astronomy/moon',
      data: { location, date: date || new Date().format('yyyyMMdd') },
    }).then(res => {
      return {
        moonRise: res.moonrise,
        moonSet: res.moonset,
        moonPhase: res.moonPhase,
      };
    });
  }

  // 获取灾害预警
  getDisasterWaring(location) {
    return this.request({
      url: 'warning/now',
      data: { location },
    }).then(res => {
      return res.warning;
    });
  }

  // 获取生活指数, 默认获取全部生活指数
  getLivingIndices(location, type = 0) {
    return this.request({
      url: 'indices/1d',
      data: { location, type },
    }).then(res => {
      return res.daily;
    });
  }

  // 获取 2 小时降水
  getPrecipitationInTheNextTwoHours(location) {
    return this.request({
      url: 'minutely/5m',
      data: { location },
    }).then(res => {
      return {
        summary: res.summary,
        minutely: res.minutely,
      };
    });
  }

  // 获取 24 小时天气预报
  getWeatherInTheNext24Hours(location) {
    return this.request({
      url: 'weather/24h',
      data: { location },
    }).then(res => {
      return res.hourly;
    });
  }

  // 获取未来 7 天天气预报
  getWeatherInTheNext7Days(location) {
    return this.request({
      url: 'weather/7d',
      data: { location },
    }).then(res => {
      return res.daily;
    });
  }

  // 获取实时天气预报
  getNowWeather(location) {
    return this.request({
      url: 'weather/now',
      data: { location },
    }).then(res => {
      return res.now;
    });
  }

  // 一键获取全部天气数据
  getAllweather(location) {
    return Promise.all([
      this.getAqi(location),
      this.getSunTime(location),
      this.getMoonTime(location),
      this.getDisasterWaring(location),
      this.getLivingIndices(location),
      this.getPrecipitationInTheNextTwoHours(location),
      this.getWeatherInTheNext24Hours(location),
      this.getWeatherInTheNext7Days(location),
      this.getNowWeather(location),
    ]).then(values => {
      const keys = [
        'aqi',
        'sunTime',
        'moonTime',
        'waring',
        'livingIndices',
        'precipitation',
        'next24h',
        'next7days',
        'now',
      ];

      const res = {};

      keys.forEach((key, index) => {
        res[key] = values[index];
      });

      return res;
    });
  }
}

export default new Qweather(appKey.qWeather);
