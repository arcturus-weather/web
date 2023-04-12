import 'package:flutter/material.dart';
import 'package:flutter_bmflocation/flutter_bmflocation.dart';
import 'package:spica/theme/schemes.g.dart';

class Config {
  final caiyun = _Caiyun();

  final baidu = _BaiduMap();

  final theme = _AppTheme();
}

class _Caiyun {
  static const key = '2DUngskNMV4PeOO8';

  final baseURL = 'https://api.caiyunapp.com/v2.6/${_Caiyun.key}';

  final timeout = const Duration(seconds: 10);

  final alert = 'true';

  final dailysteps = '15';

  final hourlysteps = '24';
}

class _AppTheme {
  final light = ThemeData(
    useMaterial3: true,
    colorScheme: lightColorScheme,
  );

  final dark = ThemeData(
    useMaterial3: true,
    colorScheme: darkColorScheme,
  );
}

class _BaiduMap {
  BaiduLocationAndroidOption initAndroidOptions() {
    return BaiduLocationAndroidOption(
      locationMode: BMFLocationMode.hightAccuracy, // 定位模式
      isNeedAddress: true, // 是否需要返回地址信息
      isNeedAltitude: false, // 是否需要返回海拔高度信息
      isNeedLocationPoiList: false, // 是否需要返回周边 poi 信息
      isNeedNewVersionRgc: false, // 是否需要返回新版本 rgc 信息
      isNeedLocationDescribe: true, // 是否需要返回位置描述信息
      openGps: true, // 是否使用 gps
      locationPurpose: BMFLocationPurpose.sport, // 设置场景定位参数
      coordType: BMFLocationCoordType.bd09ll, // 坐标系
      scanspan: 0, // 设置发起定位请求的间隔, ms
    );
  }

  BaiduLocationIOSOption initIOSOptions() {
    return BaiduLocationIOSOption(
      coordType: BMFLocationCoordType.bd09ll, // 坐标系
      locationTimeout: 10, // 位置获取超时时间
      reGeocodeTimeout: 10, // 获取地址信息超时时间
      activityType: BMFActivityType.automotiveNavigation, // 应用位置类型
      desiredAccuracy: BMFDesiredAccuracy.best, // 设置预期精度参数
      isNeedNewVersionRgc: true, // 是否需要最新版本 rgc 数据
      pausesLocationUpdatesAutomatically: false, // 指定定位是否会被系统自动暂停
      allowsBackgroundLocationUpdates: true, // 指定是否允许后台定位
      distanceFilter: 10, // 设定定位的最小更新距离
    );
  }

  Map get android {
    return initAndroidOptions().getMap();
  }

  Map get ios {
    return initIOSOptions().getMap();
  }
}
