import 'package:flutter/material.dart';
import 'package:get/get.dart';

enum ThemeOption { light, dark, system, auto }

const themeDesc = ['亮色主题', '暗黑主题', '跟随系统', '自动'];

class ThemeController extends GetxController {
  final select = Rx(ThemeOption.light);

  void changeTheme(ThemeOption? value) {
    if (value != null) {
      select.value = value;

      switch (value) {
        case ThemeOption.light:
          Get.changeThemeMode(ThemeMode.light);
          break;
        case ThemeOption.dark:
          Get.changeThemeMode(ThemeMode.dark);
          break;
        case ThemeOption.system:
          Get.changeThemeMode(ThemeMode.system);
          break;
        case ThemeOption.auto:
          DateTime now = DateTime.now();
          debugPrint('${now.hour}');

          if (now.hour < 6 || now.hour > 18) {
            Get.changeThemeMode(ThemeMode.dark);
          } else {
            Get.changeThemeMode(ThemeMode.light);
          }

          break;
      }
    }
  }
}

ThemeController useThemeController() {
  return Get.find<ThemeController>();
}
