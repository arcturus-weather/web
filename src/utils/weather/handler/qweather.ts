import {
  QAir,
  QRes,
  QNow,
  QWarnings,
  QSun,
  QMoon,
  QLifeIndexs,
  QPrecip,
  QHourlys,
  QDailys,
} from '@mock/qweather/type';
import { windDir } from '../tools';

const aqiHandler = function (res: QAir): IAir {
  return {
    dateTime: new Date(res.pubTime),
    aqi: Number(res.aqi),
    level: Number(res.level),
    category: res.category,
    components: {
      pm10: Number(res.pm10),
      pm2p5: Number(res.pm2p5),
      no2: Number(res.no2),
      so2: Number(res.so2),
      co: Number(res.co) * 1000,
      o3: Number(res.o3),
    },
  };
};

const sunHandler = function (res: QSun): ISun {
  return {
    sunrise: res.sunrise === '' ? undefined : new Date(res.sunrise),
    sunset: res.sunset === '' ? undefined : new Date(res.sunset),
  };
};

const moonPhaseName = function (i: string) {
  if (i === '800') return 'newMoon';
  else if (i === '801') return 'crescentMoon';
  else if (i === '802') return 'firstQuarterMoon';
  else if (i === '803') return 'gibbousMoon';
  else if (i === '804') return 'fullMoon';
  else if (i === '805') return 'wantingGibbousMoon';
  else if (i === '806') return 'lastQuarterMoon';
  else if (i === '807') return 'waningMoon';
  else return 'unknown';
};

const moonHandler = function (res: QMoon): IMoon {
  return {
    moonrise: res.moonrise === '' ? undefined : new Date(res.moonrise),
    moonset: res.moonset === '' ? undefined : new Date(res.moonset),
    moonPhase: res.moonPhase.map((e): IMoonPhase => {
      return {
        dateTime: new Date(e.fxTime),
        value: Number(e.value),
        name: moonPhaseName(e.icon),
        illumination: Number(e.illumination),
        icon: e.icon,
      };
    }),
  };
};

const warningHandler = function (res: QWarnings): IWarnings {
  return res.map((e): IWarning => {
    return {
      id: e.id,
      pubTime: new Date(e.pubTime),
      description: e.text,
      title: e.title,
      status: e.status,
      level: e.level,
      type: e.type,
      typeName: e.typeName,
      sender: e.sender,
    };
  });
};

const lifeIndexHandler = function (res: QLifeIndexs): ILifeIndexs {
  return res.map((e): ILifeIndex => {
    return {
      type: e.type,
      name: e.name.replace(/指数/, ''),
      level: Number(e.level),
      description: e.text,
    };
  });
};

const precipHandler = function (res: QPrecip): IPrecip {
  const p = res.minutely.every((e) => e.precip === '0.0');

  return {
    summary: res.summary,
    minutely: p
      ? []
      : res.minutely.map((e) => {
          return {
            dateTime: new Date(e.fxTime),
            value: parseFloat(e.precip),
          };
        }),
  };
};

const desc = function (i: string) {
  switch (i) {
    case '100':
      return 'sunny'; // 晴
    case '101':
      return 'cloudy'; // 多云
    case '102':
      return 'lessClouds'; // 少云
    case '103':
      return 'partlyCloudy'; // 晴间多云
    case '104':
      return 'overcast'; // 阴
    case '150':
      return 'sunny'; // 晴
    case '151':
      return 'cloudy'; // 多云
    case '152':
      return 'lessClouds'; // 少云
    case '153':
      return 'partlyCloudy'; // 晴间多云
    case '154':
      return 'overcast'; // 阴
    case '300':
      return 'shower'; // 阵雨
    case '301':
      return 'strongShower'; // 强阵雨
    case '302':
      return 'thunderstorm'; // 雷阵雨
    case '303':
      return 'strongThunderstorm'; // 强雷阵雨
    case '304':
      return 'thunderstormWithHail'; // 雷阵雨伴有冰雹
    case '305':
      return 'lightRain'; // 小雨
    case '306':
      return 'moderateRain'; // 中雨
    case '307':
      return 'heavyRain'; // 大雨
    case '308':
      return 'extremeRainfall'; // 极端降雨
    case '309':
      return 'drizzle'; // 毛毛雨/细雨
    case '310':
      return 'rainstorm'; // 暴雨
    case '311':
      return 'heavyRainstorm'; // 大暴雨
    case '312':
      return 'extraordinaryRainstorm'; // 特大暴雨
    case '313':
      return 'freezingRain'; // 冻雨
    case '314':
      return 'smallToModerateRain'; // 小到中雨
    case '315':
      return 'moderateToHeavyRain'; // 中到大雨
    case '316':
      return 'tooHeavyRain'; // 大到暴雨
    case '317':
      return 'heavyRainToHeavyRain'; // 暴雨到大暴雨
    case '318':
      return 'heavyRainstormToVeryHeavyRainstorm'; // 大暴雨到特大暴雨
    case '350':
      return 'shower'; // 阵雨
    case '351':
      return 'strongShower'; // 强阵雨
    case '399':
      return 'rain'; // 雨
    case '400':
      return 'lightSnow'; // 小雪
    case '401':
      return 'moderateSnow'; // 中雪
    case '402':
      return 'heavySnow'; // 大雪
    case '403':
      return 'snowstorm'; // 暴雪
    case '404':
      return 'sleet'; // 雨夹雪
    case '405':
      return 'rainAndSnow'; // 雨雪天气
    case '406':
      return 'showerAndSnow'; // 阵雨夹雪
    case '407':
      return 'snowShower'; // 阵雪
    case '408':
      return 'smallToModerateSnow'; // 小到中雪
    case '409':
      return 'moderateToHeavySnow'; // 中到大雪
    case '410':
      return 'tooHeavySnow'; // 大到暴雪
    case '456':
      return 'showerAndSnow'; // 阵雨夹雪
    case '457':
      return 'snowShower'; // 阵雪
    case '499':
      return 'snow'; // 雪
    case '500':
      return 'mist'; // 薄雾
    case '501':
      return 'fog'; // 雾
    case '502':
      return 'haze'; // 霾
    case '503':
      return 'shovelSand'; // 扬沙
    case '504':
      return 'dust'; // 浮尘
    case '507':
      return 'sandstorm'; // 沙尘暴
    case '508':
      return 'strongSandstorm'; // 强沙尘暴
    case '509':
      return 'denseFog'; // 浓雾
    case '510':
      return 'strongDenseFog'; // 强浓雾
    case '511':
      return 'moderateHaze'; // 中度霾
    case '512':
      return 'heavyhaze'; // 重度霾
    case '513':
      return 'severehaze'; // 严重霾
    case '514':
      return 'heavyFog'; // 大雾
    case '515':
      return 'veryHeavyFog'; // 特强浓雾
    case '900':
      return 'hot'; // 热
    case '901':
      return 'cold'; // 冷
    default:
      return 'unknown'; // 未知
  }
};

