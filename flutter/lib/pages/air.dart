import 'package:flutter/material.dart';
import 'package:get/get.dart';

import 'package:fl_chart/fl_chart.dart'
    show
        AxisTitles,
        BarAreaData,
        BarChart,
        BarChartAlignment,
        BarChartData,
        BarChartGroupData,
        BarChartRodData,
        BarTouchData,
        BarTouchTooltipData,
        FlBorderData,
        FlDotCirclePainter,
        FlDotData,
        FlGridData,
        FlLine,
        FlSpot,
        FlTitlesData,
        LineChart,
        LineChartBarData,
        LineChartData,
        LineTouchData,
        SideTitleWidget,
        SideTitles,
        TitleMeta;
import 'package:intl/intl.dart';

import 'package:spica/components/utils/toggle.dart';
import 'package:spica/net/caiyun/model.dart';
import 'package:spica/store/caiyun.dart';

import 'package:spica/store/location.dart';

class AirPage extends StatelessWidget {
  const AirPage({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        actions: [
          IconButton(
            onPressed: () {},
            icon: const Icon(Icons.error_outline),
          )
        ],
        title: GetX<LocationController>(
          builder: (_) => Column(
            children: [
              Row(
                mainAxisAlignment: MainAxisAlignment.center,
                children: [
                  const Icon(
                    Icons.room,
                    size: 20,
                  ),
                  Text(
                    _.current.value.district,
                    style: const TextStyle(
                      fontSize: 20,
                    ),
                  ),
                ],
              ),
              Text(
                '${_.current.value.address}',
                style: TextStyle(
                  fontSize: 15,
                  color: Theme.of(context).textTheme.caption?.color,
                ),
              ),
            ],
          ),
        ),
      ),
      body: const SingleChildScrollView(
        child: AqiContent(),
      ),
    );
  }
}

class AqiContent extends StatelessWidget {
  const AqiContent({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return GetX<CaiyunController>(builder: (_) {
      final realtime = _.data.value!.result!.realtime;

      return Padding(
        padding: const EdgeInsets.symmetric(
          horizontal: 25,
          vertical: 15,
        ),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            const Padding(
              padding: EdgeInsets.only(
                bottom: 10,
              ),
              child: Text(
                '空气质量',
                style: TextStyle(fontSize: 25),
              ),
            ),
            RichText(
              text: TextSpan(
                style: const TextStyle(
                  fontSize: 80,
                  fontWeight: FontWeight.bold,
                  color: Colors.green,
                ),
                text: '${realtime.airQuality.aqi.chn}',
                children: [
                  const TextSpan(text: ' '),
                  TextSpan(
                    text: realtime.airQuality.description.chn,
                    style: const TextStyle(
                      fontSize: 20,
                    ),
                  ),
                ],
              ),
            ),
            buildPollutions(context, _),
            const Divider(),
            _AqiChart(),
          ],
        ),
      );
    });
  }

  Widget buildPollutions(BuildContext context, CaiyunController _) {
    final aqi = _.data.value!.result!.realtime.airQuality;

    List<Widget> p() {
      final res = <Widget>[];

      aqi.toJson().forEach((key, value) {
        if (key != 'description' && key != 'aqi') {
          res.add(
            Column(
              mainAxisAlignment: MainAxisAlignment.center,
              children: [
                Text(
                  '$value',
                  style: const TextStyle(
                    color: Colors.green,
                    fontWeight: FontWeight.bold,
                    fontSize: 20,
                  ),
                ),
                Text(
                  key,
                  style: TextStyle(
                    color: Theme.of(context).textTheme.caption!.color,
                  ),
                ),
              ],
            ),
          );
        }
      });

      return res;
    }

    return Container(
      padding: const EdgeInsets.symmetric(vertical: 10),
      height: 80,
      child: GridView(
        gridDelegate: const SliverGridDelegateWithFixedCrossAxisCount(
          crossAxisCount: 6,
        ),
        children: p(),
      ),
    );
  }
}

class _AqiChart extends StatefulWidget {
  @override
  State<StatefulWidget> createState() => _AqiChartState();
}

class _AqiChartState extends State<_AqiChart> {
  int _tabSelected = 0;

  final List<IconData> _icons = [
    Icons.schedule,
    Icons.calendar_month,
  ];

  final _label = ['24小时空气质量预报', '15天空气质量报告'];

