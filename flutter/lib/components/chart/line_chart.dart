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
        LineBarSpot,
        LineChart,
        LineChartBarData,
        LineChartData,
        LineTooltipItem,
        LineTouchData,
        LineTouchTooltipData,
        ShowingTooltipIndicators,
        SideTitles,
        TouchedSpotIndicatorData;
import 'package:flutter/material.dart';

// 折线图
class CustomLineChart extends StatelessWidget {
  final List<List<double>> lineData;
  final bool isLast;
  final bool isFirst;
  final double max;
  final double min;

  const CustomLineChart({
    Key? key,
    required this.lineData,
    required this.isLast,
    required this.isFirst,
    required this.max,
    required this.min,
  }) : super(key: key);

  LineChartBarData calcLineChartBarData(List<double> lineData) {
    final spot = <FlSpot>[];

    // 每个时刻最多三个数据
    if (isFirst) {
      spot.add(FlSpot(1, lineData[0]));
      spot.add(FlSpot(2, lineData[1]));
    } else if (isLast) {
      spot.add(FlSpot(0, lineData[0]));
      spot.add(FlSpot(1, lineData[1]));
    } else {
      spot.add(FlSpot(0, lineData[0]));
      spot.add(FlSpot(1, lineData[1]));
      spot.add(FlSpot(2, lineData[2]));
    }

    return LineChartBarData(
      shadow: Shadow(
        color: const Color(0xff42A5F5).withOpacity(0.2),
        offset: const Offset(0, 1),
        blurRadius: 5,
      ),
      isCurved: false,
      color: const Color(0xff4FC3F7),
      barWidth: 4,
      isStrokeCapRound: true,
      dotData: FlDotData(show: false),
      spots: spot,
      belowBarData: BarAreaData(
        show: true,
        gradient: LinearGradient(
          colors: [
            const Color(0xff90CAF9).withOpacity(0.4),
            const Color(0xffE3F2FD).withOpacity(0.1),
          ],
          begin: Alignment.topCenter,
          end: Alignment.bottomCenter,
        ),
      ),
    );
  }

  @override
  Widget build(BuildContext context) {
    final indicators = <ShowingTooltipIndicators>[];
    final lineChartBarDatas = <LineChartBarData>[];

    for (int i = 0; i < lineData.length; i++) {
      lineChartBarDatas.add(calcLineChartBarData(lineData[i]));

      if (isFirst) {
        indicators.add(
          ShowingTooltipIndicators([
            LineBarSpot(
              lineChartBarDatas[i],
              0,
              lineChartBarDatas[i].spots[0],
            ),
          ]),
        );
      } else {
        indicators.add(
          ShowingTooltipIndicators([
            LineBarSpot(
              lineChartBarDatas[i],
              0,
              lineChartBarDatas[i].spots[1],
            ),
          ]),
        );
      }
    }

    return LineChart(
      LineChartData(
        showingTooltipIndicators: indicators,
        lineTouchData: LineTouchData(
          enabled: false,
          getTouchedSpotIndicator: (
            LineChartBarData barData,
            List<int> spotIndexes,
          ) {
            return spotIndexes.map((index) {
              return TouchedSpotIndicatorData(
                FlLine(
                  color: Colors.transparent,
                ),
                FlDotData(show: false),
              );
            }).toList();
          },
          touchTooltipData: LineTouchTooltipData(
            tooltipPadding: EdgeInsets.zero,
            tooltipMargin: 2,
            tooltipBgColor: Colors.transparent,
            getTooltipItems: (List<LineBarSpot> lineBarsSpot) {
              return lineBarsSpot.map((lineBarSpot) {
                return LineTooltipItem(
                  '${lineBarSpot.y}°',
                  TextStyle(
                    color: Theme.of(context).textTheme.bodyText1?.color,
                  ),
                );
              }).toList();
            },
          ),
        ),
        gridData: FlGridData(
          show: true,
          drawVerticalLine: true,
          getDrawingHorizontalLine: (value) {
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
          bottomTitles: AxisTitles(
            sideTitles: SideTitles(showTitles: false),
          ),
          rightTitles: AxisTitles(
            sideTitles: SideTitles(showTitles: false),
          ),
          topTitles: AxisTitles(
            sideTitles: SideTitles(showTitles: false),
          ),
          leftTitles: AxisTitles(
            sideTitles: SideTitles(showTitles: false),
          ),
        ),
        borderData: FlBorderData(
          show: false,
        ),
        lineBarsData: lineChartBarDatas,
        minX: 0,
        maxX: 2,
        maxY: max,
        minY: min,
      ),
    );
  }
}
