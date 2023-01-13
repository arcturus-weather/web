import { defineStore } from 'pinia';
import { useLocationStore } from './location';
import Location from '@utils/location/location';
import QWeatherStrategy from '@utils/weather/strategies/qweather';
import Weather from '@utils/weather/strategies/weather';

const qweather = new QWeatherStrategy(
  process.env.VUE_QWEATHER_KEY!,
  process.env.VUE_QWEATHER_ID!
);

const weather = new Weather(qweather, 'qWeather');

// weather.addStrategy(openWeather, 'openWeather');

export const useWeatherStore = defineStore('weather', {
  state: (): {
    strategies: string;
    current: null | IWeather;
    local: null | IWeather;
    ready: boolean;
  } => ({
    strategies: 'qWeather', // 当前数据源
    current: null,
    local: null,
    ready: false, // 数据是否准备完毕
  }),

  actions: {
    getAllWeather(cache = false) {
      const loc = useLocationStore();

      this.ready = false;

      weather
        .getWeather(loc.current as Location)
        .then((res: IWeather | undefined) => {
          if (typeof res !== 'undefined') {
            this.current = res;
            this.ready = true;

            if (cache || process.env.NODE_ENV === 'development') {
              this.local = res;
            }
          }
        });
    },

    // 修改数据源
    changeStrategy(strategy: DataSources) {
      weather.changeStrategy(strategy);
    },

    // 修改数据源语言
    changeLanguage(lang: Languages) {
      weather.changeLanguage(lang);
    },
  },
});

