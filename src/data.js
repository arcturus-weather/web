// 实时天气
const now = {
    "code": "200",
    "updateTime": "2020-06-30T22:00+08:00",
    "fxLink": "http://hfx.link/2ax1",
    "now": {
        "obsTime": "2020-06-30T21:40+08:00",
        "temp": "24",
        "feelsLike": "26",
        "icon": "101",
        "text": "多云",
        "wind360": "123",
        "windDir": "东南风",
        "windScale": "1",
        "windSpeed": "3",
        "humidity": "72",
        "precip": "0.0",
        "pressure": "1003",
        "vis": "16",
        "cloud": "10",
        "dew": "21"
    },
    "refer": {
        "sources": [
            "Weather China"
        ],
        "license": [
            "commercial license"
        ]
    }
}

// 7 天天气
const sevendays = {
    "code": "200",
    "updateTime": "2021-11-15T16:35+08:00",
    "fxLink": "http://hfx.link/2ax1",
    "daily": [{
            "fxDate": "2021-11-15",
            "sunrise": "06:58",
            "sunset": "16:59",
            "moonrise": "15:16",
            "moonset": "03:40",
            "moonPhase": "盈凸月",
            "moonPhaseIcon": "803",
            "tempMax": "12",
            "tempMin": "-1",
            "iconDay": "101",
            "textDay": "多云",
            "iconNight": "150",
            "textNight": "晴",
            "wind360Day": "45",
            "windDirDay": "东北风",
            "windScaleDay": "1-2",
            "windSpeedDay": "3",
            "wind360Night": "0",
            "windDirNight": "北风",
            "windScaleNight": "1-2",
            "windSpeedNight": "3",
            "humidity": "65",
            "precip": "0.0",
            "pressure": "1020",
            "vis": "25",
            "cloud": "4",
            "uvIndex": "3"
        },
        {
            "fxDate": "2021-11-16",
            "sunrise": "07:00",
            "sunset": "16:58",
            "moonrise": "15:38",
            "moonset": "04:40",
            "moonPhase": "盈凸月",
            "moonPhaseIcon": "803",
            "tempMax": "13",
            "tempMin": "0",
            "iconDay": "100",
            "textDay": "晴",
            "iconNight": "101",
            "textNight": "多云",
            "wind360Day": "225",
            "windDirDay": "西南风",
            "windScaleDay": "1-2",
            "windSpeedDay": "3",
            "wind360Night": "225",
            "windDirNight": "西南风",
            "windScaleNight": "1-2",
            "windSpeedNight": "3",
            "humidity": "74",
            "precip": "0.0",
            "pressure": "1016",
            "vis": "25",
            "cloud": "1",
            "uvIndex": "3"
        },
        {
            "fxDate": "2021-11-17",
            "sunrise": "07:01",
            "sunset": "16:57",
            "moonrise": "16:01",
            "moonset": "05:41",
            "moonPhase": "盈凸月",
            "moonPhaseIcon": "803",
            "tempMax": "13",
            "tempMin": "0",
            "iconDay": "100",
            "textDay": "晴",
            "iconNight": "150",
            "textNight": "晴",
            "wind360Day": "225",
            "windDirDay": "西南风",
            "windScaleDay": "1-2",
            "windSpeedDay": "3",
            "wind360Night": "225",
            "windDirNight": "西南风",
            "windScaleNight": "1-2",
            "windSpeedNight": "3",
            "humidity": "56",
            "precip": "0.0",
            "pressure": "1009",
            "vis": "25",
            "cloud": "0",
            "uvIndex": "3"
        }
    ],
    "refer": {
        "sources": [
            "QWeather",
            "NMC",
            "ECMWF"
        ],
        "license": [
            "commercial license"
        ]
    }
}

