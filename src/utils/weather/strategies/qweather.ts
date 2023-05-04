import Http, { requestOption } from '@utils/http';
import Location from '@utils/location/location';
import { WeatherStrategy } from './base';
import { date } from 'quasar';
import { notify } from '@src/utils/utils';
import { qWeatherCode } from '@src/utils/http/code';
import { qweatherHandler } from '../handler/qweather';
import {
  QAir,
  QDailys,
  QHourlys,
  QLifeIndexs,
  QMoon,
  QNow,
  QPrecip,
  QSun,
  QWarnings,
} from '@mock/qweather/type';
import md5 from 'js-md5';

const qWeatherLangMap: Record<Languages, string> = {
  'zh-CN': 'zh',
  'zh-TW': 'zh-hant',
  'en-US': 'en',
  'en-GB': 'en',
};

interface signureOptions {
  publicID: string;
  privateKey: string;
  parameterObject: Record<string, string>;
}

// 获取包含签名的请求参数
function getParams(o: signureOptions) {
  const timestamp = String(Math.round(new Date().getTime() / 1000));

  const obj = { ...o.parameterObject };

  obj['t'] = timestamp;
  obj['publicid'] = o.publicID;

  const keys = Object.keys(obj);

  keys.sort();

  let str = '';

  for (const i in keys) {
    const k = keys[i];
    str += k + '=' + obj[k] + '&';
  }

  str = str.substring(0, str.length - 1) + o.privateKey;

  return {
    ...obj,
    sign: md5(str),
  };
}

export default class QWeatherStrategy extends WeatherStrategy {
  private http: Http;

  constructor(
    private key: string,
    private pid: string,
    private lang = 'zh',
    private baseUrl: string = 'https://devapi.qweather.com/v7/'
  ) {
    super();

    this.http = new Http({
      baseUrl: this.baseUrl,
    });

    Http.setRequestInterceptors(this.http.ax);

    Http.setResponseInterceptors(this.http.ax, (resp) => {
      const res = resp.data;
      const code = Number(res.code);

      if (code === 200) {
        return Promise.resolve(res);
      } else {
        notify.negative(qWeatherCode[code as keyof typeof qWeatherCode]);
        return Promise.reject();
      }
    });
  }

  set language(lang: Languages) {
    this.lang = qWeatherLangMap[lang];
  }

  request({ url, data, headers }: requestOption) {
    const d = {
      lang: this.lang,
      ...data,
    };

    return this.http.request({
      url,
      method: 'GET',
      headers,
      data: {
        params: {
          ...getParams({
            parameterObject: d,
            publicID: this.pid,
            privateKey: this.key,
          }),
        },
      },
    });
  }

  // 获取 AQI 指数
  async getAir(loc: Location): Promise<QAir> {
    const res = await this.request({
      url: 'air/now',
      data: { location: loc.toString() },
    });

    return res.now;
  }

  // 获取日出日落时间
  async getSunTime(loc: Location, d?: string): Promise<QSun> {
    const res = await this.request({
      url: 'astronomy/sun',
      data: {
        location: loc.toString(),
        date: d ?? date.formatDate(Date.now(), 'YYYYMMDD'),
      },
    });

    return res;
  }

  // 获取月升月落
  async getMoonTime(loc: Location, d?: string): Promise<QMoon> {
    const res = await this.request({
      url: 'astronomy/moon',
      data: {
        location: loc.toString(),
        date: d ?? date.formatDate(Date.now(), 'YYYYMMDD'),
      },
    });

    return res;
  }

  // 获取灾害预警
  async getDisasterWarning(loc: Location): Promise<QWarnings> {
    const res = await this.request({
      url: 'warning/now',
      data: { location: loc.toString() },
    });

    return res.warning;
  }

  // 获取生活指数, 默认获取全部生活指数
  async getLivingIndices(loc: Location, type = 0): Promise<QLifeIndexs> {
    const res = await this.request({
      url: 'indices/1d',
      data: {
        location: loc.toString(),
        type,
      },
    });

    return res.daily;
  }

  // 获取 2 小时降水
  async getPrecipitationInTheNextTwoHours(loc: Location): Promise<QPrecip> {
    const res = await this.request({
      url: 'minutely/5m',
      data: { location: loc.toString() },
    });

    return res;
  }

  // 获取 24 小时天气预报
  async getWeatherByHours(loc: Location): Promise<QHourlys> {
    const res = await this.request({
      url: 'weather/24h',
      data: { location: loc.toString() },
    });

    return res.hourly;
  }

  // 获取未来 7 天天气预报
  async getWeatherByDays(loc: Location): Promise<QDailys> {
    const res = await this.request({
      url: 'weather/7d',
      data: { location: loc.toString() },
    });

    return res.daily;
  }

  // 获取实时天气预报
  async getNowWeather(loc: Location): Promise<QNow> {
    const res = await this.request({
      url: 'weather/now',
      data: { location: loc.toString() },
    });

    return res.now;
  }

  async getWeather(loc: Location): Promise<IWeather> {
    const res = await Promise.all([
      this.getAir(loc),
      this.getSunTime(loc),
      this.getMoonTime(loc),
      this.getDisasterWarning(loc),
      this.getLivingIndices(loc),
      this.getPrecipitationInTheNextTwoHours(loc),
      this.getWeatherByHours(loc),
      this.getWeatherByDays(loc),
      this.getNowWeather(loc),
    ]);

    return qweatherHandler(res, loc);
  }
}
