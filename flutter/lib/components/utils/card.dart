import 'package:flutter/material.dart';

class CustomCard extends StatelessWidget {
  final String title;
  final String? subTitle;
  final Widget child;
  final Color? color;
  final double? elevation;
  final Widget? leading;
  final void Function()? onTap;
  final TextOverflow overflow;

  const CustomCard({
    Key? key,
    required this.title,
    required this.child,
    this.subTitle,
    this.color,
    this.elevation,
    this.onTap,
    this.leading,
    this.overflow = TextOverflow.ellipsis,
  }) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return Card(
      color: color ?? Theme.of(context).colorScheme.onInverseSurface,
      elevation: elevation ?? 0,
      clipBehavior: Clip.antiAlias,
      child: InkWell(
        onTap: onTap,
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            if (leading != null) leading!,
            ListTile(
              title: Text(
                title,
                style: const TextStyle(
                  fontWeight: FontWeight.bold,
                ),
                overflow: overflow,
              ),
              subtitle: subTitle == null
                  ? null
                  : Text(
                      subTitle!,
                      overflow: overflow,
                    ),
            ),
            child,
          ],
        ),
      ),
    );
  }
}
