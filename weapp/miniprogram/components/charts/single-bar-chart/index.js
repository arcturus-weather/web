Component({
  properties: {
    backgroundColor: {
      type: String,
      value: '#7bc8ff',
    },
    max: Number, // 最大值
    min: Number, // 最小值
    average: Number, // 平均值
    delta: Number, // 允许的最大最小值差
  },
  data: {
    height: 0,
    offset: 0,
  },
  lifetimes: {
    ready() {
      this.createSelectorQuery()
        .in(this)
        .select('.bar-container')
        .boundingClientRect(rect => {
          // 这里减去两个字体的大小(28px))和 8px 的 margin
          const height = rect.height * 0.6;
          const max = this.data.max;
          const min = this.data.min;
          const delta = this.data.delta;
          const average = this.data.average;

          const step = height / delta;
          this.setData({
            height: step * (max - min),
            offset: (average - (max + min) / 2) * step,
          });
        })
        .exec();
    },
  },
});
