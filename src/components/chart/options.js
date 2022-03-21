/***********************
 *      降水配置        *
 **********************/
export default function (data) {
  return {
    backgroundColor: 'transparent',
    // 提示框组件
    tooltip: {
      trigger: 'none', // 触发类型
      axisPointer: {
        // 坐标轴指示器配置项
        type: 'cross',
        label: {
          backgroundColor: '#6a7985',
        },
      },
    },
    // 直角坐标系网格
    grid: {
      left: '1%',
      top: '15%',
      right: '3%',
      bottom: '5%',
      containLabel: true,
    },
    xAxis: {
      // x 轴
      type: 'category',
      boundaryGap: false, // 坐标轴两边留白
      data: ['now', '0.5h', '1h', '1.5h', '2h'],
      splitLine: {
        lineStyle: {
          type: 'dashed', //虚线
        },
        show: true,
      },
      axisTick: {
        show: false, // 坐标轴刻度线
      },
      axisLine: {
        lineStyle: {
          type: 'dashed', //虚线
        },
      },
    },
    yAxis: {
      // y 轴
      name: '降雨(水)量',
      type: 'value',
      max: 0.4,
      splitLine: {
        lineStyle: {
          type: 'dashed', //虚线
        },
      },
      axisLine: {
        //轴线
        show: true,
        lineStyle: {
          type: 'dashed', //虚线
        },
      },
    },
    series: [
      {
        type: 'line',
        smooth: true,
        lineStyle: {
          width: 0,
        },
        showSymbol: false,
        areaStyle: {
          opacity: 0.5, // 图形透明度
          color: '#ABDCFF',
        },
        emphasis: {
          focus: 'series',
        },
        data,
      },
    ],
  };
}
