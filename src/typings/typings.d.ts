/// <reference types="qqmap-gl-typings" />

interface ICheckInDaily {
  daily: string;
  id: string;
}

interface ICheckin {
  location: ILocation;
  weather: {
    temperature: number;
    feelsLike: number;
    icon: string;
    description: string;
    wind360: number;
    windSpeed: number;
    humidity: number;
    precip: number;
    pressure: number;
    visibility: number;
    clouds: number;
    aqi: number;
    source: string;
  };
}

interface ICheckInRes extends ICheckin {
  date: string;
  id: string;
  daily?: string;
}

type Themes = 'lightMode' | 'darkMode' | 'systemMode' | 'autoMode';

type Languages = 'en-US' | 'zh-TW' | 'zh-CN' | 'en-GB';

type DataSources = 'qWeather' | 'caiyun';
