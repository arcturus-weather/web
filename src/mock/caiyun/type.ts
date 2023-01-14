export interface CYCaiyunRes {
  status: string;
  api_version: string;
  api_status: string;
  lang: string;
  unit: string;
  tzshift: number;
  timezone: string;
  server_time: number;
  location: number[];
  result: CYResult;
}

interface CYResult {
  alert: CYAlert;
  realtime: CYRealtime;
  minutely: CYMinutely;
  hourly: CYHourly;
  daily: CYDaily;
  primary: number;
  forecast_keypoint: string;
}

interface CYAlert {
  status: string;
  content: CYContent[];
  adcodes: CYAdcodes[];
}

interface CYRealtime {
  status: string;
  temperature: number;
  humidity: number;
  cloudrate: number;
  skycon: string;
  visibility: number;
  dswrf: number;
  wind: CYWind;
  pressure: number;
  apparent_temperature: number;
  precipitation: CYPrecipitation;
  air_quality: CYAirQuality;
  life_index: CYLifeCYndex;
}

interface CYMinutely {
  status: string;
  datasource: string;
  precipitation_2h: number[];
  precipitation: number[];
  probability: number[];
  description: string;
}

interface CYHourly {
  status: string;
  description: string;
  precipitation: CYPrecipitation1[];
  temperature: CYTemperature[];
  apparent_temperature: CYApparentTemperature[];
  wind: CYWind1[];
  humidity: CYHumidity[];
  cloudrate: CYCloudrate[];
  skycon: CYSkycon[];
  pressure: CYPressure[];
  visibility: CYVisibility[];
  dswrf: CYDswrf[];
  air_quality: CYAirQuality1;
}

interface CYDaily {
  status: string;
  astro: CYAstro[];
  precipitation_08h_20h: CYPrecipitation08h20h[];
  precipitation_20h_32h: CYPrecipitation20h32h[];
  precipitation: CYPrecipitation2[];
  temperature: CYTemperature1[];
  temperature_08h_20h: CYTemperature08h20h[];
  temperature_20h_32h: CYTemperature20h32h[];
  wind: CYWind2[];
  wind_08h_20h: CYWind08h20h[];
  wind_20h_32h: CYWind20h32h[];
  humidity: CYHumidity1[];
  cloudrate: CYCloudrate1[];
  pressure: CYPressure1[];
  visibility: CYVisibility1[];
  dswrf: CYDswrf1[];
  air_quality: CYAirQuality2;
  skycon: CYSkycon1[];
  skycon_08h_20h: CYSkycon08h20h[];
  skycon_20h_32h: CYSkycon20h32h[];
  life_index: CYLifeCYndex1;
}

interface CYContent {
  province: string;
  status: string;
  code: string;
  description: string;
  regionCYd: string;
  county: string;
  pubtimestamp: number;
  latlon: number[];
  city: string;
  alertCYd: string;
  title: string;
  adcode: string;
  source: string;
  location: string;
  request_status: string;
}

interface CYAdcodes {
  adcode: number;
  name: string;
}

interface CYWind {
  speed: number;
  direction: number;
}

interface CYPrecipitation {
  local: CYLocal;
  nearest: CYNearest;
}

interface CYAirQuality {
  pm25: number;
  pm10: number;
  o3: number;
  so2: number;
  no2: number;
  co: number;
  aqi: CYAqi;
  description: CYDescription;
}

interface CYLifeCYndex {
  ultraviolet: CYUltraviolet;
  comfort: CYComfort;
}

interface CYPrecipitation1 {
  datetime: string;
  value: number;
  probability: number;
}

interface CYTemperature {
  datetime: string;
  value: number;
}

interface CYApparentTemperature {
  datetime: string;
  value: number;
}

interface CYWind1 {
  datetime: string;
  speed: number;
  direction: number;
}

interface CYHumidity {
  datetime: string;
  value: number;
}

interface CYCloudrate {
  datetime: string;
  value: number;
}

interface CYSkycon {
  datetime: string;
  value: string;
}

interface CYPressure {
  datetime: string;
  value: number;
}

interface CYVisibility {
  datetime: string;
  value: number;
}

interface CYDswrf {
  datetime: string;
  value: number;
}

interface CYAirQuality1 {
  aqi: CYAqi1[];
  pm25: CYPm25[];
}

