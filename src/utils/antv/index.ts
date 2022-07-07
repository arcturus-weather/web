import { Gauge, Area, Liquid } from '@antv/g2plot';

export function guage(dom: HTMLElement | null | string, percent: number) {
  const gauge = new Gauge(dom ?? 'guage', {
    autoFit: true,
    renderer: 'svg',
    percent: 0,
    padding: 10,
    range: {
      ticks: [0, 1],
      color:
        'l(0) 0.17:#56B37F 0.33:#FCFF00 0.5:#FEC163 0.67:#FFAA85 0.83:#EE9AE5 1:#F05F57',
    },
    axis: {
      tickLine: null,
      label: {
        offset: 20,
        formatter(v) {
          return Number(v) * 500;
        },
      },
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
  });

  gauge.render();

  let data = 0;
  const interval = setInterval(() => {
    if (data >= percent) {
      clearInterval(interval);
    }
    data += 0.005;
    gauge.changeData(data > 1 ? data - 1 : data);
  }, 100);
}

export interface AreaDateItem {
  value: number;
  label: string;
}

export function area(dom: HTMLElement | null | string, data: AreaDateItem[]) {
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
      range: [0, 1],
    },
    yField: 'value',
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

export function liquid(dom: HTMLElement | null | string, percent: number) {
  const liquidPlot = new Liquid(dom ?? 'container', {
    percent,
    shape: 'rect',
    autoFit: true,
    outline: {
      border: 0,
      distance: 0,
    },
    renderer: 'svg',
    wave: {
      length: 128,
    },
  });

  liquidPlot.render();
}
