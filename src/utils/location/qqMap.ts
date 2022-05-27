/*************************
 *       腾讯地图         *
 *************************/
import Http from 'utils/http'
import { qqMapKey } from '@appKey'

class QQMap {
  private baseUrl: string
  private http: any
  private geolocation: any

  constructor(private key: string) {
    this.baseUrl = '/qqmap' // 配合 proxy 实现跨域

    this.http = new Http({
      baseUrl: this.baseUrl,
    })

    Http.setQQMapInterceptors(this.http.ax)

    // 获取定位
    this.geolocation = new qq.maps.Geolocation(key, '小冰天气')
  }

  // 获取位置信息
  addressInfo() {
    return new Promise((resolve, reject) => {
      this.geolocation.getLocation(
        (res: any) => {
          const { lat, lng, city, addr, district, province } = res
          resolve({
            lat, // 纬度
            lng, // 经度
            city, // 市
            addr, // 具体地址
            district, // 区
            province, // 省
          })
        },
        (err: any) => {
          reject(err)
        }
      )
    })
  }

  // 获取搜索建议
  searchSuggestions(keyword: string, region: string = '') {
    return this.http.request({
      url: '/ws/place/v1/suggestion',
      data: {
        keyword,
        region,
      },
    })
  }
}

// 导出地图实例
export const qqMap = new QQMap(qqMapKey)

/*************************
 *      腾讯地图绘制      *
 *************************/
export class DrawQQMap {
  private maker: any
  private map: any
  callback: any

  constructor(
    id: number,
    latitude: number,
    logitude: number,
    callback: (options: object) => void
  ) {
    this.callback = callback || function () {}
    this.init(id, latitude, logitude)
  }

  // 初始化地图
  init(id: number, latitude: number, logitude: number) {
    // 中心点坐标
    const center = new TMap.LatLng(latitude, logitude)
    // 初始化地图
    this.map = new TMap.Map(id, {
      center,
      zoom: 14, // 缩放比例
    })
    // 绑定地图点击事件
    this.map.on('click', this.select.bind(this))

    // 获取缩放控件实例
    const control = this.map.getControl(TMap.constants.DEFAULT_CONTROL_ID.ZOOM)
    // 设置缩放控件位于右下角
    control.setPosition(TMap.constants.CONTROL_POSITION.BOTTOM_RIGHT)

    this.setMaker(center)
  }

  // 点击地图事件
  select(evt: any) {
    const { lat, lng } = evt.latLng
    let name = evt.poi?.name ?? ''

    this.callback({ latitude: lat, logitude: lng, name }) // 执行回调

    this.updateMaker(lat, lng) // 更新锚点
  }

  /**
   * @param { TMap.LatLng } loc
   * @returns TMap.MultiMarker instance
   */
  setMaker(loc: any) {
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
      })
    }
  }

  // 更新标记
  updateMaker(latitude: number, longitude: number) {
    const loc = new TMap.LatLng(latitude, longitude)

    this.maker?.setGeometries([
      {
        position: loc,
        id: 'marker',
      },
    ])
    this.map?.setCenter(loc)
  }
}
