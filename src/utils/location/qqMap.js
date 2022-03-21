/*************************
 *       腾讯地图         *
 *************************/
import { createAxios, request, setQQMapInterceptors } from '../http';
import { appKey } from '../../../appKey';

class QQMap {
  constructor(key) {
    this.key = key;
    // 配合 proxy 实现跨域
    this.baseUrl = '/qqmap';
    this.ax = createAxios(this.baseUrl);
    setQQMapInterceptors(this.ax);
    this.request = function ({ url, method = 'GET', data }) {
      return request.call(this, {
        url,
        method,
        data: {
          key: this.key,
          ...data,
        },
      });
    };
    // 获取定位
    this.geolocation = new qq.maps.Geolocation(key, '小冰天气');
  }

  // 获取位置信息
  addressInfo() {
    return new Promise((resolve, reject) => {
      this.geolocation.getLocation(
        res => {
          const { lat, lng, city, addr, district, province } = res;
          resolve({
            lat, // 纬度
            lng, // 经度
            city, // 市
            addr, // 具体地址
            district, // 区
            province, // 省
          });
        },
        err => {
          reject(err);
        }
      );
    });
  }

  // 获取搜索建议
  searchSuggest(e, region = '') {
    return this.request({
      url: '/ws/place/v1/suggestion',
      data: {
        keyword: e,
        region,
      },
    }).then(res => {
      return res;
    });
  }
}

// 导出地图实例
export const qqMap = new QQMap(appKey.qqMap);

/*************************
 *      腾讯地图绘制      *
 *************************/
export class DrawQQMap {
  constructor(id, lat, lng, callback) {
    this.maker = null;
    this.callback = callback || function () {};
    this.init(id, lat, lng);
  }

  // 点击地图事件
  select(evt) {
    const { lat, lng } = evt.latLng;
    let name;
    if (evt.poi) {
      name = evt.poi.name;
    } else {
      name = '暂无...';
    }

    this.callback({ lat, lng, name }); // 执行回调

    this.updateMaker(lat, lng); // 更新锚点
  }

  // 初始化地图
  init(id, lat, lng) {
    // 中心点坐标
    const center = new TMap.LatLng(lat, lng);
    // 初始化地图
    this.map = new TMap.Map(id, {
      center,
      zoom: 14, // 缩放比例
    });
    // 绑定地图点击事件
    this.map.on('click', this.select.bind(this));

    // 获取缩放控件实例
    const control = this.map.getControl(TMap.constants.DEFAULT_CONTROL_ID.ZOOM);
    // 设置缩放控件位于右下角
    control.setPosition(TMap.constants.CONTROL_POSITION.BOTTOM_RIGHT);

    this.setMaker(center);
  }

  /**
   * @param { TMap.Map } map
   * @param { TMap.LatLng } loc
   * @returns TMap.MultiMarker 实例
   */
  setMaker(loc) {
    if (!this.maker) {
      // 设置点标记
      this.maker = new TMap.MultiMarker({
        map: this.map,
        styles: {
          // 点标记样式
          marker: new TMap.MarkerStyle({
            width: 20, // 样式宽
            height: 30, // 样式高
            anchor: { x: 10, y: 30 }, // 描点位置
          }),
        },
        geometries: [
          // 点标记数据数组
          {
            // 标记位置(纬度，经度，高度)
            position: loc,
            id: 'marker',
          },
        ],
      });
    }
  }

  // 更新标记
  updateMaker(lat = 0, lng = 0) {
    const loc = new TMap.LatLng(lat, lng);
    this.maker.setGeometries([
      {
        position: loc,
        id: 'marker',
      },
    ]);
    this.map.setCenter(loc);
  }
}
