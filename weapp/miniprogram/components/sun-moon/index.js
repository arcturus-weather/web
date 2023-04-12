Component({
  properties: {
    sunRise: String, // 日出时间字符串
    sunSet: String, // 日落时间字符串
    moonRise: String, // 月出时间字符串
    moonSet: String, // 月落时间字符串
  },
  data: {
    sunRiseTime: '',
    sunSetTime: '',
    moonRiseTime: '',
    moonSetTime: '',
    sunDeg: 0,
    moonDeg: 0,
  },
  lifetimes: {
    ready() {
      const sunRiseObj = new Date(this.data.sunRise);
      const sunSetObj = new Date(this.data.sunSet);
      const moonRiseObj = new Date(this.data.moonRise);
      const moonSetObj = new Date(this.data.moonSet);

      const nowTime = new Date();

      // 计算太阳的角度
      const sunDeltaT1 = nowTime.getTime() - sunRiseObj.getTime();
      const sunDeltaT2 = sunSetObj.getTime() - sunRiseObj.getTime();
      const sunRadio = sunDeltaT1 / sunDeltaT2;
      const sunDeg = sunRadio * 180;

      // 计算月亮角度
      const moonDeltaT1 = nowTime.getTime() - moonRiseObj.getTime();
      const moonDeltaT2 = moonSetObj.getTime() - moonRiseObj.getTime();
      const moonRadio = moonDeltaT1 / moonDeltaT2;
      const moonDeg = moonRadio * 180;

      this.setData({
        sunRiseTime: sunRiseObj.format('hh:mm'),
        sunSetTime: sunSetObj.format('hh:mm'),
        moonRiseTime: moonRiseObj.format('hh:mm'),
        moonSetTime: moonSetObj.format('hh:mm'),
        sunDeg,
        moonDeg,
      });
    },
  },
  methods: {},
});
