// 用于测试天气接口, 直接在 App.vue 中引入即可

import QWeatherStrategies from '../strategies/qweather';
import Weather from '../strategies/weather';
import { qWeatherKey, openWeatherKey } from 'src/appKey';
import OpenWeatherStrategies from '../strategies/openweather';
import Location from 'utils/location/location';

const qw = new QWeatherStrategies(qWeatherKey);
const ow = new OpenWeatherStrategies(openWeatherKey);

const w = new Weather(qw, 'qweather');

const loc = new Location({
  latitude: 21,
  longitude: 110,
});

w.getAllweather(loc).then((res) => console.log(res));

w.addStrategy(ow, 'openweather');
w.changeStrategy('openweather'); // 切换策略

w.getAllweather(loc).then((res) => console.log(res));
