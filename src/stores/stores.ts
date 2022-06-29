import { defineStore } from 'pinia';
import { LocalStorage, Dark } from 'quasar';
import Location from 'utils/location/location';
import QWeatherStrategies from 'utils/weather/strategies/qweather';
import Weather from 'utils/weather/strategies/weather';
import { languageMap } from 'src/i18n/languages';
import { QQMap } from 'utils/location/qqMap';

export const useLocationStore = defineStore('location', {
  state: () => ({
    current: new Location({
      // 当前位置
      latitude: 39.9087,
      longitude: 116.3974,
      city: '北京市',
      address: '天安门',
    }),
    qqMap: new QQMap(process.env.qqMapKey!),
  }),
  getters: {
    latitude: (state) => state.current.latitude,
    longitude: (state) => state.current.longitude,
    address: (state) => state.current.address,
    city: (state) => state.current.city,
  },
  actions: {},
});

interface data {
  current?: IWeather;
  local?: IWeather;
  startegies: string;
  weather: Weather;
}

const qweather = new QWeatherStrategies(process.env.qWeatherKey!);
const weather = new Weather(qweather, 'qWeather');
// 以后在这里添加数据源....
// weather.addStrategy(openWeather, 'openWeather');

export const useWeatherStore = defineStore('weather', {
  state: (): data => ({
    startegies: 'qWeather', // 当前数据源
    weather: weather,
    current: undefined,
    local: undefined,
  }),
  actions: {
    getAllWeather() {
      const loc = useLocationStore();

      this.weather
        .getAllweather(loc.current as Location)
        .then((res: IWeather | void) => {
          if (typeof res !== 'undefined') {
            this.current = res;
          }
        });
    },
    // 修改数据源
    changeStrategy(strategy: DataSources) {
      this.weather.changeStrategy(strategy);
    },
  },
});

export type Themes = 'lightMode' | 'darkMode' | 'systemMode' | 'autoMode';

interface setting {
  theme: Themes;
  dataSource: DataSources;
  language: Lang;
}

export const useSettingStore = defineStore('settings', {
  state: (): setting => ({
    theme: 'lightMode',
    dataSource: 'qWeather',
    language: {
      label: '简体中文',
      value: 'zh-CN',
    },
  }),
  actions: {
    setTheme(theme: Themes) {
      switch (theme) {
        case 'lightMode':
          Dark.set(false);
          break;
        case 'darkMode':
          Dark.set(true);
          break;
        case 'systemMode':
          Dark.set('auto');
          break;
        case 'autoMode':
          const hour = new Date().getHours();

          if (hour > 6 && hour < 18) {
            Dark.set(false);
          } else {
            Dark.set(true);
          }
      }

      this.theme = theme;
    },
    getTheme() {
      return LocalStorage.getItem('theme') as Themes | null;
    },
    saveTheme(theme: Themes) {
      LocalStorage.set('theme', theme);
    },
    getDataSource() {
      return LocalStorage.getItem('dataSource') as DataSources | null;
    },
    saveDataSource(source: DataSources) {
      LocalStorage.set('dataSource', source);
    },
    setDataSource(source: DataSources) {
      const weather = useWeatherStore();
      weather.changeStrategy(source);
      this.dataSource = source;
    },
    getLanguage() {
      const langStr = LocalStorage.getItem('language') as string | null;
      if (langStr) {
        const lang = JSON.parse(langStr) as Lang;
        // 只有本地存储中存在用户自定义的
        this.language = lang;
        return lang;
      }
    },
    saveLanguage() {
      LocalStorage.set('language', JSON.stringify(this.language));
    },
    setLanguage(lang: languages) {
      this.language = {
        label: languageMap[lang],
        value: lang,
      };
    },
  },
});

export const useAppInfoStore = defineStore('AppInfo', {
  state: () => ({
    logo: 'https://s2.loli.net/2022/06/28/XiVhMfmoKWwpdQA.png',
    version: '0.0.1',
  }),
  actions: {
    copyRight() {
      const year = new Date().getFullYear();

      return `© 2022${year === 2022 ? '' : '-' + year}`;
    },
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
          name: 'github',
          url: 'https://github.com/ICE990125/iweather_vue',
        },
        {
          icon: 'fa-solid fa-envelope',
          name: 'issue',
          url: 'https://github.com/ICE990125/iweather_vue/issues',
        },
      ];
    },
  },
});
