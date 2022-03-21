import { defineStore } from 'pinia';
import { qWeatherCode } from '../utils/weather/qWeatherCode';
import Pollutions from '../utils/weather/aqi/pollutions';
import Waring from '../utils/weather/waring';
import { getAqiColor } from '../utils/weather/aqi/aqi';
import notify from '../utils/notify';

/***********************
 *     自定义API等      *
 **********************/
// import openWeather from "./utils/weather/openweather";
import { qqMap } from '../utils/location/qqMap';
import qweather from '../utils/weather/qweather';

export const useLoading = defineStore('loading', {
  actions: {
    changeLoading(bool) {
      this.loading = bool;
    },
  },
  state: () => ({
    loading: true,
  }),
});

export const useLocation = defineStore('location', {
  state: () => ({
    lat: 39.90873531368645, // 地图默认的纬度
    lng: 116.39749435302588, // 地图默认的经度
    city: '', // 市
    addr: '', // 具体地址
    district: '', // 区
    province: '', // 省
  }),
  actions: {
    // 获取经纬度及城市信息
    getAddr() {
      return new Promise((resolve, reject) => {
        qqMap
          .addressInfo()
          .then(res => {
            this.$patch({ ...res });
            const { lat, lng } = res;
            resolve({ lat, lng });
          })
          .catch(err => {
            reject(err);
          });
      });
    },
    changeLocation(
      lat = 39.90873531368645,
      lng = 116.39749435302588,
      addr = '',
      city = '',
      district = '',
      province = ''
    ) {
      this.$patch({ lat, lng, city, addr, district, province });
    },
  },
});

export const useWeather = defineStore('weather', {
  state: () => ({
    weathers: {}, // 天气对象
    uuid: '', // 当前天气的 uuid
    weatherType: 'sun', // 天气类型
    now: {
      desc: '',
      temperature: '',
      feelsLike: '',
    },
    aqi: {
      category: '',
    },
    precipitation: {
      minutely: [],
      summary: '',
    },
    hours: [],
    days: [],
    average: 0,
    deltaTemp: 0,
    sunRise: '',
    sunSet: '',
    moonRise: '',
    moonSet: '',
    moonPhase: [],
    moonIcon: '',
    warings: [],
    livingIndices: [],
  }),
  actions: {
    // 和风天气数据处理函数
    qweatherHandler(loc) {
      qweather.getAllweather(loc).then(res => {
        const Weather = {};
        // 当前天气
        const now = res.now;
        Weather.now = {
          detail: [
            // 一些比较重要的数据
            {
              name: '大气压强',
              value: now.pressure,
              unit: 'hPa',
            },
            {
              name: '相对湿度',
              value: now.humidity,
              unit: '%',
            },
            {
              name: '能见度',
              value: now.vis,
              unit: 'km',
            },
            {
              name: '风速',
              value: now.windSpeed,
              unit: 'km/h',
            },
          ],
          feelsLike: now.feelsLike, // 体感温度
          temperature: now.temp, // 温度
          desc: now.text, // 天气情况
        };

        // 天气类型
        const weatherType = qWeatherCode[res.now.icon];

        // 空气质量
        const aqi = res.aqi;
        const pollutions = new Pollutions();
        pollutions.pm2p5.value = parseFloat(res.aqi.pm2p5);
        pollutions.pm10.value = parseFloat(res.aqi.pm10);
        pollutions.no2.value = parseFloat(res.aqi.no2);
        pollutions.so2.value = parseFloat(res.aqi.so2);
        pollutions.co.value = parseFloat(res.aqi.co);
        pollutions.o3.value = parseFloat(res.aqi.o3);

        const value = parseInt(aqi.aqi);
        Weather.aqi = {
          value,
          percentage: value / 5,
          color: getAqiColor(value).activeColor,
          pubTime: new Date(aqi.pubTime).format('yyyy-MM-dd hh:mm:ss'),
          category: aqi.category,
          components: pollutions,
        };

        // 降水
        Weather.precipitation = res.precipitation;
        Weather.precipitation.minutely.forEach(e => {
          e.precip = parseFloat(e.precip);
        });

        // 逐小时
        Weather.hours = [...res.next24h];
        Weather.hours.forEach(hour => {
          hour.time = new Date(hour.fxTime).format('hh:mm');
        });

        // 逐日
        let temp = 0;
        const maxTemps = [],
          minTemps = [];

        Weather.days = [...res.next7days];
        Weather.days.forEach(day => {
          const date = new Date(day.fxDate);
          day.weekday = date.week(); // 星期
          day.day = date.format('M-dd'); // 日期
          day.tempMax = parseInt(day.tempMax);
          day.tempMin = parseInt(day.tempMin);

          temp += day.tempMax + day.tempMin;

          maxTemps.push(day.tempMax);
          minTemps.push(day.tempMin);
        });

        Weather.average = temp / (Weather.days.length * 2); // 温度平均值
        const tempMax = Math.max(...maxTemps);
        const tempMin = Math.min(...minTemps);
        Weather.deltaTemp = tempMax - tempMin; // 最高温度与最低温度之差

        // 生活指数
        Weather.livingIndices = [...res.livingIndices];
        Weather.livingIndices.forEach(e => {
          e.name = e.name.replace(/指数/, '');
        });

        // 灾害预警
        Weather.warings = [...res.waring];
        Weather.warings.forEach(waring => {
          const { color, bgColor } = Waring.getWaringColor(waring.level);
          waring.color = color;
          waring.bgColor = bgColor;
        });
        notify(Weather.warings);

        // 月亮
        Weather.moonRise = res.moonTime.moonRise; // 月出时间
        Weather.moonSet = res.moonTime.moonSet; // 月落时间
        Weather.moonPhase = res.moonTime.moonPhase; // 月相
        Weather.moonIcon = res.moonTime.moonPhase[0].icon; // 月相图标

        // 太阳
        Weather.sunRise = res.sunTime.sunRise; // 日出时间
        Weather.sunSet = res.sunTime.sunSet; // 日落时间

        this.$patch({
          ...Weather,
          weatherType,
        });

        useLoading().$patch({
          loading: false,
        });
      });
    },
  },
});