const hour = {
    "code": "200",
    "updateTime": "2021-02-16T13:35+08:00",
    "fxLink": "http://hfx.link/2ax1",
    "hourly": [{
            "fxTime": "2021-02-16T15:00+08:00",
            "temp": "2",
            "icon": "100",
            "text": "晴",
            "wind360": "335",
            "windDir": "西北风",
            "windScale": "3-4",
            "windSpeed": "20",
            "humidity": "11",
            "pop": "0",
            "precip": "0.0",
            "pressure": "1025",
            "cloud": "0",
            "dew": "-25"
        },
        {
            "fxTime": "2021-02-16T16:00+08:00",
            "temp": "1",
            "icon": "100",
            "text": "晴",
            "wind360": "339",
            "windDir": "西北风",
            "windScale": "3-4",
            "windSpeed": "24",
            "humidity": "11",
            "pop": "0",
            "precip": "0.0",
            "pressure": "1025",
            "cloud": "0",
            "dew": "-26"
        },
        {
            "fxTime": "2021-02-16T17:00+08:00",
            "temp": "0",
            "icon": "100",
            "text": "晴",
            "wind360": "341",
            "windDir": "西北风",
            "windScale": "4-5",
            "windSpeed": "25",
            "humidity": "11",
            "pop": "0",
            "precip": "0.0",
            "pressure": "1026",
            "cloud": "0",
            "dew": "-26"
        },
        {
            "fxTime": "2021-02-16T18:00+08:00",
            "temp": "0",
            "icon": "150",
            "text": "晴",
            "wind360": "344",
            "windDir": "西北风",
            "windScale": "4-5",
            "windSpeed": "25",
            "humidity": "12",
            "pop": "0",
            "precip": "0.0",
            "pressure": "1025",
            "cloud": "0",
            "dew": "-27"
        },
        {
            "fxTime": "2021-02-16T19:00+08:00",
            "temp": "-2",
            "icon": "150",
            "text": "晴",
            "wind360": "349",
            "windDir": "西北风",
            "windScale": "3-4",
            "windSpeed": "24",
            "humidity": "13",
            "pop": "0",
            "precip": "0.0",
            "pressure": "1025",
            "cloud": "0",
            "dew": "-27"
        },
        {
            "fxTime": "2021-02-16T20:00+08:00",
            "temp": "-3",
            "icon": "150",
            "text": "晴",
            "wind360": "353",
            "windDir": "北风",
            "windScale": "3-4",
            "windSpeed": "22",
            "humidity": "14",
            "pop": "0",
            "precip": "0.0",
            "pressure": "1025",
            "cloud": "0",
            "dew": "-27"
        },
        {
            "fxTime": "2021-02-16T21:00+08:00",
            "temp": "-3",
            "icon": "150",
            "text": "晴",
            "wind360": "355",
            "windDir": "北风",
            "windScale": "3-4",
            "windSpeed": "20",
            "humidity": "14",
            "pop": "0",
            "precip": "0.0",
            "pressure": "1026",
            "cloud": "0",
            "dew": "-27"
        },
        {
            "fxTime": "2021-02-16T22:00+08:00",
            "temp": "-4",
            "icon": "150",
            "text": "晴",
            "wind360": "356",
            "windDir": "北风",
            "windScale": "3-4",
            "windSpeed": "18",
            "humidity": "16",
            "pop": "0",
            "precip": "0.0",
            "pressure": "1026",
            "cloud": "0",
            "dew": "-27"
        },
        {
            "fxTime": "2021-02-16T23:00+08:00",
            "temp": "-4",
            "icon": "150",
            "text": "晴",
            "wind360": "356",
            "windDir": "北风",
            "windScale": "3-4",
            "windSpeed": "18",
            "humidity": "16",
            "pop": "0",
            "precip": "0.0",
            "pressure": "1026",
            "cloud": "0",
            "dew": "-27"
        },
        {
            "fxTime": "2021-02-17T00:00+08:00",
            "temp": "-4",
            "icon": "150",
            "text": "晴",
            "wind360": "354",
            "windDir": "北风",
            "windScale": "3-4",
            "windSpeed": "16",
            "humidity": "16",
            "pop": "0",
            "precip": "0.0",
            "pressure": "1027",
            "cloud": "0",
            "dew": "-27"
        },
        {
            "fxTime": "2021-02-17T01:00+08:00",
            "temp": "-4",
            "icon": "150",
            "text": "晴",
            "wind360": "351",
            "windDir": "北风",
            "windScale": "3-4",
            "windSpeed": "16",
            "humidity": "16",
            "pop": "0",
            "precip": "0.0",
            "pressure": "1028",
            "cloud": "0",
            "dew": "-27"
        },
        {
            "fxTime": "2021-02-17T02:00+08:00",
            "temp": "-4",
            "icon": "150",
            "text": "晴",
            "wind360": "350",
            "windDir": "北风",
            "windScale": "3-4",
            "windSpeed": "16",
            "humidity": "16",
            "pop": "0",
            "precip": "0.0",
            "pressure": "1028",
            "cloud": "0",
            "dew": "-27"
        },
        {
            "fxTime": "2021-02-17T03:00+08:00",
            "temp": "-5",
            "icon": "150",
            "text": "晴",
            "wind360": "350",
            "windDir": "北风",
            "windScale": "3-4",
            "windSpeed": "16",
            "humidity": "16",
            "pop": "0",
            "precip": "0.0",
            "pressure": "1028",
            "cloud": "0",
            "dew": "-27"
        },
        {
            "fxTime": "2021-02-17T04:00+08:00",
            "temp": "-5",
            "icon": "150",
            "text": "晴",
            "wind360": "351",
            "windDir": "北风",
            "windScale": "3-4",
            "windSpeed": "16",
            "humidity": "15",
            "pop": "0",
            "precip": "0.0",
            "pressure": "1027",
            "cloud": "0",
            "dew": "-28"
        },
        {
            "fxTime": "2021-02-17T05:00+08:00",
            "temp": "-5",
            "icon": "150",
            "text": "晴",
            "wind360": "352",
            "windDir": "北风",
            "windScale": "3-4",
            "windSpeed": "16",
            "humidity": "14",
            "pop": "0",
            "precip": "0.0",
            "pressure": "1026",
            "cloud": "0",
            "dew": "-29"
        },
        {
            "fxTime": "2021-02-17T06:00+08:00",
            "temp": "-5",
            "icon": "150",
            "text": "晴",
            "wind360": "355",
            "windDir": "北风",
            "windScale": "3-4",
            "windSpeed": "14",
            "humidity": "16",
            "pop": "0",
            "precip": "0.0",
            "pressure": "1025",
            "cloud": "0",
            "dew": "-27"
        },
        {
            "fxTime": "2021-02-17T07:00+08:00",
            "temp": "-7",
            "icon": "150",
            "text": "晴",
            "wind360": "359",
            "windDir": "北风",
            "windScale": "3-4",
            "windSpeed": "16",
            "humidity": "20",
            "pop": "0",
            "precip": "0.0",
            "pressure": "1024",
            "cloud": "0",
            "dew": "-26"
        },
        {
            "fxTime": "2021-02-17T08:00+08:00",
            "temp": "-5",
            "icon": "100",
            "text": "晴",
            "wind360": "1",
            "windDir": "北风",
            "windScale": "3-4",
            "windSpeed": "14",
            "humidity": "19",
            "pop": "0",
            "precip": "0.0",
            "pressure": "1023",
            "cloud": "0",
            "dew": "-26"
        },
        {
            "fxTime": "2021-02-17T09:00+08:00",
            "temp": "-4",
            "icon": "100",
            "text": "晴",
            "wind360": "356",
            "windDir": "北风",
            "windScale": "3-4",
            "windSpeed": "14",
            "humidity": "17",
            "pop": "0",
            "precip": "0.0",
            "pressure": "1023",
            "cloud": "0",
            "dew": "-25"
        },
        {
            "fxTime": "2021-02-17T10:00+08:00",
            "temp": "-1",
            "icon": "100",
            "text": "晴",
            "wind360": "344",
            "windDir": "西北风",
            "windScale": "3-4",
            "windSpeed": "14",
            "humidity": "14",
            "pop": "0",
            "precip": "0.0",
            "pressure": "1024",
            "cloud": "0",
            "dew": "-26"
        },
        {
            "fxTime": "2021-02-17T11:00+08:00",
            "temp": "0",
            "icon": "100",
            "text": "晴",
            "wind360": "333",
            "windDir": "西北风",
            "windScale": "3-4",
            "windSpeed": "14",
            "humidity": "12",
            "pop": "0",
            "precip": "0.0",
            "pressure": "1024",
            "cloud": "0",
            "dew": "-26"
        },
        {
            "fxTime": "2021-02-17T12:00+08:00",
            "temp": "1",
            "icon": "100",
            "text": "晴",
            "wind360": "325",
            "windDir": "西北风",
            "windScale": "3-4",
            "windSpeed": "14",
            "humidity": "10",
            "pop": "0",
            "precip": "0.0",
            "pressure": "1025",
            "cloud": "16",
            "dew": "-28"
        },
        {
            "fxTime": "2021-02-17T13:00+08:00",
            "temp": "2",
            "icon": "100",
            "text": "晴",
            "wind360": "319",
            "windDir": "西北风",
            "windScale": "3-4",
            "windSpeed": "16",
            "humidity": "8",
            "pop": "0",
            "precip": "0.0",
            "pressure": "1025",
            "cloud": "32",
            "dew": "-29"
        },
        {
            "fxTime": "2021-02-17T14:00+08:00",
            "temp": "2",
            "icon": "100",
            "text": "晴",
            "wind360": "313",
            "windDir": "西北风",
            "windScale": "3-4",
            "windSpeed": "16",
            "humidity": "9",
            "pop": "0",
            "precip": "0.0",
            "pressure": "1025",
            "cloud": "48",
            "dew": "-27"
        }
    ],
    "refer": {
        "sources": [
            "Weather China"
        ],
        "license": [
            "commercial license"
        ]
    }
}

