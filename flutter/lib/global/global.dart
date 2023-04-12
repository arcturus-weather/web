import 'config.dart';
import 'default.dart';

enum ENV { dev, release }

class Global {
  Global._();

  static const appName = 'spica';

  static const env = ENV.dev;

  static final config = Config();

  static final default_ = Default();

  static final contributors = [
    _Contributor(
      name: 'ARCTURUS',
      avatar: 'https://s2.loli.net/2022/06/09/fPbFwIJh1l74g6X.jpg',
      homePage: 'https://www.ice-berg.top',
    ),
  ];
}

class _Contributor {
  late String name;
  late String avatar;
  String? homePage;

  _Contributor({
    required this.name,
    required this.avatar,
    this.homePage,
  });
}
