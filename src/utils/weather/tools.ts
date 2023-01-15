export function aqiLevel(aqi: number): number {
  if (aqi >= 0 && aqi <= 50) return 1;
  else if (aqi > 50 && aqi <= 100) return 2;
  else if (aqi > 100 && aqi <= 150) return 3;
  else if (aqi > 150 && aqi <= 200) return 4;
  else if (aqi > 200 && aqi <= 300) return 5;
  else return 6;
}

const aqiMap = [
  'unkonwn',
  'excellent',
  'good',
  'lightly',
  'moderate',
  'heavy',
  'serious',
];

// 根据 aqi 获取等级说明
export function aqiCategory(aqi: number | undefined): string {
  if (typeof aqi === 'undefined') return aqiMap[0];

  return aqiMap[aqiLevel(aqi)];
}

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

const warningLevelMap = ['white', 'blue', 'yellow', 'orange', 'red'];

export function warningLevel(level: number) {
  return warningLevelMap[level];
}

const warningTypeMap = {
  '01': 'typhoon',
  '02': 'rainstorm',
  '03': 'snowstorm',
  '04': 'cold',
  '05': 'gale',
  '06': 'sandstorm',
  '07': 'hyperthermia',
  '08': 'dry',
  '09': 'thunder',
  '10': 'hail',
  '11': 'frost',
  '12': 'fog',
  '13': 'haze',
  '14': 'icy road',
  '15': 'forest fire',
  '16': 'thunder storm and gale',
  '17': 'dust weather in spring',
  '18': 'dust',
};

export function warningType(type: string) {
  return warningTypeMap[type as keyof typeof warningTypeMap];
}

const lifeIndexMap = {
  carWashing: '2',
  dressing: '3',
  ultraviolet: '5',
  comfort: '8',
  coldRisk: '9',
};

export function lifeIndextype(index: string) {
  return lifeIndexMap[index as keyof typeof lifeIndexMap];
}

export function windDir(dir: number): string {
  if (dir >= 0 && dir <= 11.25) return 'N'; // 北
  else if (dir > 11.25 && dir <= 33.75) return 'NNE'; // 北东北
  else if (dir > 33.75 && dir <= 56.25) return 'NE'; // 东北
  else if (dir > 56.25 && dir <= 78.75) return 'ENE'; // 东东北
  else if (dir > 78.75 && dir <= 101.25) return 'E'; // 东
  else if (dir > 101.25 && dir <= 123.75) return 'ESE'; // 东东南
  else if (dir > 123.75 && dir <= 146.25) return 'SE'; // 东南
  else if (dir > 146.25 && dir <= 168.75) return 'SSE'; // 南东南
  else if (dir > 168.25 && dir <= 191.25) return 'S'; // 南
  else if (dir > 191.25 && dir <= 213.75) return 'SSW'; // 南西南
  else if (dir > 213.75 && dir <= 236.25) return 'SW'; // 西南
  else if (dir > 236.25 && dir <= 258.75) return 'WSW'; // 西西南
  else if (dir > 258.25 && dir <= 281.25) return 'W'; // 西
  else if (dir > 281.25 && dir <= 303.75) return 'WNW'; // 西西北
  else if (dir > 303.75 && dir <= 326.25) return 'NW'; // 西北
  else if (dir > 326.25 && dir <= 348.75) return 'NNW'; // 北西北
  else if (dir > 348.75 && dir <= 360) return 'N'; // 北
  else return 'unknown'; // 未知
}

export function windScale(speed: number): number {
  if (speed < 1) return 0;
  else if (speed >= 1 && speed <= 5) return 1;
  else if (speed > 5 && speed <= 11) return 2;
  else if (speed > 11 && speed <= 19) return 3;
  else if (speed > 19 && speed <= 28) return 4;
  else if (speed > 28 && speed <= 38) return 5;
  else if (speed > 38 && speed <= 49) return 6;
  else if (speed > 49 && speed <= 61) return 7;
  else if (speed > 61 && speed <= 74) return 8;
  else if (speed > 74 && speed <= 88) return 9;
  else if (speed > 88 && speed <= 102) return 10;
  else if (speed > 102 && speed <= 117) return 11;
  else if (speed > 117 && speed <= 133) return 12;
  else if (speed > 133 && speed <= 149) return 13;
  else if (speed > 149 && speed <= 166) return 14;
  else if (speed > 166 && speed <= 183) return 15;
  else if (speed > 183 && speed <= 201) return 16;
  else if (speed > 201 && speed <= 220) return 17;
  else return 18;
}
