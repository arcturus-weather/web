import 'package:fl_chart/fl_chart.dart'
    show
        AxisTitles,
        BackgroundBarChartRodData,
        BarChart,
        BarChartData,
        BarChartGroupData,
        BarChartRodData,
        BarTouchData,
        BarTouchTooltipData,
        FlBorderData,
        FlGridData,
        FlTitlesData,
        SideTitleWidget,
        SideTitles,
        TitleMeta;
import 'package:flutter/material.dart';
import 'package:get/get.dart';
import 'package:spica/components/utils/card.dart';
import 'package:spica/net/caiyun/model.dart';
import 'package:spica/components/chart/progress.dart';

const aqiMaxMap = {
  'pm25': 250.0,
  'pm10': 420.0,
  'o3': 800,
  'so2': 1600,
  'no2': 565.0,
  'co': 90,
};

class Air extends StatelessWidget {
  final AirQuality aqi;

  const Air({
    Key? key,
    required this.aqi,
  }) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return CustomCard(
      title: '空气质量',
      onTap: () {
        Get.toNamed('/air');
      },
      child: Padding(
        padding: const EdgeInsets.only(
          left: 10,
          right: 10,
          bottom: 10,
        ),
        child: Row(
          mainAxisAlignment: MainAxisAlignment.center,
          children: [
            CircularProgress(
              radius: 55,
              text: '${aqi.aqi.chn}',
              sub: aqi.description.chn,
              backgroundColor: const Color(0xFFC8E6C9),
              colors: const [Color(0xFFC8E6C9), Color(0xFF81C784)],
              value: aqi.aqi.chn.toDouble() / 500,
            ),
            Expanded(
              child: SizedBox(
                height: 120,
                child: BarChart(mainBarData()),
              ),
            ),
          ],
        ),
      ),
    );
  }

  BarChartData mainBarData() {
    return BarChartData(
      barTouchData: BarTouchData(
        touchTooltipData: BarTouchTooltipData(
          tooltipBgColor: Colors.blueGrey,
          getTooltipItem: (a, b, c, d) {
            return null;
          },
        ),
      ),
      titlesData: FlTitlesData(
        show: true,
        rightTitles: AxisTitles(
          sideTitles: SideTitles(showTitles: false),
        ),
        topTitles: AxisTitles(
          sideTitles: SideTitles(showTitles: false),
        ),
        // 仅显示 x 轴
        bottomTitles: AxisTitles(
          sideTitles: SideTitles(
            showTitles: true,
            getTitlesWidget: bottomTitles,
            reservedSize: 30,
          ),
        ),
        leftTitles: AxisTitles(
          sideTitles: SideTitles(showTitles: false),
        ),
      ),
      // 不显示边框
      borderData: FlBorderData(show: false),
      barGroups: showingGroups(),
      // 不显示网格线
      gridData: FlGridData(show: false),
    );
  }

  BarChartGroupData makeGroupData(
    int x,
    double y, {
    Color barColor = const Color(0xff66BB6A),
    double width = 12,
    List<int> showTooltips = const [],
  }) {
    return BarChartGroupData(
      x: x,
      barRods: [
        BarChartRodData(
          toY: y,
          color: barColor,
          width: width,
          // 进度颜色
          borderSide: const BorderSide(
            color: Colors.white,
            width: 1,
          ),
          // 背景颜色
          backDrawRodData: BackgroundBarChartRodData(
            show: true,
            toY: 20,
            color: const Color(0xffFAFAFA),
          ),
        ),
      ],
    );
  }

  // 数据
  List<BarChartGroupData> showingGroups() {
    final res = <BarChartGroupData>[];

    aqi.toJson().forEach((key, value) {
      if (key != 'aqi' && key != 'description') {
        res.add(makeGroupData(res.length + 1, value / aqiMaxMap[key] * 20));
      }
    });

    return res;
  }

  // 底部标签
  Widget bottomTitles(double value, TitleMeta meta) {
    const style = TextStyle(
      color: Color(0xff90A4AE),
      fontSize: 12,
    );

    final p = ['PM₂₅', 'PM₁₀', 'O₃', 'SO₂', 'NO₂', 'CO'];

    return SideTitleWidget(
      axisSide: meta.axisSide,
      space: 8,
      child: Text(
        p[value.toInt() - 1],
        style: style,
      ),
    );
  }
}