  @override
  Widget build(BuildContext context) {
    return Padding(
      padding: const EdgeInsets.only(top: 20),
      child: SizedBox(
        height: 250,
        child: Column(
          children: [
            tooltip(),
            Expanded(
              child: Padding(
                padding: const EdgeInsets.symmetric(
                  vertical: 20,
                ),
                child: GetX<CaiyunController>(
                  builder: (_) => buildChart(_tabSelected, _.data.value!),
                ),
              ),
            )
          ],
        ),
      ),
    );
  }

  Widget tooltip() {
    return Row(
      mainAxisAlignment: MainAxisAlignment.spaceBetween,
      children: [
        Text(
          _label[_tabSelected],
          style: const TextStyle(
            fontSize: 18,
          ),
        ),
        ToggleTab(
          width: 25,
          selectedIndex: _tabSelected,
          selectedColor: Colors.white,
          unSelectedColor: Colors.black,
          icons: _icons,
          onSelect: (index) {
            setState(() {
              _tabSelected = index;
            });
          },
        ),
      ],
    );
  }

  Widget buildChart(int index, CaiyunModel data) {
    List<Widget> comps = [
      _HourlyBarChart(data: data),
      _DailyLineChart(data: data),
    ];

    return comps[index];
  }
}

// 24 小时空气质量预报
class _HourlyBarChart extends StatelessWidget {
  final CaiyunModel data;

  const _HourlyBarChart({
    Key? key,
    required this.data,
  }) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return BarChart(
      BarChartData(
        barTouchData: barTouchData,
        titlesData: titlesData,
        borderData: FlBorderData(
          show: false, // 不显示边框
        ),
        barGroups: barGroups(),
        gridData: FlGridData(
          show: true,
          drawVerticalLine: false,
          getDrawingHorizontalLine: (value) {
            return FlLine(
              color: const Color(0xffCFD8DC),
              strokeWidth: 1,
              dashArray: [5, 5],
            );
          },
        ),
        alignment: BarChartAlignment.spaceAround,
        maxY: data.result!.hourly.airQuality.aqi
                .reduce((v1, v2) {
                  return v1.value.chn > v2.value.chn ? v1 : v2;
                })
                .value
                .chn
                .toDouble() +
            20, // AQI 最大值 + 50
      ),
    );
  }

  BarTouchData get barTouchData {
    return BarTouchData(
      enabled: true,
      touchTooltipData: BarTouchTooltipData(
        tooltipBgColor: Colors.transparent,
        getTooltipItem: (a, b, c, d) {
          // 不显示条形图顶部标签
          return null;
        },
      ),
    );
  }

  Widget bottomTitles(double value, TitleMeta meta) {
    const style = TextStyle(
      color: Color(0xff90A4AE),
      fontSize: 15,
    );

    String text;

    final _ = data.result!.hourly.airQuality.aqi;

    switch (value.toInt()) {
      case 0:
        text = 'now';
        break;
      case 4:
        text = DateFormat("H:mm").format(_[4].datetime);
        break;
      case 8:
        text = DateFormat("H:mm").format(_[8].datetime);
        break;
      case 12:
        text = DateFormat("H:mm").format(_[12].datetime);
        break;
      case 16:
        text = DateFormat("H:mm").format(_[16].datetime);
        break;
      case 20:
        text = DateFormat("H:mm").format(_[20].datetime);
        break;
      default:
        text = '';
        break;
    }

    return SideTitleWidget(
      axisSide: meta.axisSide,
      space: 4.0, // 标题距离条形图起始点距离
      child: Text(text, style: style),
    );
  }

  // y 轴
  Widget leftTitles(double value, TitleMeta meta) {
    const style = TextStyle(
      color: Color(0xff90A4AE),
      fontSize: 15,
    );

    return Text(
      '${value.toInt()}',
      style: style,
      textAlign: TextAlign.left,
    );
  }

  // 轴线标题
  FlTitlesData get titlesData {
    return FlTitlesData(
      show: true,
      // x 轴
      bottomTitles: AxisTitles(
        sideTitles: SideTitles(
          showTitles: true,
          reservedSize: 30,
          getTitlesWidget: bottomTitles,
        ),
      ),
      // y 轴
      leftTitles: AxisTitles(
        sideTitles: SideTitles(
          showTitles: true,
          getTitlesWidget: leftTitles,
          reservedSize: 30,
          interval: 15,
        ),
      ),
      topTitles: AxisTitles(
        sideTitles: SideTitles(showTitles: false),
      ),
      rightTitles: AxisTitles(
        sideTitles: SideTitles(showTitles: false),
      ),
    );
  }

  final _barsGradient = const LinearGradient(
    colors: [
      Colors.lightBlueAccent,
      Colors.greenAccent,
    ],
    begin: Alignment.bottomCenter,
    end: Alignment.topCenter,
  );

  List<BarChartGroupData> barGroups() {
    return data.result!.hourly.airQuality.aqi
        .asMap()
        .entries
        .map(
          (e) => BarChartGroupData(
            x: e.key,
            barRods: [
              BarChartRodData(
                toY: e.value.value.chn.toDouble(),
                gradient: _barsGradient,
              )
            ],
            showingTooltipIndicators: [0],
          ),
        )
        .toList();
  }
}

