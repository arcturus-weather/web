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
      co: Number(res.co),
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

const moonHandler = function (res: QMoon): IMoon {
  return {
    moonrise: res.moonrise === '' ? undefined : new Date(res.moonrise),
    moonset: res.moonset === '' ? undefined : new Date(res.moonset),
    moonPhase: res.moonPhase.map((e): IMoonPhase => {
      return {
        dateTime: new Date(e.fxTime),
        value: Number(e.value),
        name: e.name,
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
  return res.map((e) => {
    return {
      type: Number(e.type),
      name: e.name.replace(/指数/, ''),
      level: Number(e.level),
      category: e.category,
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

const hourlyHandler = function (res: QHourlys): IHourlys {
  return res.map((e): IHourly => {
    return {
      dateTime: new Date(e.fxTime),
      temperature: Number(e.temp),
      humidity: Number(e.humidity),
      precip: parseFloat(e.precip),
      pressure: Number(e.pressure),
      description: e.text,
      icon: e.icon,
      wind: {
        wind360: Number(e.wind360),
        windDir: e.windDir,
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
      dayDesc: e.textDay,
      dayWind: {
        wind360: Number(e.wind360Day),
        windDir: e.windDirDay,
        windScale: e.windScaleDay,
        windSpeed: Number(e.windSpeedDay),
      },
      nightIcon: e.iconNight,
      nightDesc: e.textNight,
      nightWind: {
        wind360: Number(e.wind360Night),
        windDir: e.windDirNight,
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
    description: res.text,
    icon: res.icon,
    wind: {
      wind360: Number(res.wind360),
      windDir: res.windDir,
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
