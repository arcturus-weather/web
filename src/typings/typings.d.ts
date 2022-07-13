/* eslint-disable */
/// <reference types="qqmap-gl-typings" />

interface ILogin {
  status: number;
  message?: string;
  timestamp: number;
  token?: string;
}

interface ILocation {
  latitude: number;
  longitude: number;
  address?: string;
  city?: string;
}

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

// 腾讯地图搜索返回, docs: https://lbs.qq.com/service/webService/webServiceGuide/webServiceSearch
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

// ice-map confirm 事件返回值
interface IMapData {
  latitude: number;
  longitude: number;
  address?: string;
  city?: string;
  district?: string;
  province?: string;
}

// 主题
type Themes = 'lightMode' | 'darkMode' | 'systemMode' | 'autoMode';

// 语言
type Languages = 'en-US' | 'zh-TW' | 'zh-CN';

// 数据源
type DataSources = 'qWeather' | 'openWeather' | 'caiyun';

interface IComponents {
  co: number;
  no?: number;
  no2: number;
  o3: number;
  so2: number;
  pm2p5: number;
  pm10: number;
  nh3?: number;
}

interface IAir {
  dateTime: Date;
  aqi: number;
  level: number;
  category?: string;
  components: IComponents;
}

interface IWarning {
  description: string;
  title: string;
  sender?: string; // 发布单位
  start?: Date; // 预警开始时间
  end?: Date; // 预警结束时间
  // Only qWeather supports ↓
  dateTime?: Date;
  status?: string; // 预警状态 Active | Update | Cancel
  level?: string; // 预警等级 白色 | 蓝色 | 黄色 | 橙色 | 红色
  type?: string; // 预警类型 ID
  typeName?: string | Array<string>; // 预警类型名称
  urgency?: string; // 紧迫程度 Immediate | Expected | Future | Past | Unknown
}

interface ISun {
  sunRise: Date;
  sunSet: Date;
}

interface IMoonPhase {
  dateTime?: Date;
  value?: number; // 月相数值
  name?: string; // 月相名字
  illumination?: number; // 月亮照明度, %
  icon?: string; // 月相图标代码
}

interface IMoon {
  moonRise: Date;
  moonSet: Date;
  moonPhase: IMoonPhase | Array<IMoonPhase>;
}

interface ILivingIndex {
  type: number;
  name: string;
  level: number;
  category: string;
  description: string;
}

interface IPrecip {
  dateTime: Date;
  precip: number;
  type?: string; // rain | snow
}

interface IFuturePrecip {
  summary?: string;
  minutely: Array<IPrecip>;
}

interface IWeatherItem {
  dateTime: Date;
  temperature: ITemperature;
  feelsLike?: ITemperature;
  dewPoint: number;
  description: string;
  icon: number | string;
  wind: IWind;
  visibility?: number;
  pressure: number;
  humidity: number;
  clouds?: number;
  pop?: number; // Probability of precipitation
  precip?: number; // current precipitation
  uvIndex?: number;
}

interface ITemperature {
  day?: number;
  min?: number;
  max?: number;
  night?: number;
  eve?: number;
  morn?: number;
}

interface IWind {
  wind360: number;
  windDir?: string;
  windScale?: string;
  windSpeed: number;
  windGust?: number;
}

interface IDailyItem {
  dateTime: Date;
  sun: ISun;
  moon: IMoon;
  dayDesc: string;
  dayIcon: number | string;
  nightDesc?: string;
  nightIcon?: number | string;
  temperature: ITemperature;
  feelsLike?: ITemperature;
  dayWind: IWind;
  dewPoint?: number;
  nightWind?: IWind;
  humidity: number;
  precip: number;
  pop: number;
  pressure: number;
  visibility?: number;
  clouds?: number;
  uvIndex: number;
}

interface IWeather {
  location: ILocation;
  air: IAir;
  airForcast?: Array<IAir>; // only openweather supports
  sun: ISun;
  moon?: IMoon;
  waring: Array<IWarning>;
  livingIndices?: Array<ILivingIndex>;
  precip: IFuturePrecip;
  hourly: Array<IWeatherItem>;
  daily: Array<IDailyItem>;
  now: IWeatherItem;
}

