// 引入 Mock 模块
import Mock from 'mockjs';

// qweather
import _Q_NOW_ from '@mock/qweather/nows.json';
import _Q_SEVEN_s from '@mock/qweather/sevendays.json';
import _Q_HOURS_ from '@mock/qweather/hours.json';
import _Q_MOON_PHASE_ from '@mock/qweather/moon.json';
import _Q_LIFE_ from '@mock/qweather/lifeIndex.json';
import _Q_WARNING_ from '@mock/qweather/warning.json';
import _Q_AIR_ from '@mock/qweather/air.json';
import _Q_RAIN_ from '@mock/qweather/rain.json';

// caiyun
import _C_ALL_ from '@mock/caiyun/all.json';

Mock.setup({
  timeout: '0',
});

// 彩云天气
Mock.mock(
  /https:\/\/api\.caiyunapp\.com\/v2\.6\/.+\/.+\/weather.*/,
  _C_ALL_
);

// 实时天气
Mock.mock(/https:\/\/devapi\.qweather\.com\/v7\/weather\/now.*/, {
  code: '200',
  updateTime: '2020-06-30T22:00+08:00',
  fxLink: 'http://hfx.link/2ax1',
  now: _Q_NOW_,
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
  daily: _Q_SEVEN_s,
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
  hourly: _Q_HOURS_,
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
  daily: _Q_LIFE_,
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
  warning: _Q_WARNING_,
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
  now: _Q_AIR_[0],
  station: _Q_AIR_[1],
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
  sunrise: '2022-06-30T21:58+08:00',
  sunset: '2022-07-01T04:57+08:00',
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
  moonrise: '2022-06-30T13:25+08:00',
  moonset: '2022-07-01T04:42+08:00',
  moonPhase: _Q_MOON_PHASE_,
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
  summary: '降雨还将持续 120 分钟',
  minutely: _Q_RAIN_,
  refer: {
    sources: ['Weather China'],
    license: ['commercial license'],
  },
});