const hourlyHandler = function (res: QHourlys): IHourlys {
  return res.map((e): IHourly => {
    return {
      dateTime: new Date(e.fxTime),
      temperature: Number(e.temp),
      humidity: Number(e.humidity),
      precip: parseFloat(e.precip),
      pressure: Number(e.pressure),
      description: desc(e.icon),
      icon: e.icon,
      wind: {
        wind360: Number(e.wind360),
        windDir: windDir(Number(e.wind360)),
        windScale: e.windScale,
        windSpeed: Number(e.windSpeed),
      },
      clouds: Number(e.cloud),
      dewPoint: Number(e.dew),
      pop: Number(e.pop),
    };
  });
};

const dailyHandler = function (res: QDailys): IDailys {
  return res.map((e): IDaily => {
    return {
      dateTime: new Date(e.fxDate),
      sun: {
        sunrise: new Date(`${e.fxDate} ${e.sunrise}`),
        sunset: new Date(`${e.fxDate} ${e.sunset}`),
      },
      moon: {
        moonrise: new Date(`${e.fxDate} ${e.moonrise}`),
        moonset: new Date(`${e.fxDate} ${e.moonset}`),
        moonPhase: {
          icon: e.moonPhaseIcon,
          name: e.moonPhase,
        },
      },
      temperature: {
        max: Number(e.tempMax),
        min: Number(e.tempMin),
      },
      dayIcon: e.iconDay,
      dayDesc: desc(e.iconDay),
      dayWind: {
        wind360: Number(e.wind360Day),
        windDir: windDir(Number(e.wind360Day)),
        windScale: e.windScaleDay,
        windSpeed: Number(e.windSpeedDay),
      },
      nightIcon: e.iconNight,
      nightDesc: desc(e.iconNight),
      nightWind: {
        wind360: Number(e.wind360Night),
        windDir: windDir(Number(e.wind360Night)),
        windScale: e.windScaleNight,
        windSpeed: Number(e.windSpeedNight),
      },
      humidity: Number(e.humidity),
      precip: parseFloat(e.precip),
      pressure: Number(e.pressure),
      visibility: Number(e.vis),
      clouds: Number(e.cloud),
      uvIndex: Number(e.uvIndex),
    };
  });
};

const nowHandler = function (res: QNow): INow {
  return {
    dateTime: new Date(res.obsTime),
    temperature: Number(res.temp),
    feelsLike: Number(res.feelsLike),
    humidity: Number(res.humidity),
    precip: Number(res.precip),
    pressure: Number(res.pressure),
    description: desc(res.icon),
    icon: res.icon,
    wind: {
      wind360: Number(res.wind360),
      windDir: windDir(Number(res.wind360)),
      windScale: res.windScale,
      windSpeed: Number(res.windSpeed),
    },
    visibility: Number(res.vis),
    clouds: Number(res.cloud),
    dewPoint: Number(res.dew),
  };
};

export const qweatherHandler = function (res: QRes, loc: ILocation): IWeather {
  return {
    location: loc,
    air: aqiHandler(res[0]),
    sun: sunHandler(res[1]),
    moon: moonHandler(res[2]),
    warnings: warningHandler(res[3]),
    lifeIndexs: lifeIndexHandler(res[4]),
    precip: precipHandler(res[5]),
    hourlys: hourlyHandler(res[6]),
    dailys: dailyHandler(res[7]),
    now: nowHandler(res[8]),
  };
};
