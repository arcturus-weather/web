import Http from 'utils/http';
import Location from 'utils/location/location';
import { Strategies } from './base';
import { aqiLevel } from '../tools';

// 处理请求结果
class OpenWeatherHandler {
  static aqiHandler(res: Record<string, any>): IAir {
    return {
      dateTime: new Date(res.dt * 1000),
      aqi: res.main.aqi,
      level: aqiLevel(res.main.aqi),
      components: {
        pm10: res.components.pm10,
        pm2p5: res.components.pm2_5,
        no2: res.components.no2,
        nh3: res.components.no2,
        no: res.components.no,
        so2: res.components.so2,
        co: res.components.co,
        o3: res.components.o3,
      },
    };
  }

  static sunHandler(res: Record<string, any>): ISun {
    return {
      sunRise: new Date(res.sunrise * 1000),
      sunSet: new Date(res.sunset * 1000),
    };
  }

  static warningHandler(
    res: Array<Record<string, any>> | undefined
  ): Array<IWarning> {
    return typeof res !== 'undefined'
      ? res.map((e: Record<string, any>): IWarning => {
          return {
            start: new Date(e.start * 1000),
            end: new Date(e.end * 1000),
            description: e.description,
            title: e.event,
            typeName: e.tags,
            sender: e.sender_name ?? '暂无发布单位',
          };
        })
      : [];
  }

  static precipHandler(res: Array<Record<string, any>>): IFuturePrecip {
    const noPrecip: boolean = res.every(
      (e: Record<string, any>) => e.precipitation === 0
    );

    return {
      minutely: noPrecip
        ? [] // 未降雨
        : res.map((e: Record<string, any>): IPrecip => {
            return {
              dateTime: new Date(e.dt * 1000),
              precip: e.precipitation,
            };
          }),
    };
  }

  static hourlyHandler(res: Array<Record<string, any>>): Array<IWeatherItem> {
    return res.map((e: Record<string, any>): IWeatherItem => {
      return {
        dateTime: new Date(e.dt * 1000),
        temperature: {
          day: e.temp,
        },
        feelsLike: {
          day: e.feels_like,
        },
        humidity: e.humidity,
        pressure: e.pressure,
        description: e.weather[0].description,
        icon: `${e.weather[0].id}-${e.weather[0].icon}`,
        wind: {
          wind360: e.wind_deg,
          windGust: e.wind_gust,
          windSpeed: e.wind_speed,
        },
        clouds: e.clouds,
        dewPoint: e.dew_point,
        uvIndex: e.uvi,
        visibility: e.visibility,
        pop: e.pop,
        precip: e.rain ? e.rain['1h'] : e.snow ? e.snow['1h'] : undefined,
      };
    });
  }

  static dailyHandler(res: Record<string, any>): Array<IDailyItem> {
    return res.map((e: Record<string, any>): IDailyItem => {
      return {
        dateTime: new Date(e.dt * 1000),
        sun: {
          sunRise: new Date(e.sunrise * 1000),
          sunSet: new Date(e.sunset * 1000),
        },
        moon: {
          moonRise: new Date(e.moonrise * 1000),
          moonSet: new Date(e.moonset * 1000),
          moonPhase: {
            value: e.moon_phase,
          },
        },
        temperature: {
          day: e.temp.day,
          max: e.temp.max,
          min: e.temp.min,
          night: e.temp.night,
          eve: e.temp.eve,
          morn: e.temp.morn,
        },
        feelsLike: {
          day: e.feels_like.day,
          night: e.feels_like.night,
          eve: e.feels_like.eve,
          morn: e.feels_like.morn,
        },
        dayIcon: e.weather[0].description,
        dayDesc: `${e.weather[0].id}-${e.weather[0].icon}`,
        dayWind: {
          wind360: e.wind_deg,
          windSpeed: e.wind_speed,
          windGust: e.wind_gust,
        },
        humidity: e.humidity,
        pop: e.pop,
        dewPoint: e.dew_point,
        precip: e.rain ?? e.snow,
        pressure: e.pressure,
        clouds: e.clouds,
        uvIndex: e.uvi,
      };
    });
  }

