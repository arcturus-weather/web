import 'package:flutter/material.dart';

class CustomListTile extends StatelessWidget {
  final Widget? leading;
  final Widget? title;
  final Widget? subtitle;
  final Widget? trailing;
  final void Function()? onTap;
  final void Function()? onLongPress;

  const CustomListTile({
    Key? key,
    this.leading,
    this.title,
    this.subtitle,
    this.trailing,
    this.onTap,
    this.onLongPress,
  }) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return ListTile(
      leading: leading,
      trailing: trailing,
      onLongPress: onLongPress,
      onTap: onTap,
      title: title == null
          ? null
          : leading != null
              ? Container(
                  transform: Matrix4.translationValues(-20, 0, 0),
                  child: title,
                )
              : title,
      subtitle: subtitle == null
          ? null
          : Container(
              transform: Matrix4.translationValues(-20, 0, 0),
              child: subtitle,
            ),
    );
  }
}
