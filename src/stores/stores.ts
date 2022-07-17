import { defineStore } from 'pinia';
import { LocalStorage, Dark } from 'quasar';
import Location from 'utils/location/location';
import Ice from 'src/utils/ice-server';
import QWeatherStrategies from 'utils/weather/strategies/qweather';
import Weather from 'utils/weather/strategies/weather';
import { QQMap } from 'utils/location/qqMap';
import { languageMap, notify } from 'utils/utils';
import { i18n } from 'src/boot/i18n';

export const qqMap = new QQMap(process.env.VUE_QQMAP_KEY!);

// 地理位置
export const useLocationStore = defineStore('location', {
  state: (): {
    current: Location;
    local: Location | null;
  } => ({
    current: new Location({
      // 天气的位置
      latitude: 39.9087,
      longitude: 116.3974,
      city: '北京市',
      address: '天安门',
    }),
    local: new Location({
      // 当前位置
      latitude: 39.9087,
      longitude: 116.3974,
      city: '北京市',
      address: '天安门',
    }),
  }),
  actions: {
    changeLocation(loc: IMapData, cache = false) {
      this.current = new Location(loc);

      // 改变地理位置后重新请求天气数据
      useWeatherStore().getAllWeather(cache);
    },

    // 获取当前位置
    getLocation() {
      qqMap
        .addressInfo()
        .then((res: IMapData) => {
          this.changeLocation(res, true);

          // 缓存当前位置
          this.local = new Location(res);
        })
        .catch(() => {
          notify.negative(i18n.global.t('map.err'));
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

      this.ready = false; // 开始获取新数据前, 把 ready 置为 false

      weather
        .getAllweather(loc.current as Location)
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

export const useSettingStore = defineStore('settings', {
  state: () => ({
    theme: 'lightMode',
    dataSource: 'qWeather',
    language: '简体中文',
  }),

  actions: {
    setTheme(theme: Themes | null) {
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

    setDataSource(source: DataSources | null) {
      if (source) {
        useWeatherStore().changeStrategy(source); // 同时修改天气数据源
      }
    },

    getLanguage() {
      return LocalStorage.getItem('language') as Languages | null;
    },

    saveLanguage() {
      LocalStorage.set('language', this.language);
    },

    setLanguage(lang: string | null) {
      if (lang) {
        // 修改数据源语言
        useWeatherStore().changeLanguage(languageMap[lang]);
      }
    },
  },
});

// App 的一些信息
export const useAppInfoStore = defineStore('AppInfo', {
  state: () => ({
    logo: 'https://s2.loli.net/2022/06/28/XiVhMfmoKWwpdQA.png',
    version: '0.0.1',
    visitor: 0,
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

const user = new Ice(
  process.env.VUE_SERVER_BASEURL!,
  LocalStorage.getItem('token')
);

export const useUserStore = defineStore('user', {
  actions: {
    // 是否登录
    isLoggedIn() {
      const token = LocalStorage.getItem('token');

      if (token) return true;
      else return false;
    },

    logout() {
      LocalStorage.remove('token');
    },

    // 发送验证码
    sendCode(email: string) {
      return user.sendCode(email);
    },

    // 访问
    visit() {
      user.visit().then((res) => {
        const { status, visitor } = res as any;
        if (status === 200) {
          const app = useAppInfoStore();
          app.visitor = visitor;
        }
      });
    },

    // 登录
    login(account: string, password: string) {
      return new Promise<void>((resolve, rejects) => {
        user
          .login(account, password)
          .then((res) => {
            const { status, token } = res;
            if (status === 200) {
              // 保存用户 token
              LocalStorage.set('token', token);
              user.token = token;
              resolve();
            } else {
              rejects({ code: status });
            }
          })
          .catch((err) => {
            rejects({ code: err.status });
          });
      });
    },

    // 注册
    signin(account: string, password: string) {
      return new Promise<void>((resolve, rejects) => {
        user
          .signin(account, password)
          .then((res) => {
            const { status } = res;

            if (status === 200) {
              resolve();
            } else {
              rejects({ code: status });
            }
          })
          .catch((err) => {
            rejects(err);
          });
      });
    },

    // 修改密码
    changePassword(email: string, password: string, code: string) {
      return new Promise<void>((resolve, rejects) => {
        user
          .changePassword(email, password, code)
          .then((res) => {
            console.log(res);
            const { status } = res;

            if (status === 200) {
              resolve();
            } else {
              rejects({ code: status });
            }
          })
          .catch((err) => {
            rejects(err);
          });
      });
    },

    // 每日日记
    daily(id: string, daily: string) {
      return new Promise<void>((resolve, rejects) => {
        user.daily({ id, daily }).then((res) => {
          const { status } = res;

          if (status === 200) {
            resolve();
          } else {
            rejects({ code: status });
          }
        });
      });
    },

    favorites(): Promise<any> {
      return new Promise((resolve, rejects) => {
        user.favorites().then((res) => {
          const { status, favorites } = res;

          if (status === 200) {
            resolve(favorites);
          } else {
            rejects({ code: status });
          }
        });
      });
    },

    addFavorite(options: ILocation) {
      return user.addFavorite(options);
    },

    deleteFavorite(options: ILocation[]): Promise<any> {
      return new Promise((resolve, rejects) => {
        user.deleteFavorite(options).then((e) => {
          const { status } = e;

          if (status === 200) {
            resolve(e.favorites);
          } else {
            notify.negative(e.message);
            rejects();
          }
        });
      });
    },

    calendar(): Promise<any> {
      return new Promise((resolve, rejects) => {
        user.calendar().then((res) => {
          const { status, list } = res;

          if (status === 200) {
            resolve(list);
          } else {
            rejects({ code: status });
          }
        });
      });
    },

    checkin(options: ICheckin): Promise<any> {
      return new Promise((resolve, rejects) => {
        user.checkin(options).then((res) => {
          const { status, item } = res;

          if (status === 200) {
            resolve(item);
          } else {
            rejects('waring.checkinFail');
          }
        });
      });
    },
  },
});

