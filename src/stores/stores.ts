import { defineStore } from 'pinia';
import { LocalStorage, Dark, Notify } from 'quasar';
import Location from 'utils/location/location';
import QWeatherStrategies from 'utils/weather/strategies/qweather';
import Weather from 'utils/weather/strategies/weather';
import { QQMap } from 'utils/location/qqMap';
import { languageMap } from 'utils/utils';

// 地理位置
export const useLocationStore = defineStore('location', {
  state: (): {
    current: Location;
    qqMap: QQMap;
  } => ({
    current: new Location({
      // 当前位置
      latitude: 39.9087,
      longitude: 116.3974,
      city: '北京市',
      address: '天安门',
    }),
    qqMap: new QQMap(process.env.VUE_QQMAP_KEY!),
  }),
  actions: {
    changeLocation(loc: IMapData) {
      this.current = new Location(loc);

      // 改变地理位置后重新请求天气数据
      useWeatherStore().getAllWeather();
    },

    // 获取当前位置
    getLocation() {
      this.qqMap
        .addressInfo()
        .then((res: IMapData) => {
          this.changeLocation(res);
        })
        .catch((err: string) => {
          Notify.create({
            type: 'negative',
            message: err,
          });
        });
    },
  },
});

const qweather = new QWeatherStrategies(process.env.VUE_QWEATHER_KEY!);
const weather = new Weather(qweather, 'qWeather');
// 以后在这里添加数据源....
// weather.addStrategy(openWeather, 'openWeather');

export const useWeatherStore = defineStore('weather', {
  state: (): {
    strategies: string;
    current: null | IWeather;
    ready: boolean;
  } => ({
    strategies: 'qWeather', // 当前数据源
    current: null,
    ready: false, // 数据是否准备完毕
  }),

  actions: {
    getAllWeather() {
      const loc = useLocationStore();

      this.ready = false; // 开始获取新数据前, 把 ready 置为 false

      weather
        .getAllweather(loc.current as Location)
        .then((res: IWeather | undefined) => {
          if (typeof res !== 'undefined') {
            this.current = res;
            this.ready = true;
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

export const useSettingStore = defineStore('settings', {
  state: () => ({
    theme: 'lightMode',
    dataSource: 'qWeather',
    language: '简体中文',
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
      useWeatherStore().changeStrategy(source); // 同时修改天气数据源
      this.dataSource = source;
    },

    getLanguage() {
      return LocalStorage.getItem('language') as Languages | null;
    },

    saveLanguage() {
      LocalStorage.set('language', this.language);
    },

    setLanguage(lang: string) {
      this.language = lang;
      // 修改数据源语言
      useWeatherStore().changeLanguage(languageMap[lang]);
    },
  },
});

// App 的一些信息
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
