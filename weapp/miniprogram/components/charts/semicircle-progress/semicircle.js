import { Canvas } from '../canvas';

export default class semicircle extends Canvas {
  constructor(chart) {
    super(chart);
  }

  /**
   * 初始化图表
   * @param {Object} option
   * option = {
   *    textStyle: {
   *       color: '#fff',
   *       fontSize: '40px',
   *       fontFamily: 'Microsoft YaHei',
   *       textAlign: 'center',
   *    },
   *    data: {
   *       value: 20,
   *       max: 30,
   *       min: 20,
   *       itemStyle: {
   *         activeColor: '#56B37F',
   *         gradientColor: '#c0e674',
   *         backgroundColor: '#eaeff4', // 底色
   *         width: 10, // 进度条粗细
   *       },
   *       sub: {
   *          color: '#707070',
   *          value: '优',
   *       }
   *    }
   * };
   */
  init(options) {
    const { textStyle, data } = options;

    // 必须存在 value 才开始绘制
    if (data?.value) {
      this.ctx.textAlign = textStyle?.textAlign || 'center';
      this.ctx.font = `bold ${textStyle?.fontSize || '40px'} ${
        textStyle?.fontFamily || 'monospace'
      }`;
      this.ctx.textBaseline = 'middle';

      this.drawText(data); // 绘制文本
      this.drawProgress(data); // 绘制进度
    }
  }

  // 设置样式
  setGradientStyle(activeColor, gradientColor) {
    if (activeColor && gradientColor) {
      const grd = this.ctx.createLinearGradient(0, 0, 0, 90);
      grd.addColorStop(0, activeColor);
      grd.addColorStop(1, gradientColor);
      this.ctx.fillStyle = grd;
      this.ctx.strokeStyle = grd;
    } else if (activeColor) {
      this.ctx.fillStyle = activeColor;
      this.ctx.strokeStyle = activeColor;
    } else {
      this.ctx.fillStyle = '#56B37F';
      this.ctx.strokeStyle = '#56B37F';
    }
  }

  // 绘制文字
  drawText(data) {
    const { itemStyle, sub } = data;
    this.setGradientStyle(itemStyle?.activeColor, itemStyle?.gradientColor);
    this.ctx.fillText(data.value, this.width / 2, this.height / 2);

    if (sub?.value) {
      // 存在小标题
      this.ctx.font = 'bold 15px monospace';
      this.ctx.fillStyle = sub?.color || '#707070';
      this.ctx.fillText(sub.value, this.width / 2, this.height / 2 + 30);
    }
  }

  // 绘制环形进度条
  drawProgress(data) {
    const { width, height } = this;
    const { itemStyle, max, min } = data;

    const Max = max || 100; // 默认最大值 100
    const Min = min || 0; // 默认最小值 0
    const percentage = data.value / (Max - Min); // 计算百分比

    // 样式
    this.ctx.lineWidth = itemStyle?.width || 10;
    this.ctx.lineCap = 'round';
    this.ctx.strokeStyle = itemStyle?.backgroundColor || '#eaeff4';

    // 底圆
    this.ctx.beginPath();
    this.ctx.arc(
      width / 2, // x
      height / 2, // y
      width / 2 - 10, // 半径
      (3 / 4) * Math.PI, // 左下角开始
      (9 / 4) * Math.PI // 到右下角结束
    );
    this.ctx.stroke();

    // 进度
    this.ctx.beginPath();
    this.ctx.arc(
      width / 2,
      height / 2,
      width / 2 - 10,
      (3 / 4) * Math.PI,
      this.percentageToAngle(percentage)
    );

    this.setGradientStyle(itemStyle?.activeColor, itemStyle?.gradientColor);
    this.ctx.stroke();
  }

  /**
   * 分数转弧度
   * 四分之三圆, 3 点钟方向顺时针 (3 / 4) * Math.PI 为起点
   * @param {Number} percentage
   */
  percentageToAngle(percentage) {
    const deltaAngle = (3 / 2) * Math.PI; // 进度条总度数
    const start = (3 / 4) * Math.PI; // 地点度数

    if (percentage >= 1) {
      return deltaAngle + start;
    } else if (percentage <= 0) {
      return start;
    } else {
      return deltaAngle * percentage + start;
    }
  }
}
