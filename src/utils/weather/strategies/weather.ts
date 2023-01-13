import Location from '@utils/location/location';
import { WeatherStrategy } from './base';

export default class Weather {
  private strategies: Record<string, WeatherStrategy>;

  public constructor(private current: WeatherStrategy, type: string) {
    this.strategies = {};
    this.strategies[type] = this.current;
  }

  // 添加策略
  addStrategy(s: WeatherStrategy, type: string) {
    this.strategies[type] = s;
  }

  // 修改策略
  changeStrategy(type: DataSources) {
    this.current = this.strategies[type];
  }

  // 修改策略语言
  changeLanguage(lang: Languages) {
    Object.keys(this.strategies).forEach((key) => {
      this.strategies[key].language = lang;
    });
  }

  // 获取天气
  getWeather(loc: Location): Promise<IWeather> {
    return this.current.getWeather(loc);
  }
}