// 生活指数
const liveindex = {
    "code": "200",
    "updateTime": "2021-02-06T16:36+08:00",
    "fxLink": "http://hfx.link/2ax2",
    "daily": [{
            "date": "2021-02-06",
            "type": "2",
            "name": "洗车指数",
            "level": "2",
            "category": "较适宜",
            "text": "较适宜洗车，未来一天无雨，风力较小，擦洗一新的汽车至少能保持一天。"
        },
        {
            "date": "2021-02-06",
            "type": "1",
            "name": "运动指数",
            "level": "3",
            "category": "较不宜",
            "text": "天气较好，但考虑天气寒冷，推荐您进行室内运动，户外运动时请注意保暖并做好准备活动。"
        }
    ],
    "refer": {
        "sources": [
            "Weather China"
        ],
        "license": [
            "commercial license"
        ]
    }
}


// 灾害预警
const disaster = {
    "code": "200",
    "updateTime": "2021-10-10T12:20+08:00",
    "fxLink": "http://hfx.link/2ax5",
    "warning": [{
        "id": "10101010020211009154607668935939",
        "sender": "北京市气象局",
        "pubTime": "2021-10-09T15:46+08:00",
        "title": "北京市气象台2021年10月09日15时40分发布大风蓝色预警信号",
        "startTime": "2021-10-09T15:40+08:00",
        "endTime": "2021-10-10T15:40+08:00",
        "status": "active",
        "level": "蓝色",
        "type": "11B06",
        "typeName": "大风",
        "text": "市气象台2021年10月9日15时40分发布大风蓝色预警信号：预计，9日22时至10日19时，本市大部分地区有4级左右偏北风，阵风6、7级，山区阵风可达8级左右，请注意防范。",
        "related": ""
    }],
    "refer": {
        "sources": [
            "12379"
        ],
        "license": [
            "commercial license"
        ]
    }
}

