// 引入 Mock 模块
import Mock from 'mockjs';
// 引入 json 数据
import now from './nows.json';
import sevendays from './sevendays.json';
import hours from './hours.json';
import moon from './moon.json';
import lifeindex from './lifeIndex.json';
import warning from './warning.json';
import air from './air.json';

// 实时天气
Mock.mock('/weather/now', {
    code: 200,
    updateTime: "2020-06-30T22:00+08:00",
    fxLink: "http://hfx.link/2ax1",
    now: now,
    refer: {
        sources: [
            "Weather China"
        ],
        license: [
            "commercial license"
        ]
    }
})

// 未来7天
Mock.mock('/weather/7d', {
    code: 200,
    updateTime: "2021-11-15T16:35+08:00",
    fxLink: "http://hfx.link/2ax1",
    daily: sevendays,
    refer: {
        sources: [
            "QWeather",
            "NMC",
            "ECMWF"
        ],
        license: [
            "commercial license"
        ]
    }
})

// 未来24小时
Mock.mock('/weather/24h', {
    code: 200,
    updateTime: "2021-02-16T13:35+08:00",
    fxLink: "http://hfx.link/2ax1",
    hourly: hours,
    refer: {
        sources: [
            "Weather China"
        ],
        license: [
            "commercial license"
        ]
    }
})

// 生活指数
Mock.mock('/indices/1d', {
    code: 200,
    updateTime: "2021-02-06T16:36+08:00",
    fxLink: "http://hfx.link/2ax2",
    daily: lifeindex,
    refer: {
        sources: [
            "Weather China"
        ],
        license: [
            "commercial license"
        ]
    }
})

// 气象灾害
Mock.mock('/warning/now', {
    code: 200,
    updateTime: "2021-10-10T12:20+08:00",
    fxLink: "http://hfx.link/2ax5",
    warning: warning,
    refer: {
        sources: [
            "12379"
        ],
        license: [
            "commercial license"
        ]
    }
})

// AQI 指数
Mock.mock('/air/now', {
    code: 200,
    updateTime: "2021-02-16T14:42+08:00",
    fxLink: "http://hfx.link/2ax4",
    now: air[0],
    station: air[1],
    refer: {
        sources: [
            "cnemc"
        ],
        license: [
            "commercial license"
        ]
    }
})

// 日出日落
Mock.mock('/astronomy/sun', {
    code: 200,
    updateTime: "2021-02-17T11:00+08:00",
    fxLink: "http://hfx.link/2ax1",
    sunrise: "2021-02-20T06:58+08:00",
    sunset: "2021-02-20T17:57+08:00",
    refer: {
        sources: [
            "qweather.com"
        ],
        license: [
            "commercial license"
        ]
    }
})

// 月升月落
Mock.mock('astronomy/moon', {
    code: 200,
    updateTime: "2021-11-15T17:00+08:00",
    fxLink: "http://hfx.link/2ax1",
    moonrise: "2021-11-20T17:25+08:00",
    moonset: "2021-11-21T07:42+08:00",
    moonPhase: moon,
    refer: {
        sources: [
            "QWeather"
        ],
        license: [
            "commercial license"
        ]
    }
})