interface CYAstro {
  date: string;
  sunrise: CYSunrise;
  sunset: CYSunset;
}

interface CYPrecipitation08h20h {
  date: string;
  max: number;
  min: number;
  avg: number;
  probability: number;
}

interface CYPrecipitation20h32h {
  date: string;
  max: number;
  min: number;
  avg: number;
  probability: number;
}

interface CYPrecipitation2 {
  date: string;
  max: number;
  min: number;
  avg: number;
  probability: number;
}

interface CYTemperature1 {
  date: string;
  max: number;
  min: number;
  avg: number;
}

interface CYTemperature08h20h {
  date: string;
  max: number;
  min: number;
  avg: number;
}

interface CYTemperature20h32h {
  date: string;
  max: number;
  min: number;
  avg: number;
}

interface CYWind2 {
  date: string;
  max: CYMax;
  min: CYMin;
  avg: CYAvg;
}

interface CYWind08h20h {
  date: string;
  max: CYMax1;
  min: CYMin1;
  avg: CYAvg1;
}

interface CYWind20h32h {
  date: string;
  max: CYMax2;
  min: CYMin2;
  avg: CYAvg2;
}

interface CYHumidity1 {
  date: string;
  max: number;
  min: number;
  avg: number;
}

interface CYCloudrate1 {
  date: string;
  max: number;
  min: number;
  avg: number;
}

interface CYPressure1 {
  date: string;
  max: number;
  min: number;
  avg: number;
}

interface CYVisibility1 {
  date: string;
  max: number;
  min: number;
  avg: number;
}

interface CYDswrf1 {
  date: string;
  max: number;
  min: number;
  avg: number;
}

interface CYAirQuality2 {
  aqi: CYAqi2[];
  pm25: CYPm26[];
}

interface CYSkycon1 {
  date: string;
  value: string;
}

interface CYSkycon08h20h {
  date: string;
  value: string;
}

interface CYSkycon20h32h {
  date: string;
  value: string;
}

interface CYLifeCYndex1 {
  ultraviolet: CYUltraviolet1[];
  carWashing: CYCarWashing[];
  dressing: CYDressing[];
  comfort: CYComfort1[];
  coldRisk: CYColdRisk[];
}

interface CYLocal {
  status: string;
  datasource: string;
  intensity: number;
}

interface CYNearest {
  status: string;
  distance: number;
  intensity: number;
}

interface CYAqi {
  chn: number;
  usa: number;
}

interface CYDescription {
  chn: string;
  usa: string;
}

interface CYUltraviolet {
  index: number;
  desc: string;
}

interface CYComfort {
  index: number;
  desc: string;
}

interface CYAqi1 {
  datetime: string;
  value: CYValue;
}

interface CYPm25 {
  datetime: string;
  value: number;
}

interface CYSunrise {
  time: string;
}

interface CYSunset {
  time: string;
}

interface CYMax {
  speed: number;
  direction: number;
}

interface CYMin {
  speed: number;
  direction: number;
}

interface CYAvg {
  speed: number;
  direction: number;
}

interface CYMax1 {
  speed: number;
  direction: number;
}

interface CYMin1 {
  speed: number;
  direction: number;
}

interface CYAvg1 {
  speed: number;
  direction: number;
}

interface CYMax2 {
  speed: number;
  direction: number;
}

interface CYMin2 {
  speed: number;
  direction: number;
}

interface CYAvg2 {
  speed: number;
  direction: number;
}

interface CYAqi2 {
  date: string;
  max: CYMax3;
  avg: CYAvg3;
  min: CYMin3;
}

interface CYPm26 {
  date: string;
  max: number;
  avg: number;
  min: number;
}

interface CYUltraviolet1 {
  date: string;
  index: string;
  desc: string;
}

interface CYCarWashing {
  date: string;
  index: string;
  desc: string;
}

interface CYDressing {
  date: string;
  index: string;
  desc: string;
}

interface CYComfort1 {
  date: string;
  index: string;
  desc: string;
}

interface CYColdRisk {
  date: string;
  index: string;
  desc: string;
}

interface CYValue {
  chn: number;
  usa: number;
}

interface CYMax3 {
  chn: number;
  usa: number;
}

interface CYAvg3 {
  chn: number;
  usa: number;
}

interface CYMin3 {
  chn: number;
  usa: number;
}
