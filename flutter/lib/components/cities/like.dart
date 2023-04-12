import 'package:flutter/material.dart';
import 'package:flutter_svg/flutter_svg.dart';
import 'package:spica/components/chart/weather_background.dart';

class Like extends StatelessWidget {
  final void Function()? onTap; // 点击事件
  final String location;
  final String weather;
  final String detail;
  final bool isCurrent;
  final String icon;
  final String? type;
  final void Function(DismissDirection)? onDismissed;

  const Like({
    required Key? key,
    required this.location,
    required this.weather,
    required this.detail,
    this.type,
    required this.icon,
    this.onTap,
    this.isCurrent = false,
    this.onDismissed,
  }) : super(key: key);

  Widget _secondBackground() {
    return Container(
      color: Colors.red,
      child: Align(
        alignment: Alignment.centerRight,
        child: Padding(
          padding: const EdgeInsets.symmetric(horizontal: 20.0),
          child: Column(
            mainAxisAlignment: MainAxisAlignment.center,
            mainAxisSize: MainAxisSize.min,
            children: const [
              Icon(Icons.delete_forever, color: Colors.white, size: 18.0),
              SizedBox(height: 5.0),
              Text('Delete', style: TextStyle(color: Colors.white))
            ],
          ),
        ),
      ),
    );
  }

  Widget _background() {
    return Container(
      color: Colors.green,
      child: Align(
        alignment: Alignment.centerLeft,
        child: Padding(
          padding: const EdgeInsets.symmetric(horizontal: 20.0),
          child: Column(
            mainAxisAlignment: MainAxisAlignment.center,
            mainAxisSize: MainAxisSize.min,
            children: const [
              Icon(Icons.edit, color: Colors.white, size: 18.0),
              SizedBox(height: 5.0),
              Text('Edit', style: TextStyle(color: Colors.white))
            ],
          ),
        ),
      ),
    );
  }

  @override
  Widget build(BuildContext context) {
    return Material(
      clipBehavior: Clip.antiAlias,
      borderRadius: BorderRadius.circular(15.0),
      color: Colors.blueAccent,
      child: Dismissible(
        background: _background(),
        confirmDismiss: (d) => _dialog(context, d),
        secondaryBackground: _secondBackground(),
        onDismissed: onDismissed,
        key: key!,
        child: Ink(
          height: 100,
          child: InkWell(
            onTap: onTap, // 点击
            borderRadius: BorderRadius.circular(15.0),
            child: buildInfo(),
          ),
        ),
      ),
    );
  }

  Widget buildInfo() {
    return Padding(
      padding: const EdgeInsets.symmetric(
        vertical: 10,
        horizontal: 20,
      ),
      child: Row(
        children: [
          Expanded(
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              mainAxisAlignment: MainAxisAlignment.center,
              children: [
                Row(
                  children: [
                    Text(
                      location,
                      style: const TextStyle(
                        fontWeight: FontWeight.bold,
                        color: Colors.white,
                        fontSize: 20,
                      ),
                    ),
                    if (isCurrent)
                      const Padding(
                        padding: EdgeInsets.only(left: 5),
                        child: Icon(Icons.room),
                      ),
                  ],
                ),
                Text(
                  weather,
                  style: const TextStyle(
                    color: Colors.white,
                  ),
                ),
                Text(
                  detail,
                  style: const TextStyle(
                    color: Colors.white,
                  ),
                )
              ],
            ),
          ),
          SvgPicture.asset(
            'assets/caiyun/$icon.svg',
            width: 60,
            height: 60,
          ),
        ],
      ),
    );
  }

  Future<bool> _dialog(BuildContext context, DismissDirection _direction) {
    if (DismissDirection.endToStart == _direction) {
      // 如果是删除
      return showDialog<bool>(
          context: context,
          builder: (context) {
            return AlertDialog(
              title: const Text('Delete'),
              content: const Text('o(TヘTo)'),
              actions: [
                TextButton(
                  child: const Text('No'),
                  onPressed: () {
                    Navigator.pop(context, false);
                  },
                ),
                TextButton(
                  child: const Text('Yes'),
                  onPressed: () {
                    Navigator.pop(context, true);
                  },
                )
              ],
            );
          }).then((value) => value!);
    } else {
      return Future.value(false);
    }
  }
}
