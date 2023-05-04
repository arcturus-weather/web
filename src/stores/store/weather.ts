import { defineStore } from 'pinia';
import { useLocationStore } from './location';
import Location from '@utils/location/location';
import QWeatherStrategy from '@utils/weather/strategies/qweather';
import Weather from '@utils/weather/strategies/weather';
import CaiyunStrategy from '@src/utils/weather/strategies/caiyun';
import { log } from '@utils/utils';

const qweather = new QWeatherStrategy(
  process.env.VUE_QWEATHER_KEY!,
  process.env.VUE_QWEATHER_ID!
);

const caiyun = new CaiyunStrategy(process.env.VUE_CAIYUN_KEY!);

const weather = new Weather(qweather, 'qweather');

weather.addStrategy(caiyun, 'caiyun');

interface weatherState {
  strategies: string;
  current: null | IWeather;
  local: null | IWeather;
  ready: boolean;
  openPrecip: boolean;
}

export const useWeatherStore = defineStore('weather', {
  state: (): weatherState => ({
    strategies: 'qweather', // 当前数据源
    current: null,
    local: null,
    ready: false, // 数据是否准备完毕
    openPrecip: false,
  }),

  actions: {
    getWeather(cache = false) {
      const loc = useLocationStore();

      this.ready = false;
      this.openPrecip = false;

      weather.getWeather(loc.current as Location).then((res: IWeather) => {
        log(res);

        this.current = res;
        this.ready = true;

        if (res.precip.minutely.length !== 0) {
          this.openPrecip = true;
        }

        if (cache || process.env.NODE_ENV === 'development') {
          this.local = res;
        }
      });
    },

    // 修改数据源
    changeStrategy(strategy: DataSources) {
      weather.changeStrategy(strategy);
      this.strategies = strategy;
    },

    // 修改数据源语言
    changeLanguage(lang: Languages) {
      weather.changeLanguage(lang);
    },
  },
});
