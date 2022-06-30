import { Gauge, Area } from '@antv/g2plot';

export function guage(dom: HTMLElement | null, percent: number) {
  const gauge = new Gauge(dom ?? 'guage', {
    autoFit: true,
    percent: percent,
    type: 'meter',
    innerRadius: 0.75,
    range: {
      ticks: [0, 50, 100, 150, 200, 300, 500],
      color: ['#56B37F', '#FCFF00', '#FEC163', '#FFAA85', '#EE9AE5', '#F05F57'],
    },
    indicator: {
      pointer: {
        style: {
          stroke: '#D0D0D0',
        },
      },
      pin: {
        style: {
          stroke: '#D0D0D0',
        },
      },
    },
    statistic: {
      content: {
        style: {
          fontSize: '36px',
          lineHeight: '36px',
        },
      },
    },
  });

  gauge.render();
}

export interface AreaDateItem {
  temp: number;
  label: string;
}

export function area(dom: HTMLElement | null, data: AreaDateItem[]) {
  const area = new Area(dom ?? 'area', {
    data,
    xField: 'label',
    startOnZero: false,
    yAxis: {
      label: null,
      grid: {
        line: {
          style: {
            lineDash: [5, 2],
          },
        },
      },
    },
    xAxis: {
      label: null,
      line: null,
    },
    yField: 'temp',
    autoFit: true,
    renderer: 'svg',
    areaStyle: () => {
      return {
        fill: 'l(270) 0:#ffffff 0.5:#7ec2f3 1:#1890ff',
      };
    },
    smooth: true,
  });

  area.render();
}
