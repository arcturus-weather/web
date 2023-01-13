import Location from '@utils/location/location';
import { QQMap } from '@utils/location/qqMap';
import { notify } from '@utils/utils';
import { defineStore } from 'pinia';
import { useWeatherStore } from './weather';
import { i18n } from '@src/boot/i18n';

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

