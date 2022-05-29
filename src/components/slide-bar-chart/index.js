/**
 * 将一个数扩大成最接近于它的整 5 倍
 * @param {Number} n
 */
function ceilToTen(n) {
  return Math.ceil(n / 5) * 5;
}

Component({
  properties: {
    chartData: Array, // 接收的数据
    chartHeight: {
      type: Number, // 条形图高度默认 300rpx
      value: 300,
    },
    showYAxis: {
      // 是否显示 y 轴
      type: Boolean,
      value: true,
    },
  },

  data: {
    YAxis: [], // Y 轴数据
    YAxisHeight: 0, // Y 轴高度
    currentIndex: 0, // 当前位置
    scrollWidth: 0, // scroll-view 的实际宽度
    scrollEnd: 0, // scroll-view 拉到底时滑动距离
    barWidth: 0, // bar 的总宽度(包括 padding)
    barVisWidth: 0, // bar 的可见宽度
  },

  lifetimes: {
    ready() {
      const height = this.data.chartHeight - 60; // 顶部留 60 rpx 的空白
      const data = this.data.chartData;

      const value = data.map(e => e.value); // 用于后面计算最大值

      const Max = ceilToTen(Math.max(...value));

      data.forEach(e => {
        e.height = height * (e.value / Max);
      });

      this.setData({
        chartData: data,
        YAxis: [Max, Max / 2, 0],
        YAxisHeight: height,
      });

      // 获取 scroll-view 的宽度和单个 bar 的总宽度(包括 padding)
      this.createSelectorQuery()
        .in(this)
        .selectAll('.slide-chart-item')
        .boundingClientRect(rect => {
          this.setData({
            scrollWidth: rect.length * rect[0].width,
            barWidth: rect[0].width,
          });
        })
        .exec();

      // 获取单个 bar 的宽度(不包括 padding)
      this.createSelectorQuery()
        .in(this)
        .select('.slide-bar')
        .boundingClientRect(rect => {
          this.setData({
            barVisWidth: rect.width,
          });
        })
        .exec();

      // 获取 scroll-view 的拉到底时滑动距离
      this.createSelectorQuery()
        .in(this)
        .select('.slide-charts')
        .boundingClientRect(rect => {
          this.setData({
            scrollEnd: this.data.scrollWidth - rect.width,
          });
        })
        .exec();

      // 设置提示框绝对定位的 left
      this.createSelectorQuery()
        .in(this)
        .select('.tip')
        .boundingClientRect(rect => {
          // 这里减去 barVisWidth 是为了让最后一个提示框右边对齐 bar 的右边
          const width = rect.width - this.data.barVisWidth;
          // 这是数据提示框的宽度
          const tipWidth = rect.width - 2 * this.data.barVisWidth;
          const data = this.data.chartData;
          const count = data.length - 1;

          data.forEach((e, i) => {
            // 按一定比例换算每个 tip 绝对定位的 left
            e.left = -width * (i / count);
            // Tip 小三角绝对定位的 left, 这个方向与 tip 相反
            e.tipLeft = tipWidth * (i / count);
          });

          this.setData({
            chartData: data,
          });
        })
        .exec();
    },
  },

  methods: {
    // 正在滑动
    scroll(e) {
      // 防止滑到底了还可以继续滑...
      if (e.detail.scrollLeft <= this.data.scrollEnd) {
        const percent = e.detail.scrollLeft / this.data.scrollEnd;
        const loc = this.data.scrollWidth * percent;
        const currentIndex = Math.floor(loc / this.data.barWidth);
        this.setData({ currentIndex });
      }
    },
  },
});
