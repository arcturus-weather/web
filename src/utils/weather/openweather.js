/*************************
 *     openWeather 类    *
 *************************/
import { createAxios, request, setOpenWeatherInterceptors } from '../http';
import { appKey } from '../../../appKey';

class OpenWeather {
  constructor(key) {
    this.appid = key; // 开放天气的 key
    this.baseUrl = 'http://api.openweathermap.org/data/2.5/';
    this.ax = createAxios(this.baseUrl);
    setOpenWeatherInterceptors(this.ax); // 设置响应拦截器
    this.request = ({ url, method = 'GET', data }) => {
      return request.call(this, {
        url,
        method,
        data: {
          appid: this.appid,
          units: this.units,
          lang: this.lang,
          ...data,
        },
      });
    };
    this.units = 'metric'; // 默认公制单位
    this.lang = 'zh_cn'; // 默认中文简体
  }

  /**
   * 设置默认单位
   * @param {String} units: 可选值 metric, standard, imperial
   */
  setUnits(units) {
    this.units = units;
  }

  //  设置默认语言
  setLang(lang) {
    this.lang = lang;
  }

  // 获取全部天气数据
  getAllWeather(lat, lon) {
    return this.request({
      url: 'onecall',
      data: { lat, lon },
    });
  }

  /**
   * 获取历史天气数据(仅支持过去 5 天内天气)
   * @param {Number} lat
   * @param {Number} lon
   * @param {Number} dt: 时间戳
   * @returns
   */
  getHistoricWeather(lat, lon, dt) {
    return this.request({
      url: 'onecall/timemachine',
      data: { lat, lon, dt },
    });
  }

  // 获取当前天气
  getNowWeather(lat, lon) {
    return this.request({
      url: 'weather',
      data: { lat, lon },
    });
  }

  // 获取 7 天 3 小时预报
  getForcast(lat, lon) {
    return this.request({
      url: 'forecast',
      data: { lat, lon },
    });
  }
}

export default new OpenWeather(appKey.openWeather);
