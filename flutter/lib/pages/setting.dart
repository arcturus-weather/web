import 'package:flutter/material.dart';
import 'package:get/get.dart';

import 'package:spica/components/utils/ListTile.dart';
import 'package:spica/components/utils/dialog.dart';

import 'package:spica/store/theme.dart';

class SettingPage extends StatelessWidget {
  const SettingPage({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text('设置'),
        actions: [
          IconButton(
            onPressed: () {
              Get.toNamed('/about');
            },
            icon: const Icon(Icons.error_outline),
          ),
        ],
      ),
      body: Padding(
        padding: const EdgeInsets.symmetric(
          horizontal: 20,
          vertical: 10,
        ),
        child: ListView(
          children: [
            const Text(
              '基础',
              style: TextStyle(
                fontWeight: FontWeight.bold,
              ),
            ),
            ...buildBasicOption(context),
          ],
        ),
      ),
    );
  }
}

List<Widget> buildBasicOption(BuildContext context) {
  return [
    Card(
      elevation: 0,
      clipBehavior: Clip.antiAlias,
      color: Theme.of(context).colorScheme.surfaceVariant,
      margin: const EdgeInsets.symmetric(
        vertical: 10,
      ),
      child: CustomListTile(
        onTap: () {
          // change the theme
          final _ = useThemeController();

          showSimpleDialog(
            context,
            children: ThemeOption.values
                .map(
                  (e) => Obx(
                    () => Padding(
                      padding: const EdgeInsets.only(left: 5),
                      child: ListTile(
                        title: Text(themeDesc[e.index]),
                        trailing: Radio<ThemeOption>(
                          value: e,
                          groupValue: _.select.value,
                          onChanged: _.changeTheme,
                        ),
                      ),
                    ),
                  ),
                )
                .toList(),
            title: '主题',
          );
        },
        leading: const Icon(Icons.palette),
        title: const Text('主题'),
      ),
    )
  ];
}
