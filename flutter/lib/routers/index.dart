import 'package:get/get.dart';

// store
import 'package:spica/net/caiyun/provider.dart';
import 'package:spica/store/caiyun.dart';
import 'package:spica/store/location.dart';
import 'package:spica/store/theme.dart';

// pages
import 'package:spica/pages/home.dart';
import 'package:spica/pages/setting.dart';
import 'package:spica/pages/about.dart';
import 'package:spica/pages/air.dart';
import 'package:spica/pages/alert.dart';
import 'package:spica/pages/cities.dart';
import 'package:spica/pages/search.dart';

class Routers {
  static List<GetPage> getPage() {
    return [
      GetPage(
        name: '/home',
        page: () => const HomePage(),
        binding: BindingsBuilder(() {
          Get.put(ThemeController());
          Get.put(CaiyunProvider());
          Get.put(CaiyunController(provider: Get.find()));
          Get.put(LocationController());
          
        }),
      ),
      GetPage(name: '/setting', page: () => const SettingPage()),
      GetPage(name: '/about', page: () => const AboutPage()),
      GetPage(name: '/air', page: () => const AirPage()),
      GetPage(name: '/alert', page: () => const AlertPage()),
      GetPage(name: '/city', page: () => const CityPage()),
      GetPage(name: '/search', page: () => const SearchPage()),
    ];
  }
}
