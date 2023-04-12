import 'package:fl_chart/fl_chart.dart'
    show
        AxisTitles,
        BarAreaData,
        FlBorderData,
        FlDotData,
        FlGridData,
        FlLine,
        FlSpot,
        FlTitlesData,
        LineChart,
        LineChartBarData,
        LineChartData,
        SideTitleWidget,
        SideTitles,
        TitleMeta;
import 'package:flutter/material.dart';

import 'package:spica/components/utils/card.dart';
import 'package:spica/net/caiyun/model.dart';

const List<Color> gradientColors = [
  Color(0xff2196F3),
  Color(0xff64B5F6),
];

class Precip extends StatelessWidget {
  final Minutely minutely;

  const Precip({
    Key? key,
    required this.minutely,
  }) : super(key: key);

  @override
  Widget build(BuildContext context) {
    final notPrecip = minutely.precipitation2h.every(
      (e) => e == 0.0,
    );

    return Visibility(
      visible: !notPrecip,
      child: CustomCard(
        title: '2小时降水图',
        subTitle: minutely.description,
        child: Padding(
          padding: const EdgeInsets.only(
            left: 15,
            right: 15,
            bottom: 15,
          ),
          child: SizedBox(
            height: 150,
            child: LineChart(mainData()),
          ),
        ),
      ),
    );
  }

  Widget bottomTitleWidgets(double value, TitleMeta meta) {
    const style = TextStyle(
      color: Color(0xff90A4AE),
      fontSize: 15,
    );

    // 第 value 条轴线对应的 x 轴标题
    Widget text;
    switch (value.toInt()) {
      case 0:
        text = const Text('now', style: style);
        break;
      case 30:
        text = const Text('0.5h', style: style);
        break;
      case 60:
        text = const Text('1h', style: style);
        break;
      case 90:
        text = const Text('1.5h', style: style);
        break;
      default:
        text = const Text('', style: style);
        break;
    }

    return SideTitleWidget(
      axisSide: meta.axisSide,
      space: 8.0,
      child: text,
    );
  }

  // y 轴
  Widget leftTitleWidgets(double value, TitleMeta meta) {
    const style = TextStyle(
      color: Color(0xff90A4AE),
      fontSize: 15,
    );

    String text;
    switch ((value * 10).toInt()) {
      case 2:
        text = '中雨';
        break;
      case 4:
        text = '大雨';
        break;
      default:
        return Container();
    }

    return Text(
      text,
      style: style,
      textAlign: TextAlign.left,
    );
  }

  LineChartData mainData() {
    return LineChartData(
      gridData: FlGridData(
        show: true, // 显示背景网格
        drawVerticalLine: true, // 显示水平网格
        horizontalInterval: 0.1, // 水平网格间隔
        verticalInterval: 20, // 垂直网格间隔
        getDrawingHorizontalLine: (value) {
          // 水平网络线样式
          if (value == 0.2 || value == 0.4) {
            return FlLine(
              color: const Color(0xffB0BEC5),
              strokeWidth: 1,
            );
          }

          return FlLine(
            color: const Color(0xffCFD8DC),
            strokeWidth: 1,
            dashArray: [10, 10],
          );
        },
        getDrawingVerticalLine: (value) {
          // 垂直网络线样式
          return FlLine(
            color: const Color(0xffCFD8DC),
            strokeWidth: 1,
            dashArray: [10, 10],
          );
        },
      ),
      titlesData: FlTitlesData(
        show: true,
        rightTitles: AxisTitles(
          sideTitles: SideTitles(showTitles: false),
        ),
        topTitles: AxisTitles(
          sideTitles: SideTitles(showTitles: false),
        ),
        bottomTitles: AxisTitles(
          sideTitles: SideTitles(
            showTitles: true,
            reservedSize: 30,
            interval: 1,
            getTitlesWidget: bottomTitleWidgets,
          ),
        ),
        leftTitles: AxisTitles(
          sideTitles: SideTitles(
            showTitles: true,
            interval: 0.1,
            getTitlesWidget: leftTitleWidgets,
            reservedSize: 42,
          ),
        ),
      ),
      // 边框
      borderData: FlBorderData(
        show: true,
        border: Border.all(
          color: const Color(0xffCFD8DC),
          width: 1,
        ),
      ),
      minX: 0,
      maxX: 119,
      minY: 0,
      maxY: 0.6,
      lineBarsData: [
        LineChartBarData(
          spots: minutely.precipitation2h
              .asMap()
              .entries
              .map((e) => FlSpot(
                    e.key.toDouble(),
                    e.value.toDouble(),
                  ))
              .toList(),
          isCurved: true, // 曲线交汇处是否圆角
          // 线条渐变
          gradient: const LinearGradient(
            colors: gradientColors,
            begin: Alignment.centerLeft,
            end: Alignment.centerRight,
          ),
          barWidth: 2, // 线条宽度
          isStrokeCapRound: true, // 线条的开始和结束是否是圆角
          dotData: FlDotData(
            show: false, // 不显示顶点
          ),
          belowBarData: BarAreaData(
            // 曲线下方颜色
            show: true,
            gradient: LinearGradient(
              colors: gradientColors
                  .map((color) => color.withOpacity(0.3))
                  .toList(),
              begin: Alignment.topCenter,
              end: Alignment.bottomCenter,
            ),
          ),
        ),
      ],
    );
  }
}