// 实时空气质量
const AQI = {
    "code": "200",
    "updateTime": "2021-02-16T14:42+08:00",
    "fxLink": "http://hfx.link/2ax4",
    "now": {
        "pubTime": "2021-02-16T14:00+08:00",
        "aqi": "28",
        "level": "1",
        "category": "优",
        "primary": "NA",
        "pm10": "28",
        "pm2p5": "5",
        "no2": "3",
        "so2": "2",
        "co": "0.2",
        "o3": "76"
    },
    "station": [{
            "pubTime": "2021-02-16T14:00+08:00",
            "name": "密云镇",
            "id": "CNA3697",
            "aqi": "20",
            "level": "1",
            "category": "优",
            "primary": "NA",
            "pm10": "4",
            "pm2p5": "4",
            "no2": "4",
            "so2": "3",
            "co": "0.2",
            "o3": "63"
        },
        {
            "pubTime": "2021-02-16T14:00+08:00",
            "name": "丰台小屯",
            "id": "CNA3696",
            "aqi": "57",
            "level": "2",
            "category": "良",
            "primary": "PM10",
            "pm10": "63",
            "pm2p5": "6",
            "no2": "4",
            "so2": "2",
            "co": "0.2",
            "o3": "73"
        },
        {
            "pubTime": "2021-02-16T14:00+08:00",
            "name": "怀柔新城",
            "id": "CNA3695",
            "aqi": "25",
            "level": "1",
            "category": "优",
            "primary": "NA",
            "pm10": "7",
            "pm2p5": "3",
            "no2": "2",
            "so2": "3",
            "co": "0.1",
            "o3": "78"
        },
        {
            "pubTime": "2021-02-16T14:00+08:00",
            "name": "延庆石河营",
            "id": "CNA3694",
            "aqi": "26",
            "level": "1",
            "category": "优",
            "primary": "NA",
            "pm10": "15",
            "pm2p5": "3",
            "no2": "4",
            "so2": "2",
            "co": "0.4",
            "o3": "83"
        },
        {
            "pubTime": "2021-02-16T14:00+08:00",
            "name": "大兴旧宫",
            "id": "CNA3675",
            "aqi": "31",
            "level": "1",
            "category": "优",
            "primary": "NA",
            "pm10": "31",
            "pm2p5": "5",
            "no2": "2",
            "so2": "1",
            "co": "0.2",
            "o3": "73"
        },
        {
            "pubTime": "2021-02-16T14:00+08:00",
            "name": "房山燕山",
            "id": "CNA3674",
            "aqi": "26",
            "level": "1",
            "category": "优",
            "primary": "NA",
            "pm10": "19",
            "pm2p5": "4",
            "no2": "3",
            "so2": "4",
            "co": "0.2",
            "o3": "83"
        },
        {
            "pubTime": "2021-02-16T14:00+08:00",
            "name": "通州东关",
            "id": "CNA3673",
            "aqi": "22",
            "level": "1",
            "category": "优",
            "primary": "NA",
            "pm10": "15",
            "pm2p5": "4",
            "no2": "1",
            "so2": "3",
            "co": "0.3",
            "o3": "70"
        },
        {
            "pubTime": "2021-02-16T14:00+08:00",
            "name": "丰台云岗",
            "id": "CNA3672",
            "aqi": "45",
            "level": "1",
            "category": "优",
            "primary": "NA",
            "pm10": "45",
            "pm2p5": "5",
            "no2": "1",
            "so2": "1",
            "co": "0.2",
            "o3": "82"
        },
        {
            "pubTime": "2021-02-16T14:00+08:00",
            "name": "门头沟三家店",
            "id": "CNA3671",
            "aqi": "66",
            "level": "2",
            "category": "良",
            "primary": "PM10",
            "pm10": "82",
            "pm2p5": "6",
            "no2": "2",
            "so2": "1",
            "co": "0.2",
            "o3": "76"
        },
        {
            "pubTime": "2021-02-16T14:00+08:00",
            "name": "密云新城",
            "id": "CNA3418",
            "aqi": "23",
            "level": "1",
            "category": "优",
            "primary": "NA",
            "pm10": "11",
            "pm2p5": "3",
            "no2": "2",
            "so2": "3",
            "co": "0.2",
            "o3": "73"
        },
        {
            "pubTime": "2021-02-16T14:00+08:00",
            "name": "平谷新城",
            "id": "CNA3417",
            "aqi": "24",
            "level": "1",
            "category": "优",
            "primary": "NA",
            "pm10": "7",
            "pm2p5": "3",
            "no2": "1",
            "so2": "2",
            "co": "0.2",
            "o3": "74"
        },
        {
            "pubTime": "2021-02-16T14:00+08:00",
            "name": "延庆夏都",
            "id": "CNA3281",
            "aqi": "25",
            "level": "1",
            "category": "优",
            "primary": "NA",
            "pm10": "15",
            "pm2p5": "3",
            "no2": "2",
            "so2": "1",
            "co": "0.2",
            "o3": "80"
        },
        {
            "pubTime": "2021-02-16T14:00+08:00",
            "name": "古城",
            "id": "CNA1012",
            "aqi": "56",
            "level": "2",
            "category": "良",
            "primary": "PM10",
            "pm10": "61",
            "pm2p5": "8",
            "no2": "2",
            "so2": "1",
            "co": "0.2",
            "o3": "76"
        },
        {
            "pubTime": "2021-02-16T14:00+08:00",
            "name": "奥体中心",
            "id": "CNA1011",
            "aqi": "24",
            "level": "1",
            "category": "优",
            "primary": "NA",
            "pm10": "23",
            "pm2p5": "3",
            "no2": "4",
            "so2": "2",
            "co": "0.2",
            "o3": "74"
        },
        {
            "pubTime": "2021-02-16T14:00+08:00",
            "name": "昌平镇",
            "id": "CNA1010",
            "aqi": "24",
            "level": "1",
            "category": "优",
            "primary": "NA",
            "pm10": "17",
            "pm2p5": "5",
            "no2": "2",
            "so2": "1",
            "co": "0.2",
            "o3": "75"
        },
        {
            "pubTime": "2021-02-16T14:00+08:00",
            "name": "怀柔镇",
            "id": "CNA1009",
            "aqi": "25",
            "level": "1",
            "category": "优",
            "primary": "NA",
            "pm10": "10",
            "pm2p5": "8",
            "no2": "2",
            "so2": "3",
            "co": "0.2",
            "o3": "77"
        },
        {
            "pubTime": "2021-02-16T14:00+08:00",
            "name": "顺义新城",
            "id": "CNA1008",
            "aqi": "33",
            "level": "1",
            "category": "优",
            "primary": "NA",
            "pm10": "33",
            "pm2p5": "5",
            "no2": "1",
            "so2": "3",
            "co": "0.2",
            "o3": "73"
        },
        {
            "pubTime": "2021-02-16T14:00+08:00",
            "name": "海淀区万柳",
            "id": "CNA1007",
            "aqi": "34",
            "level": "1",
            "category": "优",
            "primary": "NA",
            "pm10": "34",
            "pm2p5": "6",
            "no2": "6",
            "so2": "1",
            "co": "0.2",
            "o3": "75"
        },
        {
            "pubTime": "2021-02-16T14:00+08:00",
            "name": "官园",
            "id": "CNA1006",
            "aqi": "25",
            "level": "1",
            "category": "优",
            "primary": "NA",
            "pm10": "25",
            "pm2p5": "5",
            "no2": "4",
            "so2": "3",
            "co": "0.2",
            "o3": "78"
        },
        {
            "pubTime": "2021-02-16T14:00+08:00",
            "name": "农展馆",
            "id": "CNA1005",
            "aqi": "28",
            "level": "1",
            "category": "优",
            "primary": "NA",
            "pm10": "28",
            "pm2p5": "4",
            "no2": "2",
            "so2": "3",
            "co": "0.2",
            "o3": "85"
        },
        {
            "pubTime": "2021-02-16T14:00+08:00",
            "name": "天坛",
            "id": "CNA1004",
            "aqi": "29",
            "level": "1",
            "category": "优",
            "primary": "NA",
            "pm10": "29",
            "pm2p5": "10",
            "no2": "2",
            "so2": "1",
            "co": "0.2",
            "o3": "78"
        },
        {
            "pubTime": "2021-02-16T14:00+08:00",
            "name": "东四",
            "id": "CNA1003",
            "aqi": "30",
            "level": "1",
            "category": "优",
            "primary": "NA",
            "pm10": "30",
            "pm2p5": "7",
            "no2": "2",
            "so2": "3",
            "co": "0.1",
            "o3": "80"
        },
        {
            "pubTime": "2021-02-16T14:00+08:00",
            "name": "定陵",
            "id": "CNA1002",
            "aqi": "23",
            "level": "1",
            "category": "优",
            "primary": "NA",
            "pm10": "22",
            "pm2p5": "3",
            "no2": "2",
            "so2": "1",
            "co": "0.2",
            "o3": "73"
        },
        {
            "pubTime": "2021-02-16T14:00+08:00",
            "name": "万寿西宫",
            "id": "CNA1001",
            "aqi": "29",
            "level": "1",
            "category": "优",
            "primary": "NA",
            "pm10": "29",
            "pm2p5": "5",
            "no2": "3",
            "so2": "1",
            "co": "0.3",
            "o3": "75"
        }
    ],
    "refer": {
        "sources": [
            "cnemc"
        ],
        "license": [
            "commercial license"
        ]
    }
}

