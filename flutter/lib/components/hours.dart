import 'package:flutter/material.dart';
import 'package:flutter_svg/svg.dart';
import 'package:intl/intl.dart';

import 'package:spica/components/utils/card.dart';
import 'package:spica/net/caiyun/model.dart';

import 'chart/bar_char.dart';
import 'chart/line_chart.dart';

class HourItem extends StatelessWidget {
  final DateTime time;
  final double deg;
  final double speed;
  final String icon;
  final double probability;

  // 用于绘图
  final List<double> lineData;
  final bool isFirst;
  final bool isLast;
  final double max;
  final double min;

  const HourItem({
    Key? key,
    required this.time,
    required this.deg,
    required this.speed,
    required this.icon,
    required this.lineData,
    required this.max,
    required this.min,
    this.isLast = false,
    this.isFirst = false,
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
              '${DateFormat("H").format(time)}时',
              style: const TextStyle(
                fontSize: 15,
                fontWeight: FontWeight.bold,
              ),
            ),
            Text(
              DateFormat("M-d").format(time),
              style: TextStyle(
                color: Theme.of(context).textTheme.caption?.color,
              ),
            ),
            Padding(
              padding: const EdgeInsets.symmetric(vertical: 10),
              child: SvgPicture.asset(
                'assets/caiyun/$icon.svg',
                width: 50,
                height: 50,
              ),
            ),
            // 折线图
            Expanded(
              child: Padding(
                padding: const EdgeInsets.symmetric(
                  vertical: 25,
                ),
                child: Stack(
                  children: [
                    // 降水概率
                    CustomOneBarChart(
                      max: 100.0,
                      label: '$probability%',
                      value: probability,
                      color: const Color(0xff64B5F6).withOpacity(0.5),
                    ),
                    // 折线图
                    CustomLineChart(
                      lineData: [lineData],
                      isFirst: isFirst,
                      isLast: isLast,
                      max: max + 5,
                      min: min - 5,
                    ),
                  ],
                ),
              ),
            )
          ],
        ),
      ),
    );
  }
}

class Hours extends StatelessWidget {
  final Hourly hourly;

  const Hours({
    Key? key,
    required this.hourly,
  }) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return CustomCard(
      title: '小时概览',
      subTitle: hourly.description,
      child: SizedBox(
        height: 240,
        child: ListView(
          physics: const BouncingScrollPhysics(),
          scrollDirection: Axis.horizontal,
          children: buildHours(),
        ),
      ),
    );
  }

  List<Widget> buildHours() {
    final res = <Widget>[];
    final list = hourly.temperature;

    // 24 小时内温度极值
    final double max = hourly.temperature.reduce((value, element) {
      return value.value > element.value ? value : element;
    }).value;

    final double min = hourly.temperature.reduce((value, element) {
      return value.value < element.value ? value : element;
    }).value;

    for (int i = 0; i < list.length; i++) {
      if (i == 0) {
        double right = (list[i].value + list[i + 1].value) / 2;

        res.add(
          HourItem(
            time: hourly.temperature[i].datetime,
            deg: hourly.wind[i].direction,
            speed: hourly.wind[i].speed,
            icon: hourly.skycon[i].value,
            lineData: [list[i].value, right],
            probability: hourly.precipitation[i].probability,
            isFirst: true,
            max: max,
            min: min,
          ),
        );
      } else if (i == list.length - 1) {
        double left = (list[i].value + list[i - 1].value) / 2;

        res.add(
          HourItem(
            time: hourly.temperature[i].datetime,
            deg: hourly.wind[i].direction,
            speed: hourly.wind[i].speed,
            icon: hourly.skycon[i].value,
            lineData: [left, list[i].value],
            probability: hourly.precipitation[i].probability,
            isLast: true,
            max: max,
            min: min,
          ),
        );
      } else {
        double left = (list[i].value + list[i - 1].value) / 2;
        double right = (list[i].value + list[i + 1].value) / 2;

        res.add(
          HourItem(
            time: hourly.temperature[i].datetime,
            deg: hourly.wind[i].direction,
            speed: hourly.wind[i].speed,
            icon: hourly.skycon[i].value,
            lineData: [left, list[i].value, right],
            probability: hourly.precipitation[i].probability,
            max: max,
            min: min,
          ),
        );
      }
    }

    return res;
  }
}
