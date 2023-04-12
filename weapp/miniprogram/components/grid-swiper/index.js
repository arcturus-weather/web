Component({
  properties: {
    swiperData: Array,
    activeDotColor: {
      type: String,
      value: 'rgba(0, 0, 0, 0.7)',
    },
    dotColor: {
      // 指示点颜色
      type: String,
      value: 'rgba(0, 0, 0, 0.1)',
    },
  },
  data: {
    twoDimArray: [], // 一个二维数组
  },
  lifetimes: {
    ready() {
      // 将一维数组转换成二维数组
      const data = this.data.swiperData;

      let twoDimArray = [];
      for (let i = 0; i < data.length; i += 4) {
        twoDimArray.push(data.slice(i, i + 4));
      }

      this.setData({ twoDimArray });
    },
  },
});