// 日出日落
const sun = {
    "code": "200",
    "updateTime": "2021-02-17T11:00+08:00",
    "fxLink": "http://hfx.link/2ax1",
    "sunrise": "2021-02-20T06:58+08:00",
    "sunset": "2021-02-20T17:57+08:00",
    "refer": {
        "sources": [
            "qweather.com"
        ],
        "license": [
            "commercial license"
        ]
    }
}

// 月相
const moon = {
    "code": "200",
    "updateTime": "2021-11-15T17:00+08:00",
    "fxLink": "http://hfx.link/2ax1",
    "moonrise": "2021-11-20T17:25+08:00",
    "moonset": "2021-11-21T07:42+08:00",
    "moonPhase": [{
            "fxTime": "2021-11-20T00:00+08:00",
            "value": "0.51",
            "name": "亏凸月",
            "illumination": "100",
            "icon": "805"
        },
        {
            "fxTime": "2021-11-20T01:00+08:00",
            "value": "0.51",
            "name": "亏凸月",
            "illumination": "100",
            "icon": "805"
        },
        {
            "fxTime": "2021-11-20T02:00+08:00",
            "value": "0.51",
            "name": "亏凸月",
            "illumination": "100",
            "icon": "805"
        },
        {
            "fxTime": "2021-11-20T03:00+08:00",
            "value": "0.51",
            "name": "亏凸月",
            "illumination": "100",
            "icon": "805"
        },
        {
            "fxTime": "2021-11-20T04:00+08:00",
            "value": "0.52",
            "name": "亏凸月",
            "illumination": "100",
            "icon": "805"
        },
        {
            "fxTime": "2021-11-20T05:00+08:00",
            "value": "0.52",
            "name": "亏凸月",
            "illumination": "100",
            "icon": "805"
        },
        {
            "fxTime": "2021-11-20T06:00+08:00",
            "value": "0.52",
            "name": "亏凸月",
            "illumination": "100",
            "icon": "805"
        },
        {
            "fxTime": "2021-11-20T07:00+08:00",
            "value": "0.52",
            "name": "亏凸月",
            "illumination": "100",
            "icon": "805"
        },
        {
            "fxTime": "2021-11-20T08:00+08:00",
            "value": "0.52",
            "name": "亏凸月",
            "illumination": "100",
            "icon": "805"
        },
        {
            "fxTime": "2021-11-20T09:00+08:00",
            "value": "0.52",
            "name": "亏凸月",
            "illumination": "100",
            "icon": "805"
        },
        {
            "fxTime": "2021-11-20T10:00+08:00",
            "value": "0.52",
            "name": "亏凸月",
            "illumination": "99",
            "icon": "805"
        },
        {
            "fxTime": "2021-11-20T11:00+08:00",
            "value": "0.52",
            "name": "亏凸月",
            "illumination": "99",
            "icon": "805"
        },
        {
            "fxTime": "2021-11-20T12:00+08:00",
            "value": "0.53",
            "name": "亏凸月",
            "illumination": "99",
            "icon": "805"
        },
        {
            "fxTime": "2021-11-20T13:00+08:00",
            "value": "0.53",
            "name": "亏凸月",
            "illumination": "99",
            "icon": "805"
        },
        {
            "fxTime": "2021-11-20T14:00+08:00",
            "value": "0.53",
            "name": "亏凸月",
            "illumination": "99",
            "icon": "805"
        },
        {
            "fxTime": "2021-11-20T15:00+08:00",
            "value": "0.53",
            "name": "亏凸月",
            "illumination": "99",
            "icon": "805"
        },
        {
            "fxTime": "2021-11-20T16:00+08:00",
            "value": "0.53",
            "name": "亏凸月",
            "illumination": "99",
            "icon": "805"
        },
        {
            "fxTime": "2021-11-20T17:00+08:00",
            "value": "0.53",
            "name": "亏凸月",
            "illumination": "99",
            "icon": "805"
        },
        {
            "fxTime": "2021-11-20T18:00+08:00",
            "value": "0.53",
            "name": "亏凸月",
            "illumination": "99",
            "icon": "805"
        },
        {
            "fxTime": "2021-11-20T19:00+08:00",
            "value": "0.53",
            "name": "亏凸月",
            "illumination": "99",
            "icon": "805"
        },
        {
            "fxTime": "2021-11-20T20:00+08:00",
            "value": "0.54",
            "name": "亏凸月",
            "illumination": "99",
            "icon": "805"
        },
        {
            "fxTime": "2021-11-20T21:00+08:00",
            "value": "0.54",
            "name": "亏凸月",
            "illumination": "99",
            "icon": "805"
        },
        {
            "fxTime": "2021-11-20T22:00+08:00",
            "value": "0.54",
            "name": "亏凸月",
            "illumination": "99",
            "icon": "805"
        },
        {
            "fxTime": "2021-11-20T23:00+08:00",
            "value": "0.54",
            "name": "亏凸月",
            "illumination": "98",
            "icon": "805"
        }
    ],
    "refer": {
        "sources": [
            "QWeather"
        ],
        "license": [
            "commercial license"
        ]
    }
}

export {
    now,
    sevendays,
    hour,
    liveindex,
    disaster,
    AQI,
    sun,
    moon
}