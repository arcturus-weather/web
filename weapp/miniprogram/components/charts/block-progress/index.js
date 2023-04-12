Component({
  properties: {
    max: {
      // 最大值
      type: Number,
      value: 100,
    },
    min: {
      // 最小值
      type: Number,
      value: 0,
    },
    value: Number, // 当前值
    desc: String,
    sub: String,
    backgroundColor: {
      // 进度条底色
      type: String,
      value: '#eaeff4',
    },
    activeColor: {
      type: String,
      value: '#70F570',
    },
    active: {
      // 是否开启动画
      type: Boolean,
      value: true,
    },
    duration: {
      type: Number,
      value: 40,
    },
  },
  data: {
    height: 0,
    percent: 0,
  },
  lifetimes: {
    ready() {
      const { value, max, min } = this.data;

      this.createSelectorQuery()
        .in(this)
        .select('.progress-container')
        .boundingClientRect(rect => {
          const height = rect.height;
          const percent = (value / (max - min)) * 100; // 计算百分比

          this.setData({ height, percent });
        })
        .exec();
    },
  },
});
