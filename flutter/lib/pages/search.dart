import 'package:flutter/material.dart';
import 'package:spica/components/cities/search_textfield.dart';
import 'package:spica/components/cities/suggestions_.dart';

// 城市搜索
class SearchPage extends StatelessWidget {
  const SearchPage({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: SearchTextField(),
        actions: [
          TextButton(
            child: const Text('取消'),
            onPressed: () {},
          )
        ],
      ),
      body: const CitiesList(),
    );
  }
}