  static nowWeatherHandler(res: Record<string, any>): IWeatherItem {
    return {
      dateTime: new Date(res.dt * 1000),
      temperature: {
        day: res.temp,
      },
      feelsLike: {
        day: res.feels_like,
      },
      humidity: res.humidity,
      precip: res.rain ? res.rain['1h'] : res.snow ? res.snow['1h'] : undefined,
      pressure: res.pressure,
      description: res.weather[0].description,
      icon: `${res.weather[0].id}-${res.weather[0].icon}`,
      wind: {
        wind360: res.wind_deg,
        windGust: res.wind_gust,
        windSpeed: res.wind_speed,
      },
      uvIndex: res.uvi,
      visibility: res.visibility,
      clouds: res.clouds,
      dewPoint: res.dew_point,
    };
  }
}

const openWeatherLangMap = {
  'zh-CN': 'zh_cn',
  'zh-TW': 'zh_tw',
  'en-US': 'en',
};

export default class OpenWeatherStrategies extends Strategies {
  private http: Http;

  constructor(
    private key: string,
    private lang: string = 'zh_cn',
    private baseUrl: string = 'http://api.openweathermap.org/data/2.5'
  ) {
    super();

    this.http = new Http({
      baseUrl: this.baseUrl,
    });

    // 添加响应拦截器
    Http.setOpenWeatherResponseInterceptors(this.http.ax);
  }

  // docs: https://openweathermap.org/api/one-call-3#multi
  set language(lang: Languages) {
    this.lang = openWeatherLangMap[lang];
  }

  request({ url, data }: { url: string; data: object }): Promise<any> {
    return this.http.request({
      url,
      method: 'GET',
      data: Object.assign(
        {
          key: this.key,
          unit: 'metric',
          lang: this.lang,
        },
        data
      ),
    });
  }

  // 获取 AQI 指数及预测
  getAir(loc: Location): Promise<{
    air: IAir;
    airForcast: Array<IAir>;
  }> {
    return Promise.all([
      this.request({
        url: '/air_pollution',
        data: { lat: loc.latitude, lng: loc.longitude },
      }),
      this.request({
        url: '/air_pollution/forecast',
        data: { lat: loc.latitude, lng: loc.longitude },
      }),
    ]).then((res) => {
      return {
        air: OpenWeatherHandler.aqiHandler(res[0].list[0]),
        airForcast: res[1].list.map((e: Record<string, any>) => {
          return OpenWeatherHandler.aqiHandler(e);
        }),
      };
    });
  }

  // 获取日出日落时间(openWeather does not need this function)
  getSunTime(): Promise<any> {
    return new Promise(() => {});
  }

  // 获取月升月落
  getMoonTime(): Promise<any> {
    return new Promise(() => {});
  }

  // 获取灾害预警
  getDisasterWarning(): Promise<any> {
    return new Promise(() => {});
  }

  // 获取生活指数, 默认获取全部生活指数
  getLivingIndices(): Promise<any> {
    return new Promise(() => {});
  }

  // 获取 2 小时降水
  getPrecipitationInTheNextTwoHours(): Promise<any> {
    return new Promise(() => {});
  }

  // 获取 24 小时天气预报
  getWeatherByHours(): Promise<any> {
    return new Promise(() => {});
  }

  // 获取未来 7 天天气预报
  getWeatherByDays(): Promise<any> {
    return new Promise(() => {});
  }

  // 获取实时天气预报
  getNowWeather(loc: Location): Promise<IWeatherItem> {
    return this.request({
      url: '/weather',
      data: { lat: loc.latitude, lng: loc.longitude },
    }).then((res) => {
      return OpenWeatherHandler.nowWeatherHandler(res);
    });
  }

  // 一键获取全部天气数据
  getAllweather(loc: Location): Promise<any> {
    return Promise.all([
      this.getAir(loc),
      this.request({
        url: '/onecall',
        data: { lat: loc.latitude, lng: loc.longitude },
      }),
    ]).then((values): IWeather => {
      return {
        location: loc,
        ...values[0],
        sun: OpenWeatherHandler.sunHandler(values[1].current),
        waring: OpenWeatherHandler.warningHandler(values[1].alerts),
        precip: OpenWeatherHandler.precipHandler(values[1].minutely),
        hourly: OpenWeatherHandler.hourlyHandler(values[1].hourly),
        daily: OpenWeatherHandler.dailyHandler(values[1].daily),
        now: OpenWeatherHandler.nowWeatherHandler(values[1].current),
      };
    });
  }
}

