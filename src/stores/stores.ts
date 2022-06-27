import { defineStore } from 'pinia';
import Location from 'utils/location/location';
import QWeatherStrategies from 'utils/weather/strategies/qweather';
import Weather from 'utils/weather/strategies/weather';
import { i18n } from 'boot/i18n';

interface data {
  location: Location;
  current?: IWeather;
  local?: IWeather;
  startegies: string;
  weather: Weather;
}

const qweather = new QWeatherStrategies(process.env.qWeatherKey!);

export const useWeatherStore = defineStore('weather', {
  state: (): data => ({
    location: new Location({
      latitude: 39.9,
      longitude: 116.38,
      city: '北京市',
      address: '天安门',
    }),
    startegies: 'qWeather', // 当前策略
    weather: new Weather(qweather, 'qWeather'),
    current: undefined,
    local: undefined,
  }),
  getters: {},
  actions: {
    getAllWeather() {
      this.weather
        .getAllweather(this.location as Location)
        .then((res: IWeather | void) => {
          console.log(res);
          if (typeof res !== 'undefined') {
            this.current = res;
          }
        });
    },
  },
});

export const useAppInfoStore = defineStore('AppInfo', {
  state: () => ({
    logo: 'https://s2.loli.net/2022/06/27/x2E1DslO8Ka3h7c.png',
    project: i18n.global.t('project'),
    version: '0.0.1',
  }),
  actions: {
    contributors() {
      return [
        {
          avatar: 'https://avatars.githubusercontent.com/u/65435402?s=60&v=4',
          name: 'ARCTURUS',
          url: 'https://github.com/ICE99125',
        },
      ];
    },
    links() {
      return [
        {
          icon: 'fa-brands fa-github',
          name: i18n.global.t('github'),
          url: 'https://github.com/ICE990125/iweather_vue',
        },
        {
          icon: 'fa-solid fa-envelope',
          name: i18n.global.t('issue'),
          url: 'https://github.com/ICE990125/iweather_vue/issues',
        },
      ];
    },
  },
});
