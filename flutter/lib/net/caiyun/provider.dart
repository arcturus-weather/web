import 'package:get/get.dart';

import 'package:spica/global/global.dart';
import 'model.dart';

export 'model.dart' show CaiyunModel;

class CaiyunProvider extends GetConnect {
  @override
  void onInit() {
    super.onInit();

    httpClient.defaultDecoder = (json) => CaiyunModel.fromJson(json);

    httpClient.timeout = Global.config.caiyun.timeout;

    httpClient.maxAuthRetries = 3;
  }

  // 获取天气信息
  Future<Response<CaiyunModel>> getWeatherInfo({
    required double latitude,
    required double longitude,
  }) async {
    String loc = '$longitude,$latitude';

    final query = {
      'alert': Global.config.caiyun.alert,
      'dailysteps': Global.config.caiyun.dailysteps,
      'hourlysteps': Global.config.caiyun.hourlysteps,
    };

    final url = '${Global.config.caiyun.baseURL}/$loc/weather';

    Response<CaiyunModel> response = await get(url, query: query);

    CaiyunModel model = response.body as CaiyunModel;

    if (response.status.hasError) {
      return Future.error(Exception(response.statusText));
    } else if (model.status != 'ok') {
      // Generally, the API request exceeds the limit
      return Future.error(
        Exception(model.error ?? 'Caiyun API went wrong.'),
      );
    }

    return response;
  }
}
