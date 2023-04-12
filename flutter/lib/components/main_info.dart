import 'package:flutter/material.dart';

class MainInfo extends StatelessWidget {
  final num temperature;
  final num feelsLike;
  final String description;
  final String airDescription;

  const MainInfo({
    Key? key,
    required this.temperature,
    required this.feelsLike,
    required this.airDescription,
    required this.description,
  }) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return Expanded(
      child: Container(
        padding: const EdgeInsets.symmetric(
          horizontal: 25,
          vertical: 15,
        ),
        width: double.infinity,
        child: Column(
          mainAxisAlignment: MainAxisAlignment.end,
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Text(
              '$temperature°',
              style: const TextStyle(
                fontSize: 70,
                color: Colors.white,
                fontWeight: FontWeight.bold,
              ),
            ),
            Text(
              "$description, 体感 $feelsLike°",
              style: const TextStyle(
                fontSize: 20,
                color: Colors.white,
              ),
            ),
            Text(
              "空气质量 - $airDescription",
              style: const TextStyle(
                fontSize: 15,
                color: Colors.white,
              ),
            ),
          ],
        ),
      ),
    );
  }
}
