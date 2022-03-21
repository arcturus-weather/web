export default class Aqi {
  // 优
  static Excellent = {
    activeColor: '#56B37F',
    gradientColor: '#c0e674',
    desc: '空气质量令人满意, 基本无空气污染',
    name: '优',
    icon: 'excellent',
    max: 50, // 最大值
    min: 0, // 最小值
  };

  // 良
  static Good = {
    activeColor: '#FCFF00',
    gradientColor: '#FFA8A8',
    desc: '空气质量可接受, 但某些污染物可能对极少数异常敏感人群健康有较弱影响',
    name: '良',
    icon: 'good',
    max: 100,
    min: 51,
  };

  // 轻度污染
  static LightlyPollution = {
    activeColor: '#FEC163',
    gradientColor: '#DE4313',
    desc: '易感人群症状有轻度加剧, 健康人群出现刺激症状',
    name: '轻度污染',
    icon: 'lightly',
    max: 150,
    min: 101,
  };

  // 中度污染
  static ModeratePollution = {
    activeColor: '#FFAA85',
    gradientColor: '#B3315F',
    desc: '进一步加剧易感人群症状, 可能对健康人群心脏、呼吸系统有影响',
    name: '中度污染',
    icon: 'moderate',
    max: 200,
    min: 151,
  };

  // 重度污染
  static HeavyPollution = {
    activeColor: '#EE9AE5',
    gradientColor: '#5961F9',
    desc: '心脏病和肺病患者症状显著加剧, 运动耐受力降低, 健康人群普遍出现症状',
    name: '重度污染',
    icon: 'heavy',
    max: 300,
    min: 201,
  };

  // 严重污染
  static SeriousPollution = {
    activeColor: '#F05F57',
    gradientColor: '#360940',
    desc: '健康人群运动耐受力降低, 有明显强烈症状, 提前出现某些疾病',
    name: '严重污染',
    icon: 'serious',
    max: '∞',
    min: 301,
  };
}

// 根据 aqi 指数获取值
export function getAqiColor(e) {
  const aqi = parseFloat(e);
  if (aqi >= 0 && aqi <= 50) {
    return Aqi.Excellent;
  } else if (aqi > 50 && aqi <= 100) {
    return Aqi.Good;
  } else if (aqi > 100 && aqi <= 150) {
    return Aqi.LightlyPollution;
  } else if (aqi > 150 && aqi <= 200) {
    return Aqi.ModeratePollution;
  } else if (aqi > 200 && aqi <= 300) {
    return Aqi.HeavyPollution;
  } else {
    return Aqi.SeriousPollution;
  }
}
