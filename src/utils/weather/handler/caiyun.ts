import {
  CYAlert,
  CYAqi,
  CYCaiyunRes,
  CYDaily,
  CYHourly,
  CYLifeIndex,
  CYMinutely,
  CYRealtime,
  CYSun,
} from '@mock/caiyun/type';
import {
  aqiLevel,
  lifeIndextype,
  warningLevel,
  warningType,
  windDir,
  windScale,
} from '../tools';
import { dateOffset } from '@src/utils/utils';

const aqiHandler = function (res: CYAqi, date: number): IAir {
  return {
    dateTime: new Date(date),
    aqi: res.aqi.chn,
    level: aqiLevel(res.aqi.chn),
    category: res.description.chn,
    components: {
      pm10: res.pm10,
      pm2p5: res.pm25,
      no2: res.no2,
      so2: res.so2,
      co: res.co * 1000,
      o3: res.o3,
    },
  };
};

const sunHandler = function (res: CYSun): ISun {
  return {
    sunrise: dateOffset(new Date(res.date), res.sunrise.time),
    sunset: dateOffset(new Date(res.date), res.sunset.time),
  };
};

const warningHandler = function (res: CYAlert): IWarnings {
  const content = res.content;

  return content.map((e): IWarning => {
    const level = Number(e.code.substring(2));
    const type = e.code.substring(0, 2);

    return {
      id: e.alertId,
      pubTime: new Date(e.pubtimestamp * 1000),
      description: e.description,
      title: e.title,
      status: e.status,
      level: warningLevel(level),
      type: type,
      typeName: warningType(type),
      sender: e.source,
    };
  });
};

const lifeIndexHandler = function (res: CYLifeIndex): ILifeIndexs {
  return [
    {
      type: lifeIndextype('comfort'),
      name: 'comfort',
      level: res.comfort.index,
      description: res.comfort.desc,
    },
    {
      type: lifeIndextype('ultraviolet'),
      name: 'ultraviolet',
      level: res.ultraviolet.index,
      description: res.ultraviolet.desc,
    },
  ];
};

const precipHandler = function (res: CYMinutely, date: number): IPrecip {
  const p = res.precipitation_2h.every((e) => e === 0.0);

  return {
    summary: res.description,
    minutely: p
      ? []
      : res.precipitation_2h.map((e, idx) => {
          return {
            dateTime: dateOffset(new Date(date), idx.toString()),
            value: e,
          };
        }),
  };
};

const desc = function (i: string) {
  switch (i) {
    case 'CLEAR_DAY':
      return 'sunny'; // 晴
    case 'CLEAR_NIGHT':
      return 'sunny'; // 晴
    case 'PARTLY_CLOUDY_DAY':
      return 'cloudy'; // 多云
    case 'PARTLY_CLOUDY_NIGHT':
      return 'cloudy'; // 多云
    case 'CLOUDY':
      return 'overcast'; // 阴
    case 'LIGHT_HAZE':
      return 'haze'; // 轻度雾霾
    case 'MODERATE_HAZE':
      return 'moderateHaze'; // 中度雾霾
    case 'HEAVY_HAZE':
      return 'heavyhaze'; // 重度雾霾
    case 'LIGHT_RAIN':
      return 'lightRain'; // 小雨
    case 'MODERATE_RAIN':
      return 'moderateRain'; // 中雨
    case 'HEAVY_RAIN':
      return 'heavyRain'; // 大雨
    case 'STORM_RAIN':
      return 'rainstorm'; // 暴雨
    case 'FOG':
      return 'fog'; // 雾
    case 'LIGHT_SNOW':
      return 'lightSnow'; // 小雪
    case 'MODERATE_SNOW':
      return 'moderateSnow'; // 中雪
    case 'HEAVY_SNOW':
      return 'heavySnow'; // 大雪
    case 'STORM_SNOW':
      return 'snowstorm'; // 暴雪
    case 'DUST':
      return 'dust'; // 浮尘
    case 'SAND':
      return 'sandstorm'; // 沙尘
    case 'WIND':
      return 'wind'; // 大风
    default:
      return 'unknown';
  }
};

