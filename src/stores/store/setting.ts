import { defineStore } from 'pinia';
import { LocalStorage, Dark } from 'quasar';
import { useWeatherStore } from './weather';

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

    setLanguage(lang: Languages) {
      // 修改数据源语言
      useWeatherStore().changeLanguage(lang);
    },
  },
});

