import 'package:fl_chart/fl_chart.dart'
    show
        BarChart,
        BarChartData,
        BarChartGroupData,
        BarChartRodData,
        FlBorderData,
        FlGridData,
        FlTitlesData;
import 'package:flutter/cupertino.dart';

// 单一数值柱状图
class CustomOneBarChart extends StatelessWidget {
  final double value;
  final bool showGrid;
  final double max;
  final Gradient? gradient;
  final Color? color;
  final String? label;

  const CustomOneBarChart({
    Key? key,
    required this.value,
    required this.max,
    this.showGrid = true,
    this.gradient,
    this.color,
    this.label,
  }) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return Stack(
      alignment: Alignment.center,
      clipBehavior: Clip.none,
      children: [
        BarChart(
          BarChartData(
            titlesData: FlTitlesData(show: false),
            borderData: FlBorderData(show: false),
            barGroups: [
              // 这里只有一条数据
              BarChartGroupData(
                x: 0,
                barRods: [
                  BarChartRodData(
                    toY: value,
                    gradient: gradient,
                    color: color,
                  )
                ],
              ),
            ],
            gridData: FlGridData(show: false),
            maxY: max,
          ),
        ),
        if (label != null)
          Positioned(
            child: Text(
              label!,
              style: const TextStyle(
                color: Color(0xff90A4AE),
              ),
            ),
            bottom: -17,
          ),
      ],
    );
  }
}
