import { defineStore } from 'pinia';
import Location from 'utils/location/location';
import QWeatherStrategies from 'utils/weather/strategies/qweather';
import Weather from 'utils/weather/strategies/weather';

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
