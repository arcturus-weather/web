import 'dart:math';
import 'package:flutter/material.dart';

class CircularProgress extends StatelessWidget {
  final double strokeWidth;
  final bool strokeCapRound;
  final double value;
  final Color backgroundColor;
  final List<Color>? colors;
  final double total;
  final double radius;
  final double angle;
  final List<double>? stops;
  final EdgeInsets padding;
  final EdgeInsets margin;
  final String? text;
  final String? sub;

  const CircularProgress({
    Key? key,
    required this.value,
    this.backgroundColor = const Color(0xFFEBEEF5),
    this.strokeWidth = 10,
    this.padding = EdgeInsets.zero,
    this.margin = const EdgeInsets.all(10),
    this.strokeCapRound = true,
    this.total = 3 / 2 * pi,
    this.radius = 100,
    this.angle = pi * 3 / 4,
    this.colors,
    this.stops,
    this.text,
    this.sub,
  }) : super(key: key);

  @override
  Widget build(BuildContext context) {
    double _offset = .0;

    if (strokeCapRound) {
      _offset = asin(strokeWidth / (radius * 2 - strokeWidth));
    }

    List<Color> _colors;

    if (colors == null) {
      // 如果不存在自定义颜色, 则使用主题颜色
      Color color = Theme.of(context).colorScheme.secondary;
      _colors = [color, color];
    } else {
      _colors = colors!;
    }

    return Container(
      padding: padding,
      margin: margin,
      child: Stack(
        alignment: Alignment.center,
        children: [
          if (text != null)
            Positioned(
              child: Text(
                text!,
                style: TextStyle(
                  fontSize: radius * 0.7,
                ),
              ),
            ),
          if (sub != null)
            Positioned(
              bottom: 5,
              child: Text(sub!),
            ),
          Transform.rotate(
            angle: angle - _offset,
            child: CustomPaint(
              size: Size.fromRadius(radius),
              painter: _GradientCircularProgressPainter(
                strokeWidth: strokeWidth,
                strokeCapRound: strokeCapRound,
                backgroundColor: backgroundColor,
                value: value,
                total: total,
                radius: radius,
                colors: _colors,
                stops: stops ?? [0, 1],
              ),
            ),
          ),
        ],
      ),
    );
  }
}

class _GradientCircularProgressPainter extends CustomPainter {
  final double strokeWidth; // 粗细
  final bool strokeCapRound; // 边缘是否圆角
  final double value;
  final Color backgroundColor;
  final List<Color> colors;
  final double total; // 进度条总弧度
  final double radius;
  final List<double> stops; // 渐变结束位置

  _GradientCircularProgressPainter({
    required this.colors,
    required this.stops,
    required this.value,
    this.radius = 100,
    this.strokeWidth = 10.0,
    this.strokeCapRound = false,
    this.backgroundColor = const Color(0xFFEEEEEE),
    this.total = 2 * pi,
  });

  @override
  void paint(Canvas canvas, Size size) {
    size = Size.fromRadius(radius);

    double _offset = strokeWidth / 2.0;
    double _value = value.clamp(0.0, 1.0) * total;
    double _start = 0.0;

    if (strokeCapRound) {
      _start = asin(strokeWidth / (size.width - strokeWidth));
    }

    Rect rect = Offset(_offset, _offset) &
        Size(size.width - strokeWidth, size.height - strokeWidth);

    var paint = Paint()
      ..strokeCap = strokeCapRound ? StrokeCap.round : StrokeCap.butt
      ..style = PaintingStyle.stroke
      ..isAntiAlias = true
      ..strokeWidth = strokeWidth;

    // 背景
    if (backgroundColor != Colors.transparent) {
      paint.color = backgroundColor;
      canvas.drawArc(rect, _start, total, false, paint);
    }

    // 前景
    if (_value > 0) {
      paint.shader = SweepGradient(
        startAngle: 0.0,
        endAngle: _value,
        colors: colors,
        stops: stops,
      ).createShader(rect);

      canvas.drawArc(rect, _start, _value, false, paint);
    }
  }

  @override
  bool shouldRepaint(CustomPainter oldDelegate) => true;
}
