import 'package:flutter/material.dart';
import 'package:get/get.dart';
import 'package:intl/intl.dart';

import 'package:spica/components/utils/card.dart';
import 'package:spica/store/caiyun.dart';

class AlertPage extends StatelessWidget {
  const AlertPage({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text('预警'),
      ),
      body: Padding(
        padding: const EdgeInsets.all(10),
        child: GetX<CaiyunController>(
          builder: (_) => ListView(
            children: _.data.value!.result!.alert.content
                .map(
                  (e) => CustomCard(
                    title: e.title,
                    subTitle:
                        DateFormat.yMMMMEEEEd('zh').format(e.pubtimestamp),
                    child: Padding(
                      child: Text(e.description),
                      padding: const EdgeInsets.only(
                        left: 15,
                        right: 15,
                        bottom: 15,
                      ),
                    ),
                  ),
                )
                .toList(),
          ),
        ),
      ),
    );
  }
}
