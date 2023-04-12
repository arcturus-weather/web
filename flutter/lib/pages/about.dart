import 'package:flutter/material.dart';
import 'package:url_launcher/url_launcher.dart';
import 'package:flutter_svg/svg.dart';

import 'package:spica/global/global.dart';
import 'package:spica/components/utils/ListTile.dart';

class AboutPage extends StatelessWidget {
  const AboutPage({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text('关于'),
      ),
      body: Padding(
        padding: const EdgeInsets.symmetric(
          horizontal: 20,
          vertical: 10,
        ),
        child: ListView(
          children: [
            Container(
              width: 100,
              height: 100,
              padding: const EdgeInsets.only(
                top: 30,
                bottom: 10,
              ),
              child: CircleAvatar(
                child: ClipOval(
                  child: Image.asset(
                    'assets/logo.png',
                    fit: BoxFit.fill,
                  ),
                ),
              ),
            ),
            Container(
              padding: const EdgeInsets.only(
                bottom: 20,
              ),
              child: const Center(
                child: Text(
                  Global.appName,
                  style: TextStyle(
                    fontSize: 30,
                    fontWeight: FontWeight.bold,
                  ),
                ),
              ),
            ),
            ...buildLink(context),
            Container(
              padding: const EdgeInsets.symmetric(vertical: 15),
              child: const Center(
                child: Text(
                  '贡献者',
                  style: TextStyle(
                    fontWeight: FontWeight.bold,
                  ),
                ),
              ),
            ),
            buildContributor(context),
          ],
        ),
      ),
    );
  }
}

List<Widget> buildLink(BuildContext context) {
  return [
    Card(
      elevation: 0,
      color: Theme.of(context).colorScheme.surfaceVariant,
      clipBehavior: Clip.antiAlias,
      child: CustomListTile(
        leading: SvgPicture.asset(
          'assets/github.svg',
          color: Theme.of(context).colorScheme.onSurfaceVariant,
          width: 20,
          height: 20,
        ),
        subtitle: const Text(
          'https://github.com/ice-universes/spica',
          overflow: TextOverflow.ellipsis,
        ),
        onTap: () {},
        title: const Text('项目地址'),
      ),
    ),
    Card(
      elevation: 0,
      color: Theme.of(context).colorScheme.surfaceVariant,
      clipBehavior: Clip.hardEdge,
      child: CustomListTile(
        leading: SvgPicture.asset(
          'assets/message.svg',
          color: Theme.of(context).colorScheme.onSurfaceVariant,
          width: 20,
          height: 20,
        ),
        subtitle: const Text(
          'https://github.com/ice-universes/spica/issues',
          overflow: TextOverflow.ellipsis,
        ),
        onTap: () {},
        title: const Text('反馈'),
      ),
    ),
  ];
}

Widget buildContributor(BuildContext context) {
  return SizedBox(
    height: 120,
    child: ListView(
      scrollDirection: Axis.horizontal,
      children: Global.contributors
          .map(
            (e) => Card(
              elevation: 0,
              color: Theme.of(context).colorScheme.surfaceVariant,
              clipBehavior: Clip.hardEdge,
              child: InkWell(
                onTap: () {
                  // 跳转贡献值主页
                  if (e.homePage != null) {
                    launchUrl(Uri.parse(e.homePage!));
                  }
                },
                child: Container(
                  padding: const EdgeInsets.all(10),
                  child: Column(
                    mainAxisAlignment: MainAxisAlignment.center,
                    children: [
                      CircleAvatar(
                        backgroundImage: NetworkImage(
                          e.avatar,
                        ),
                      ),
                      Padding(
                        padding: const EdgeInsets.only(top: 10),
                        child: Text(e.name),
                      ),
                    ],
                  ),
                ),
              ),
            ),
          )
          .toList(),
    ),
  );
}
