import Location from '@utils/location/location';

// 策略模式
export abstract class WeatherStrategy {
  abstract getWeather(loc: Location): Promise<any>;
  abstract set language(lang: Languages);
}

