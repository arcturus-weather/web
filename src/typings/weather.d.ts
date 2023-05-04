interface IComponents {
  co: number;
  no2: number;
  o3: number;
  so2: number;
  pm2p5: number;
  pm10: number;
}

interface IAir {
  dateTime: Date;
  aqi: number;
  level: number;
  category: string;
  components: IComponents;
}

type IWarnings = IWarning[];

interface IWarning {
  description: string;
  title: string;
  sender: string; // 发布单位
  pubTime: Date; // 发布时间
  id: string; // alert id
  status: string; // 预警状态
  level: string; // 预警等级 白色 | 蓝色 | 黄色 | 橙色 | 红色
  type: string; // 预警类型 ID
  typeName: string; // 预警类型名称
}

interface ISun {
  sunrise?: Date;
  sunset?: Date;
}

interface IMoonPhase {
  dateTime: Date;
  value: number; // 月相数值
  name: string; // 月相名字
  illumination: number; // 月亮照明度, %
  icon: string; // 月相图标代码
}

interface IDailyMoonPhase {
  icon: string;
  name: string;
}

interface IMoon {
  moonrise?: Date;
  moonset?: Date;
  moonPhase?: IMoonPhase[];
}

interface IDailyMoon {
  moonrise: Date;
  moonset: Date;
  moonPhase: IDailyMoonPhase;
}

type ILifeIndexs = ILifeIndex[];

interface ILifeIndex {
  type: string;
  name: string;
  level: number;
  description: string;
}

interface IPrecip {
  summary: string;
  minutely: {
    dateTime: Date;
    value: number;
  }[];
}

interface INow {
  dateTime: Date;
  temperature: number;
  feelsLike: number;
  dewPoint?: number;
  description: string;
  icon: string;
  wind: IWind;
  visibility?: number;
  pressure: number;
  humidity: number;
  clouds: number;
  precip: number; // current precipitation
}

interface IHourly {
  dateTime: Date;
  temperature: number;
  feelsLike?: number;
  dewPoint?: number;
  description: string;
  icon: string;
  wind: IWind;
  visibility?: number;
  pressure: number;
  humidity: number;
  clouds: number;
  pop: number; // Probability of precipitation
  precip: number; // current precipitation
}

type IHourlys = IHourly[];

interface IWind {
  wind360: number;
  windDir: string;
  windSpeed: number;
  windScale: string | number; // "1-2" or 2
}

interface IDaily {
  dateTime: Date;
  sun: ISun;
  moon?: IDailyMoon;
  dayDesc: string;
  dayIcon: string;
  nightDesc: string;
  nightIcon: string;
  temperature: {
    max: number;
    min: number;
  };
  dayWind: IWind;
  nightWind: IWind;
  humidity: number;
  precip: number;
  pressure: number;
  clouds: number;
  pop?: number;
  uvIndex?: number;
  visibility?: number;
}

type IDailys = IDaily[];

interface IWeather {
  location: ILocation;
  air: IAir;
  airForcast?: number[];
  sun: ISun;
  moon?: IMoon;
  warnings: IWarnings;
  lifeIndexs: ILifeIndexs;
  precip: IPrecip;
  hourlys: IHourlys;
  dailys: IDailys;
  now: INow;
}
