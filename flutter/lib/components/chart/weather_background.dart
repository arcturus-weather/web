import 'package:flutter/material.dart';

// 天气背景
class WeatherBackGround extends StatelessWidget {
  final String? type;

  const WeatherBackGround({
    Key? key,
    this.type,
  }) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return Container(
      decoration: const BoxDecoration(
        color: Color(0xFF42A5F5),
      ),
    );
  }
}
