interface ILocation {
  latitude: number;
  longitude: number;
  address?: string;
  city?: string;
}

// ice-map confirm 事件返回值
type IMapData = ILocation;

// 腾讯地图定位
interface geoResult {
  module: string;
  nation: string;
  province: string;
  city: string;
  district: string;
  adcode: string; // 行政区 ID
  addr: string;
  lat: number; // 火星坐标(gcj02)
  lng: number;
  accuracy: number; //误差范围, 以米为单位
}

// 逆地址解析结果
interface locationDetail {
  address: string;
  address_component: {
    nation: string;
    province: string;
    city: string;
    district?: string;
    street?: string;
    street_number?: string;
  };
}

// https://lbs.qq.com/service/webService/webServiceGuide/webServiceSearch
interface qqMapSuggestionsItem {
  id: string; // POI 唯一标识
  title: string; //	POI(地点)名称
  address: string; //	地址
  tel: string; //	电话
  category: string; //	POI 分类
  type: number; //	POI 类型
  location: {
    lat: number; //	纬度
    lng: number; //	经度
  };
  _distance: number; //	距离
  ad_info: object; //	行政区划信息
  adcode: number; //	行政区划代码
  province: string; //	省
  city: string; //	市
  district: string; //	区
}
