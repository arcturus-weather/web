export const isWarning = function (i: string) {
  return /^warnings-/.test(i);
};

export const qweatherIcon = function (i: string) {
  if (isWarning(i)) {
    return i.replace('warnings-', '');
  }

  return i;
};

const caiyunWarningsMap = {
  '01': '1001', //台风
  '02': '1003', // 暴雨
  '03': '1004', // 暴雪
  '04': '1005', // 寒潮
  '05': '1006', // 大风
  '06': '1007', // 沙尘暴
  '07': '1009', // 高温
  '08': '1022', // 干旱
  '09': '1014', // 雷电
  10: '1015', // 冰雹
  11: '1016', // 霜冻
  12: '1017', // 大雾
  13: '1019', // 霾
  14: '1021', // 道路结冰
  15: '1025', // 森林火险
  16: '1020', // 雷雨大风
  17: '1047', // 春季沙尘天气趋势预警
  18: '1051', // 沙尘
};

const caiyunWarnings = function (code: string) {
  return caiyunWarningsMap[code as keyof typeof caiyunWarningsMap];
};

const caiyunIconsMap = {
  1: '1',
  2: '2',
  3: '3',
  4: '4',
  5: '5',
  6: '6',
  CLEAR_DAY: '100', // 晴
  CLEAR_NIGHT: '150', // 晴
  PARTLY_CLOUDY_DAY: '101', // 多云
  PARTLY_CLOUDY_NIGHT: '151', // 多云
  CLOUDY: '104', // 阴
  LIGHT_HAZE: '502', // 轻度雾霾
  MODERATE_HAZE: '511', // 中度雾霾
  HEAVY_HAZE: '512', // 重度雾霾
  LIGHT_RAIN: '305', // 小雨
  MODERATE_RAIN: '306', // 中雨
  HEAVY_RAIN: '307', // 大雨
  STORM_RAIN: '310', // 暴雨
  FOG: '501', // 雾
  LIGHT_SNOW: '400', // 小雪
  MODERATE_SNOW: '401', // 中雪
  HEAVY_SNOW: '402', // 大雪
  STORM_SNOW: '403', // 暴雪
  DUST: '504', // 浮尘
  SAND: '507', // 沙尘
  WIND: '1006', // 大风
};

const caiyunIcons = function (i: string) {
  return caiyunIconsMap[i as keyof typeof caiyunIconsMap];
};

export const caiyunIcon = function (i: string) {
  if (isWarning(i)) {
    return caiyunWarnings(i.replace('warnings-', ''));
  }

  return caiyunIcons(i);
};
