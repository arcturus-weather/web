// 引入 echarts 核心模块
import * as echarts from 'echarts/core';

// 引入折线图
import { LineChart } from 'echarts/charts';

// 引入提示框, 标题, 直角坐标系, 数据集, 内置数据转换器组件
import {
  TitleComponent,
  ToolboxComponent,
  TooltipComponent,
  GridComponent,
  LegendComponent,
  DataZoomComponent,
} from 'echarts/components';

// 标签自动布局, 全局过渡动画等特性
import { UniversalTransition } from 'echarts/features';

// 引入 SVG 渲染器
import { SVGRenderer } from 'echarts/renderers';

// 注册必须的组件
echarts.use([
  TitleComponent,
  ToolboxComponent,
  TooltipComponent,
  GridComponent,
  LegendComponent,
  LineChart,
  SVGRenderer,
  UniversalTransition,
  DataZoomComponent,
]);

export default echarts;
