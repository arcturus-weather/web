import 'package:flutter/material.dart';

void showSimpleDialog(
  BuildContext context, {
  required List<Widget> children,
  String? title,
}) {
  showDialog(
    context: context,
    builder: (BuildContext context) {
      return SimpleDialog(
        title: title == null
            ? null
            : Text(
                title,
                style: const TextStyle(
                  fontSize: 20.0,
                  fontWeight: FontWeight.bold,
                ),
              ),
        children: children,
      );
    },
  );
}