const hourlyHandler = function (res: CYHourly): IHourlys {
  const length = res.temperature.length;

  const result: IHourlys = [];

  for (let i = 0; i < length; i++) {
    result.push({
      dateTime: new Date(res.temperature[i].datetime),
      temperature: res.temperature[i].value,
      humidity: res.humidity[i].value,
      precip: res.precipitation[i].value,
      pressure: Number((res.pressure[i].value / 100).toFixed(2)),
      description: desc(res.skycon[i].value),
      icon: res.skycon[i].value,
      wind: {
        wind360: res.wind[i].direction,
        windDir: windDir(res.wind[i].direction),
        windScale: windScale(res.wind[i].speed),
        windSpeed: res.wind[i].speed,
      },
      clouds: res.cloudrate[i].value,
      pop: res.precipitation[i].probability,
    });
  }

  return result;
};

const dailyHandler = function (res: CYDaily): IDailys {
  const length = res.temperature.length;

  const result: IDailys = [];

  for (let i = 0; i < length; i++) {
    result.push({
      dateTime: new Date(res.temperature[i].date),
      sun: {
        sunrise: dateOffset(
          new Date(res.astro[i].date),
          res.astro[i].sunrise.time
        ),
        sunset: dateOffset(
          new Date(res.astro[i].date),
          res.astro[i].sunset.time
        ),
      },
      temperature: {
        max: res.temperature[i].max,
        min: res.temperature[i].min,
      },
      dayIcon: res.skycon_08h_20h[i].value,
      dayDesc: desc(res.skycon_08h_20h[i].value),
      dayWind: {
        wind360: res.wind_08h_20h[i].avg.direction,
        windDir: windDir(res.wind_08h_20h[i].avg.direction),
        windScale: windScale(res.wind_08h_20h[i].avg.speed),
        windSpeed: res.wind_08h_20h[i].avg.speed,
      },
      nightIcon: res.skycon_20h_32h[i].value,
      nightDesc: desc(res.skycon_20h_32h[i].value),
      nightWind: {
        wind360: res.wind_20h_32h[i].avg.direction,
        windDir: windDir(res.wind_20h_32h[i].avg.direction),
        windScale: windScale(res.wind_20h_32h[i].avg.speed),
        windSpeed: res.wind_20h_32h[i].avg.speed,
      },
      humidity: res.humidity[i].avg,
      precip: res.precipitation[i].avg,
      pressure: Number((res.pressure[i].avg / 100).toFixed(2)),
      visibility: res.visibility[i].avg,
      clouds: res.cloudrate[i].avg,
    });
  }

  return result;
};

const nowHandler = function (res: CYRealtime, date: number): INow {
  return {
    dateTime: new Date(date),
    temperature: res.temperature,
    feelsLike: res.apparent_temperature,
    humidity: res.humidity,
    precip: res.precipitation.local.intensity,
    pressure: Number((res.pressure / 100).toFixed(2)),
    description: desc(res.skycon),
    icon: res.skycon,
    wind: {
      wind360: res.wind.direction,
      windDir: windDir(res.wind.direction),
      windScale: windScale(res.wind.speed),
      windSpeed: res.wind.speed,
    },
    visibility: res.visibility,
    clouds: res.cloudrate,
  };
};

export const caiyunHandler = function (
  res: CYCaiyunRes,
  loc: ILocation
): IWeather {
  const result = res.result;

  return {
    location: loc,
    air: aqiHandler(result.realtime.air_quality, res.server_time * 1000),
    sun: sunHandler(result.daily.astro[0]),
    warnings: warningHandler(result.alert),
    lifeIndexs: lifeIndexHandler(result.realtime.life_index),
    precip: precipHandler(result.minutely, res.server_time * 1000),
    hourlys: hourlyHandler(result.hourly),
    dailys: dailyHandler(result.daily),
    now: nowHandler(result.realtime, res.server_time * 1000),
  };
};
