import 'package:flutter/material.dart';
import 'package:flutter_svg/flutter_svg.dart';
import 'package:intl/intl.dart';
import 'package:spica/components/utils/card.dart';
import 'package:spica/net/caiyun/model.dart';

import 'chart/bar_char.dart';
import 'chart/line_chart.dart';

class DayItem extends StatelessWidget {
  final DateTime date;
  final String iconDay;
  final String iconNight;
  final double probability;

  final List<double> lineData_1;
  final List<double> lineData_2;
  final bool isFirst;
  final bool isLast;
  final double max;
  final double min;

  const DayItem({
    Key? key,
    required this.date,
    required this.iconDay,
    required this.iconNight,
    required this.lineData_1,
    required this.lineData_2,
    this.isFirst = false,
    this.isLast = false,
    required this.max,
    required this.min,
    required this.probability,
  }) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return SizedBox(
      width: 80,
      child: InkWell(
        onTap: () {}, // 点击事件
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.center,
          mainAxisAlignment: MainAxisAlignment.start,
          children: [
            Text(
              DateFormat('EEE', "zh_CN").format(date),
              style: const TextStyle(
                fontWeight: FontWeight.bold,
              ),
            ),
            Padding(
              padding: const EdgeInsets.only(top: 10),
              child: SvgPicture.asset(
                'assets/caiyun/$iconDay.svg',
                width: 50,
                height: 50,
              ),
            ),
            Expanded(
              child: Padding(
                padding: const EdgeInsets.symmetric(
                  vertical: 25,
                ),
                child: Stack(
                  children: [
                    // 降水概率
                    CustomOneBarChart(
                      max: 100,
                      label: '$probability%',
                      value: probability.toDouble(),
                      color: const Color(0xff64B5F6).withOpacity(0.5),
                    ),
                    // 折线图
                    CustomLineChart(
                      lineData: [lineData_1, lineData_2],
                      isFirst: isFirst,
                      isLast: isLast,
                      max: max + 5,
                      min: min - 5,
                    ),
                  ],
                ),
              ),
            ),
            Padding(
              padding: const EdgeInsets.only(bottom: 20),
              child: SvgPicture.asset(
                'assets/caiyun/$iconNight.svg',
                width: 50,
                height: 50,
              ),
            ),
          ],
        ),
      ),
    );
  }
}

class Days extends StatelessWidget {
  final Daily daily;
  final Widget leading;

  const Days({
    Key? key,
    required this.daily,
    required this.leading,
  }) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return CustomCard(
      title: '每日概览',
      leading: leading,
      child: SizedBox(
        height: 280,
        child: ListView(
          physics: const BouncingScrollPhysics(),
          scrollDirection: Axis.horizontal,
          children: buildDaily(),
        ),
      ),
    );
  }

  List<Widget> buildDaily() {
    final res = <Widget>[];
    final list = daily.temperature;

    // 24 小时内温度极值
    final double max = daily.temperature.reduce((value, element) {
      return value.max > element.max ? value : element;
    }).max;

    final double min = daily.temperature.reduce((value, element) {
      return value.max < element.max ? value : element;
    }).max;

    for (int i = 0; i < list.length; i++) {
      if (i == 0) {
        double right_1 = (list[i].max + list[i + 1].max) / 2;
        double right_2 = (list[i].min + list[i + 1].min) / 2;

        res.add(
          DayItem(
            date: daily.temperature[i].date,
            iconDay: daily.skycon08h20h[i].value,
            iconNight: daily.skycon20h32h[i].value,
            isFirst: true,
            lineData_1: [list[i].max, right_1],
            lineData_2: [list[i].min, right_2],
            max: max,
            min: min,
            probability: daily.precipitation[i].probability,
          ),
        );
      } else if (i == list.length - 1) {
        double left_1 = (list[i].max + list[i - 1].max) / 2;
        double left_2 = (list[i].min + list[i - 1].min) / 2;

        res.add(
          DayItem(
            date: daily.temperature[i].date,
            iconDay: daily.skycon08h20h[i].value,
            iconNight: daily.skycon20h32h[i].value,
            isLast: true,
            lineData_1: [left_1, list[i].max],
            lineData_2: [left_2, list[i].min],
            max: max,
            min: min,
            probability: daily.precipitation[i].probability,
          ),
        );
      } else {
        double left_1 = (list[i].max + list[i - 1].max) / 2;
        double left_2 = (list[i].min + list[i - 1].min) / 2;
        double right_1 = (list[i].max + list[i + 1].max) / 2;
        double right_2 = (list[i].min + list[i + 1].min) / 2;

        res.add(
          DayItem(
            date: daily.temperature[i].date,
            iconDay: daily.skycon08h20h[i].value,
            iconNight: daily.skycon20h32h[i].value,
            lineData_1: [left_1, list[i].max, right_1],
            lineData_2: [left_2, list[i].min, right_2],
            max: max,
            min: min,
            probability: daily.precipitation[i].probability,
          ),
        );
      }
    }

    return res;
  }
}
