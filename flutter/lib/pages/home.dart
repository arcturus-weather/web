import 'package:flutter/material.dart';
import 'package:get/get.dart';
import 'package:intl/intl.dart';

import 'package:spica/net/caiyun/model.dart';
import 'package:spica/store/caiyun.dart';
import 'package:spica/store/location.dart';

import 'package:spica/components/precip.dart';
import 'package:spica/components/utils/ListTile.dart';
import 'package:spica/components/utils/snackBar.dart';
import 'package:spica/components/main_info.dart';
import 'package:spica/components/chart/weather_background.dart';
import 'package:spica/components/hours.dart';
import 'package:spica/components/day.dart';
import 'package:spica/components/air.dart';

class HomePage extends StatelessWidget {
  const HomePage({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: Stack(
        children: [
          const WeatherBackGround(),
          GetX<CaiyunController>(
            builder: (_) => RefreshIndicator(
              edgeOffset: 80.0,
              key: _.refreshKey,
              color: Colors.white,
              backgroundColor: Colors.blue,
              strokeWidth: 2.0,
              onRefresh: () {
                return _.getWeatherInfo().then((value) {
                  _.data.value = value.body;
                  showSnacBar(context, '刷新成功');
                }).catchError((err) {
                  showSnacBar(context, err.message);
                });
              },
              child: CustomScrollView(
                slivers: <Widget>[
                  SliverPersistentHeader(
                    delegate: CustomAppBar(
                      child: buildMainInfo(_),
                    ),
                  ),
                  const SliverToBoxAdapter(
                    child: WeatherInfo(),
                  )
                ],
              ),
            ),
          ),
        ],
      ),
    );
  }

  Widget? buildMainInfo(CaiyunController _) {
    if (_.data.value != null) {
      final data = _.data.value;
      return MainInfo(
        temperature: data!.result!.realtime.temperature,
        feelsLike: data.result!.realtime.apparentTemperature,
        airDescription: data.result!.realtime.airQuality.description.chn,
        description: '多云',
      );
    }

    return null;
  }
}

class WeatherInfo extends StatelessWidget {
  const WeatherInfo({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return GetX<CaiyunController>(
      builder: (_) {
        final data = _.data.value;

        if (data != null) {
          return Padding(
            padding: const EdgeInsets.only(
              left: 10,
              right: 10,
              bottom: 10,
            ),
            child: ListView(
              padding: EdgeInsets.zero,
              shrinkWrap: true,
              children: [
                Precip(minutely: data.result!.minutely),
                Days(
                  daily: data.result!.daily,
                  leading: Column(
                    crossAxisAlignment: CrossAxisAlignment.start,
                    children: [
                      CustomListTile(
                        leading: const Icon(Icons.error_outline),
                        title: Text(
                            '更新于: ${DateFormat('HH:mm').format(data.serverTime!)}'),
                      ),
                      buildAlert(data),
                    ],
                  ),
                ),
                Hours(hourly: data.result!.hourly),
                Air(aqi: data.result!.realtime.airQuality),
              ],
            ),
          );
        } else {
          return ListView(
            shrinkWrap: true,
            children: const [
              SizedBox.shrink(),
            ],
          );
        }
      },
    );
  }

  Widget buildAlert(CaiyunModel data) {
    return GestureDetector(
      onTap: () {
        Get.toNamed('/alert');
      },
      child: Column(
        children: data.result!.alert.content
            .map(
              (_) => Padding(
                padding: const EdgeInsets.only(
                  left: 20,
                  bottom: 5,
                  right: 20,
                ),
                child: Text(
                  '${_.title}, ${DateFormat.yMMMMEEEEd('zh').format(_.pubtimestamp)}',
                  overflow: TextOverflow.ellipsis,
                  style: const TextStyle(fontSize: 12),
                ),
              ),
            )
            .toList(),
      ),
    );
  }
}

class CustomAppBar extends SliverPersistentHeaderDelegate {
  final maxHeight = 400.0;
  final childMinHeight = 155;
  final appBarHeight = 112.0;

  final Widget? child;

  CustomAppBar({
    this.child,
  });

  @override
  Widget build(
    BuildContext context,
    double shrinkOffset,
    bool overlapsContent,
  ) {
    return Column(
      children: [
        AppBar(
          backgroundColor: Colors.transparent,
          title: GetX<LocationController>(
            // 位置信息
            builder: (_) => Text(
              '${_.current.value.address}',
              style: const TextStyle(
                color: Colors.white,
              ),
            ),
          ),
          actions: [
            IconButton(
              onPressed: () {
                Get.toNamed('/city');
              },
              icon: const Icon(
                Icons.domain,
                color: Colors.white,
              ),
            ),
            IconButton(
              onPressed: () {
                Get.toNamed('/setting');
              },
              icon: const Icon(
                Icons.settings,
                color: Colors.white,
              ),
            ),
          ],
        ),
        if (child != null) child!
      ],
    );
  }

  @override
  double get maxExtent => maxHeight;

  @override
  double get minExtent => appBarHeight + childMinHeight;

  @override
  bool shouldRebuild(covariant SliverPersistentHeaderDelegate oldDelegate) {
    return true;
  }
}