// 15 天空气质量报告
class _DailyLineChart extends StatelessWidget {
  const _DailyLineChart({
    required this.data,
  });

  final CaiyunModel data;

  @override
  Widget build(BuildContext context) {
    return LineChart(
      LineChartData(
        lineTouchData: LineTouchData(
          enabled: false,
        ),
        gridData: FlGridData(
          show: true,
          drawVerticalLine: false,
          getDrawingHorizontalLine: (value) {
            return FlLine(
              color: const Color(0xffCFD8DC),
              strokeWidth: 1,
              dashArray: [5, 5],
            );
          },
        ),
        titlesData: FlTitlesData(
          bottomTitles: AxisTitles(
            sideTitles: SideTitles(
              showTitles: true,
              reservedSize: 32,
              interval: 1,
              getTitlesWidget: bottomTitles,
            ),
          ),
          rightTitles: AxisTitles(
            sideTitles: SideTitles(showTitles: false),
          ),
          topTitles: AxisTitles(
            sideTitles: SideTitles(showTitles: false),
          ),
          leftTitles: AxisTitles(
            sideTitles: SideTitles(
              getTitlesWidget: leftTitles,
              showTitles: true,
              interval: 30,
              reservedSize: 40,
            ),
          ),
        ),
        borderData: FlBorderData(show: false),
        lineBarsData: [createData()],
        maxX: 14,
        maxY: data.result!.daily.airQuality.aqi
                .reduce((v1, v2) {
                  return v1.avg.chn > v2.avg.chn ? v1 : v2;
                })
                .avg
                .chn
                .toDouble() +
            20,
      ),
    );
  }

  Widget leftTitles(double value, TitleMeta meta) {
    const style = TextStyle(
      color: Color(0xff90A4AE),
      fontWeight: FontWeight.bold,
      fontSize: 15,
    );

    return Text(
      '${value.toInt()}',
      style: style,
      textAlign: TextAlign.left,
    );
  }

  Widget bottomTitles(double value, TitleMeta meta) {
    const style = TextStyle(
      color: Color(0xff90A4AE),
      fontSize: 15,
    );

    String text;
    final _ = data.result!.daily.airQuality.aqi;

    switch (value.toInt()) {
      case 0:
        text = 'today';
        break;
      case 4:
        text = DateFormat("M-d").format(_[4].date);
        break;
      case 8:
        text = DateFormat("M-d").format(_[8].date);
        break;
      case 12:
        text = DateFormat("M-d").format(_[12].date);
        break;
      default:
        text = '';
        break;
    }

    return SideTitleWidget(
      axisSide: meta.axisSide,
      space: 10,
      child: Text(
        text,
        style: style,
      ),
    );
  }

  FlDotCirclePainter getDotPainer(
    FlSpot spot,
    double percent,
    LineChartBarData barData,
    int index,
  ) {
    return FlDotCirclePainter(
      radius: 2,
      strokeWidth: 1,
      strokeColor: Colors.white,
    );
  }

  LineChartBarData createData() {
    final _ = data.result!.daily.airQuality.aqi;

    return LineChartBarData(
      isCurved: true,
      dotData: FlDotData(
        show: true,
        getDotPainter: getDotPainer,
      ),
      curveSmoothness: 0,
      gradient: const LinearGradient(
        colors: [
          Color(0xff43A047),
          Color(0xffC8E6C9),
          Color(0xffFFC107),
        ],
        begin: Alignment.centerLeft,
        end: Alignment.centerRight,
      ),
      barWidth: 4, // 粗细
      isStrokeCapRound: true,
      belowBarData: BarAreaData(show: false),
      spots: _
          .asMap()
          .entries
          .map(
            (e) => FlSpot(
              e.key.toDouble(),
              e.value.avg.chn.toDouble(),
            ),
          )
          .toList(),
    );
  }
}
