import Http, { requestOption } from '@utils/http';
import Location from '@utils/location/location';
import { WeatherStrategy } from './base';
import { CYCaiyunRes } from '@mock/caiyun/type';
import { caiyunHandler } from '../handler/caiyun';

const caiyunLangMap = {
  'zh-CN': 'zh_CN',
  'zh-TW': 'zh_TW',
  'en-US': 'en_US',
  'en-GB': 'en_GB',
};

export default class CaiyunStrategy extends WeatherStrategy {
  private http: Http;

  constructor(
    private key: string,
    private lang = 'zh_CN',
    private baseUrl: string = 'https://api.caiyunapp.com/v2.6/'
  ) {
    super();

    this.http = new Http({
      baseUrl: this.baseUrl,
    });

    Http.setRequestInterceptors(this.http.ax);

    Http.setResponseInterceptors(this.http.ax, (resp) => {
      const res = resp.data;
      const status = res.status;

      if (status === 'ok') {
        return Promise.resolve(res);
      } else {
        return Promise.reject();
      }
    });
  }

  set language(lang: Languages) {
    this.lang = caiyunLangMap[lang];
  }

  request({ url, data, headers }: requestOption): Promise<any> {
    return this.http.request({
      url,
      method: 'GET',
      headers,
      data: {
        params: {
          lang: this.lang,
          ...data,
        },
      },
    });
  }

  async getWeather(loc: Location): Promise<IWeather> {
    const res: CYCaiyunRes = await this.request({
      url: `${this.key}/${loc.toString()}/weather`,
      data: {
        alert: true,
        dailysteps: 1,
        hourlysteps: 24,
      },
    });

    return caiyunHandler(res, loc);
  }
}
