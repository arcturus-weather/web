export type QRes = [
  QAir,
  QSun,
  QMoon,
  QWarnings,
  QLifeIndexs,
  QPrecip,
  QHourlys,
  QDailys,
  QNow
];

export interface QMoon {
  moonrise: string;
  moonset: string;
  moonPhase: QMoonPhases;
}

export interface QSun {
  sunrise: string;
  sunset: string;
}

export type QAirs = [QAir, QAirForecast[]];

export interface QAir {
  pubTime: string;
  aqi: string;
  level: string;
  category: string;
  primary: string;
  pm10: string;
  pm2p5: string;
  no2: string;
  so2: string;
  co: string;
  o3: string;
}

export interface QAirForecast {
  pubTime: string;
  name: string;
  id: string;
  aqi: string;
  level: string;
  category: string;
  primary: string;
  pm10: string;
  pm2p5: string;
  no2: string;
  so2: string;
  co: string;
  o3: string;
}

export type QHourlys = QHourly[];

export interface QHourly {
  fxTime: string;
  temp: string;
  icon: string;
  text: string;
  wind360: string;
  windDir: string;
  windScale: string;
  windSpeed: string;
  humidity: string;
  pop: string;
  precip: string;
  pressure: string;
  cloud: string;
  dew: string;
}

export type QLifeIndexs = QLifeIndex[];

export interface QLifeIndex {
  date: string;
  type: string;
  name: string;
  level: string;
  category: string;
  text: string;
}

export type QMoonPhases = QMoonPhase[];

export interface QMoonPhase {
  fxTime: string;
  value: string;
  name: string;
  illumination: string;
  icon: string;
}

export interface QNow {
  obsTime: string;
  temp: string;
  feelsLike: string;
  icon: string;
  text: string;
  wind360: string;
  windDir: string;
  windScale: string;
  windSpeed: string;
  humidity: string;
  precip: string;
  pressure: string;
  vis: string;
  cloud: string;
  dew: string;
}

export interface QPrecip {
  summary: string;
  minutely: QPrecipItem[];
}

export interface QPrecipItem {
  fxTime: string;
  precip: string;
  type: string;
}

export type QDailys = QDaily[];

export interface QDaily {
  fxDate: string;
  sunrise: string;
  sunset: string;
  moonrise: string;
  moonset: string;
  moonPhase: string;
  moonPhaseIcon: string;
  tempMax: string;
  tempMin: string;
  iconDay: string;
  textDay: string;
  iconNight: string;
  textNight: string;
  wind360Day: string;
  windDirDay: string;
  windScaleDay: string;
  windSpeedDay: string;
  wind360Night: string;
  windDirNight: string;
  windScaleNight: string;
  windSpeedNight: string;
  humidity: string;
  precip: string;
  pressure: string;
  vis: string;
  cloud: string;
  uvIndex: string;
}

export type QWarnings = QWarning[];

export interface QWarning {
  id: string;
  sender: string;
  pubTime: string;
  title: string;
  startTime: string;
  endTime: string;
  status: string;
  level: string;
  type: string;
  typeName: string;
  text: string;
  related: string;
}
