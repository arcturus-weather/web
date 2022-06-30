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

export function aqiCategory(aqi: number): string {
  return aqiMap[aqiLevel(aqi)];
}

export const pollutionsMap = {
  co: {
    label: 'CO',
    max: 1500,
  },
  no: {
    label: 'NO',
    max: 0.69,
  },
  no2: {
    label: 'NO₂',
    max: 3840,
  },
  o3: {
    label: 'O₃',
    max: 1200,
  },
  so2: {
    label: 'SO₂',
    max: 800,
  },
  pm2p5: {
    label: 'PM2.5',
    max: 500,
  },
  pm10: {
    label: 'PM10',
    max: 600,
  },
  nh3: {
    label: 'NH₃',
    max: 0.69,
  },
};
