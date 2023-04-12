import 'package:flutter/material.dart';
import 'package:get/get.dart';
import 'package:spica/net/caiyun/provider.dart';
import 'package:spica/store/location.dart';

class CaiyunController extends GetxController {
  final CaiyunProvider provider;
  final refreshKey = GlobalKey<RefreshIndicatorState>();
  final data = Rx<CaiyunModel?>(null);

  CaiyunController({
    required this.provider,
  });

  // 获取天气数据
  Future getWeatherInfo() {
    final locationController = useLocationController();

    return provider.getWeatherInfo(
      longitude: locationController.current.value.longitude,
      latitude: locationController.current.value.latitude,
    );
  }
}

CaiyunController useCaiyunController() {
  return Get.find<CaiyunController>();
}
