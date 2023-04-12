export default class Pollutions {
  constructor() {
    this.pm2p5 = {
      name: 'PM2.5',
      unit: 'μg/m³',
      max: 500,
    };
    this.pm10 = {
      name: 'PM10',
      unit: 'μg/m³',
      max: 600,
    };
    this.no2 = {
      name: 'NO₂',
      unit: 'μg/m³',
      max: 3840,
    };
    this.so2 = {
      name: 'SO₂',
      unit: 'μg/m³',
      max: 800,
    };
    this.o3 = {
      name: 'O₃',
      unit: 'μg/m³',
      max: 1200,
    };
    this.co = {
      name: 'CO',
      unit: 'mg/m³',
      max: 150,
    };
  }
}
