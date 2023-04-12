import 'package:flutter/material.dart';
import 'package:get/get.dart';
import 'package:spica/components/cities/like.dart';

import 'package:spica/components/cities/search_button.dart';

const items = [1];

// 城市管理
class CityPage extends StatelessWidget {
  const CityPage({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: CustomScrollView(
        slivers: [
          SliverAppBar(
            pinned: true,
            expandedHeight: 150.0,
            flexibleSpace: FlexibleSpaceBar(
              centerTitle: true,
              title: Text(
                '城市管理',
                style: TextStyle(
                  color: Theme.of(context).textTheme.bodyText1?.color,
                ),
              ),
            ),
          ),
          SliverToBoxAdapter(
            child: Padding(
              padding: const EdgeInsets.symmetric(
                horizontal: 25,
                vertical: 15,
              ),
              child: SearchButton(
                onTap: () {
                  Get.toNamed('/search');
                },
              ),
            ),
          ),
          SliverList(
            delegate: SliverChildBuilderDelegate(
              (BuildContext context, int index) {
                return Padding(
                  padding: const EdgeInsets.symmetric(
                    horizontal: 25,
                    vertical: 5,
                  ),
                  child: Like(
                    weather: '27°, 多云',
                    detail: '中国 海南 海口 龙华区',
                    icon: 'CLEAR_DAY',
                    location: '世纪公园',
                    onTap: () {
                      debugPrint('jjj');
                    },
                    key: Key('$index'),
                  ),
                );
              },
              childCount: items.length,
            ),
          ),
        ],
      ),
    );
  }
}
