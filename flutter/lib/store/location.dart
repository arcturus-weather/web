import 'dart:io';

import 'package:get/get.dart';
import 'package:permission_handler/permission_handler.dart';
import 'package:flutter_bmflocation/flutter_bmflocation.dart';
import 'package:flutter_baidu_mapapi_base/flutter_baidu_mapapi_base.dart'
    show BMFMapSDK;

import 'package:spica/global/global.dart';
import 'caiyun.dart';

class Location {
  final double latitude;
  final double longitude;
  final String address;
  final String district;
  final String city;
  final String country;
  final String province;
  final bool isCurrent;

  Location({
    required this.latitude,
    required this.longitude,
    required this.address,
    required this.district,
    required this.city,
    required this.province,
    required this.country,
    this.isCurrent = false,
  });
}

class LocationController extends GetxController {
  final current = Rx<Location>(
    Location(
      latitude: Global.default_.location.latitude,
      longitude: Global.default_.location.longitude,
      address: Global.default_.location.address,
      district: Global.default_.location.district,
      city: Global.default_.location.city,
      country: Global.default_.location.country,
      province: Global.default_.location.province,
      isCurrent: true,
    ),
  ); // 当前位置

  final collections = Rx<List<Location>>([]); // 用户收藏列表

  late LocationFlutterPlugin _locPlugin;

  @override
  void onInit() {
    super.onInit();

    // 初始化定位插件
    _locPlugin = LocationFlutterPlugin();

    // 隐私政策
    _locPlugin.setAgreePrivacy(true);
    BMFMapSDK.setAgreePrivacy(true);

    // 插件配置
    Map androidMap = Global.config.baidu.android;
    Map iosMap = Global.config.baidu.ios;
    _locPlugin.prepareLoc(androidMap, iosMap);

    // 定位回调
    _locPlugin.seriesLocationCallback(callback: (result) {
      if (result.errorCode == 61) {
        current(
          Location(
            latitude: result.latitude!,
            longitude: result.longitude!,
            address: result.address!,
            district: result.district!,
            city: result.city!,
            country: result.country!,
            province: result.province!,
          ),
        );
      }
    });

    requestPermission();
  }

  // 动态申请定位权限
  void requestPermission() async {
    // 申请权限
    bool hasPermission = await requestLocationPermission();

    if (hasPermission) {
      // 已授权
      if (Platform.isAndroid) {
        // 获取当前定位
        await _locPlugin.startLocation();
        await _locPlugin.stopLocation();
      }
    }

    // 把当前位置加入收藏列表
    collections.value.add(current.value);

    // 无论是否授权, 都进行一次天气数据的请求
    useCaiyunController().refreshKey.currentState!.show();
  }

  // 申请定位权限
  Future<bool> requestLocationPermission() async {
    // 获取当前的权限
    PermissionStatus status = await Permission.location.status;
    if (status == PermissionStatus.granted) {
      // 已经授权
      return true;
    } else {
      // 未授权则发起一次申请
      status = await Permission.location.request();

      return status == PermissionStatus.granted ? true : false;
    }
  }
}

LocationController useLocationController() {
  return Get.find<LocationController>();
}
