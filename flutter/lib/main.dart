import 'package:flutter/material.dart';
import 'package:get/get.dart';
import 'package:intl/date_symbol_data_local.dart';

import 'package:spica/global/global.dart';
import 'package:spica/routers/index.dart';

void main() {
  runApp(const MyApp());
}

class MyApp extends StatelessWidget {
  const MyApp({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    // 初始化时间格式化工具
    initializeDateFormatting();

    return GetMaterialApp(
      title: 'spica',

      // custom theme
      theme: Global.config.theme.light,
      darkTheme: Global.config.theme.dark,

      // router
      initialRoute: "/home", // default
      getPages: Routers.getPage(),
    );
  }
}
