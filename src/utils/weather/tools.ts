export function aqiLevel(aqi: number): number {
  if (aqi >= 0 && aqi <= 50) return 1;
  else if (aqi > 50 && aqi <= 100) return 2;
  else if (aqi > 100 && aqi <= 150) return 3;
  else if (aqi > 150 && aqi <= 200) return 4;
  else if (aqi > 200 && aqi <= 300) return 5;
  else return 6;
}

const aqiMap = {
  1: 'excellent',
  2: 'good',
  3: 'lightlyPollution',
  4: 'ModeratePollution',
  5: 'HeavyPollution',
  6: 'SeriousPollution',
};

// 根据 aqi 获取等级说明
export function aqiCategory(aqi: number | undefined): string {
  if (typeof aqi === 'undefined') return aqiMap[0];

  return aqiMap[aqiLevel(aqi)];
}

// 其实这个可以不需要, 主要是 key 直接使用字符串的形式好丑啊 ˋ( ° ▽、° )
export const pollutionsMap = {
  co: 'CO',
  no: 'NO',
  no2: 'NO₂',
  o3: 'O₃',
  so2: 'SO₂',
  pm2p5: 'PM2.5',
  pm10: 'PM10',
  nh3: 'NH₃',
};
