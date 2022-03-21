// 引入 Mock 模块
import Mock from 'mockjs';

/***********************
 *   和风天气模拟数据   *
 **********************/
import now from '../mock/qweather/nows.json';
import sevenDays from '../mock/qweather/sevendays.json';
import hours from '../mock/qweather/hours.json';
import moonPhase from '../mock/qweather/moon.json';
import lifeindex from '../mock/qweather/lifeIndex.json';
import warning from '../mock/qweather/warning.json';
import air from '../mock/qweather/air.json';
import rain from '../mock/qweather/rain.json';
import geo from '../mock/qweather/geo.json';

/***********************
 * openWeather 模拟数据 *
 **********************/
import oneCall from '../mock/openWeather/onecall.json';
import weather from '../mock/openWeather/weather.json';
import air_ from '../mock/openWeather/air.json';
import airForcast from '../mock/openWeather/airForcast.json';
import forcast from '../mock/openWeather/forcast.json';

Mock.setup({
  timeout: '0',
});

// 实时天气
Mock.mock(/https:\/\/devapi\.qweather\.com\/v7\/weather\/now.*/, {
  code: '200',
  updateTime: '2020-06-30T22:00+08:00',
  fxLink: 'http://hfx.link/2ax1',
  now: now,
  refer: {
    sources: ['Weather China'],
    license: ['commercial license'],
  },
});

// 未来7天
Mock.mock(/https:\/\/devapi\.qweather\.com\/v7\/weather\/7d.*/g, {
  code: '200',
  updateTime: '2021-11-15T16:35+08:00',
  fxLink: 'http://hfx.link/2ax1',
  daily: sevenDays,
  refer: {
    sources: ['QWeather', 'NMC', 'ECMWF'],
    license: ['commercial license'],
  },
});

// 未来24小时
Mock.mock(/https:\/\/devapi\.qweather\.com\/v7\/weather\/24h/g, {
  code: '200',
  updateTime: '2021-02-16T13:35+08:00',
  fxLink: 'http://hfx.link/2ax1',
  hourly: hours,
  refer: {
    sources: ['Weather China'],
    license: ['commercial license'],
  },
});

// 生活指数
Mock.mock(/https:\/\/devapi\.qweather\.com\/v7\/indices\/1d/g, {
  code: '200',
  updateTime: '2021-02-06T16:36+08:00',
  fxLink: 'http://hfx.link/2ax2',
  daily: lifeindex,
  refer: {
    sources: ['Weather China'],
    license: ['commercial license'],
  },
});

// 气象灾害
Mock.mock(/https:\/\/devapi\.qweather\.com\/v7\/warning\/now.*/g, {
  code: '200',
  updateTime: '2021-10-10T12:20+08:00',
  fxLink: 'http://hfx.link/2ax5',
  warning: warning,
  refer: {
    sources: ['12379'],
    license: ['commercial license'],
  },
});

// AQI 指数
Mock.mock(/https:\/\/devapi\.qweather\.com\/v7\/air\/now.*/g, {
  code: '200',
  updateTime: '2021-02-16T14:42+08:00',
  fxLink: 'http://hfx.link/2ax4',
  now: air[0],
  station: air[1],
  refer: {
    sources: ['cnemc'],
    license: ['commercial license'],
  },
});

// 日出日落
Mock.mock(/https:\/\/devapi\.qweather\.com\/v7\/astronomy\/sun,*/g, {
  code: '200',
  updateTime: '2021-02-17T11:00+08:00',
  fxLink: 'http://hfx.link/2ax1',
  sunrise: '2022-03-20T06:58+08:00',
  sunset: '2022-03-20T17:57+08:00',
  refer: {
    sources: ['qweather.com'],
    license: ['commercial license'],
  },
});

// 月升月落
Mock.mock(/https:\/\/devapi\.qweather\.com\/v7\/astronomy\/moon.*/g, {
  code: '200',
  updateTime: '2022-11-15T17:00+08:00',
  fxLink: 'http://hfx.link/2ax1',
  moonrise: '2022-03-20T08:25+08:00',
  moonset: '2022-03-20T21:42+08:00',
  moonPhase: moonPhase,
  refer: {
    sources: ['QWeather'],
    license: ['commercial license'],
  },
});

// 两小时内降水
Mock.mock(/https:\/\/devapi\.qweather\.com\/v7\/minutely\/5m.*/g, {
  code: '200',
  updateTime: '2020-08-09T16:30+08:00',
  fxLink: 'http://hfx.link/1',
  summary: '降雨还将持续120分钟',
  minutely: rain,
  refer: {
    sources: ['Weather China'],
    license: ['commercial license'],
  },
});

// 城市查询
Mock.mock(/https:\/\/geoapi\.qweather\.com\/v2\/city\/lookup.*/g, {
  code: '200',
  location: geo,
  refer: {
    sources: ['qweather.com'],
    license: ['commercial license'],
  },
});

// 一次调用
Mock.mock(/http:\/\/api\.openweathermap\.org\/data\/2\.5\/onecall.*/g, oneCall);

// 当前天气
Mock.mock(
  /http:\/\/api\.openweathermap\.org\/data\/2\.5\/\weather.*/g,
  weather
);

// 5 天 3 小时预测
Mock.mock(
  /http:\/\/api\.openweathermap\.org\/data\/2\.5\/forecast.*/g,
  forcast
);

// 空气污染
Mock.mock(
  /http:\/\/api\.openweathermap\.org\/data\/2\.5\/air_pollution.*/g,
  air_
);

// 空气污染预测
Mock.mock(
  /http:\/\/api\.openweathermap\.org\/data\/2\.5\/air_pollution\/forecast.*/g,
  airForcast
);
