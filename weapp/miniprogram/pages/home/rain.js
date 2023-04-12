/**
 * 降雨量配置
 */
export default function () {
  return {
    textStyle: {
      color: '#000',
      fontSize: 14,
    },
    series: [
      {
        data: [],
        lineStyle: {
          backgroundColor: 'rgba(140, 197, 255, 0.7)',
        },
      },
    ],
    XAxis: ['now', '0.5h', '1h', '1.5h', '2h'],
    YAxis: [
      {
        name: '大',
        value: 1.8,
      },
      {
        name: '中',
        value: 0.57,
      },
      {
        name: '小',
        value: 0.06,
      },
    ],
  };
}
