/*************************
 *和风天气 Geo 城市信息查询*
 *************************/
import { createAxios, request, setQweatherInterceptors } from '../http';
import { appKey } from '../../../appKey';

class Geo {
  constructor(key) {
    this.key = key;
    this.baseUrl = 'https://geoapi.qweather.com/v2/';
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

  // 城市信息查询
  getCityList(location) {
    return this.request({
      url: 'city/lookup',
      data: { location },
    }).then(res => {
      return res.location;
    });
  }
}

export default new Geo(appKey.geo);
