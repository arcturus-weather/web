class CaiyunModel {
  late String status;
  late String apiVersion;
  String? apiStatus;
  String? lang;
  String? unit;
  int? tzshift;
  String? timezone;
  DateTime? serverTime;
  List<double>? location;
  Result? result;
  String? error;

  CaiyunModel.fromJson(Map<String, dynamic> json) {
    status = json['status'];
    apiVersion = json['api_version'];

    if (json['error'] != null) {
      error = json['error'];
    } else if (json['result'] != null) {
      result = Result.fromJson(json['result']);
      apiStatus = json['api_status'];
      lang = json['lang'];
      unit = json['unit'];
      tzshift = json['tzshift'];
      timezone = json['timezone'];
      serverTime = DateTime.fromMillisecondsSinceEpoch(
        json['server_time'] * 1000,
      );
      location = json['location'].cast<double>();
    }
  }

  Map<String, dynamic> toJson() {
    if (error != null) {
      return {
        'status': status,
        'api_version': apiVersion,
        'error': error,
      };
    } else {
      return {
        'status': status,
        'api_version': apiVersion,
        'result': result!.toJson(),
        'server_time': serverTime,
        'timezone': timezone,
        'tzshift': tzshift,
        'unit': unit,
        'lang': lang,
        'api_status': apiStatus,
        'location': location,
      };
    }
  }
}

class Result {
  late Alert alert;
  late Realtime realtime;
  late Minutely minutely;
  late Hourly hourly;
  late Daily daily;
  late int primary;
  late String forecastKeypoint;

  Result.fromJson(Map<String, dynamic> json) {
    alert = Alert.fromJson(json['alert']);
    realtime = Realtime.fromJson(json['realtime']);
    minutely = Minutely.fromJson(json['minutely']);
    hourly = Hourly.fromJson(json['hourly']);
    daily = Daily.fromJson(json['daily']);
    primary = json['primary'];
    forecastKeypoint = json['forecast_keypoint'];
  }

  Map<String, dynamic> toJson() {
    return {
      'alert': alert.toJson(),
      'realtime': realtime.toJson(),
      'minutely': minutely.toJson(),
      'hourly': hourly.toJson(),
      'daily': daily.toJson(),
      'primary': primary,
      'forecast_keypoint': forecastKeypoint,
    };
  }
}

class Alert {
  late String status;
  late List<Content> content;
  late List<Adcodes> adcodes;

  Alert.fromJson(Map<String, dynamic> json) {
    status = json['status'];

    content = (json['content'] as List).map((v) {
      return Content.fromJson(v);
    }).toList();

    adcodes = (json['adcodes'] as List).map((v) {
      return Adcodes.fromJson(v);
    }).toList();
  }

  Map<String, dynamic> toJson() {
    return {
      'status': status,
      'content': content.map((v) => v.toJson()).toList(),
      'adcodes': adcodes.map((v) => v.toJson()).toList(),
    };
  }
}

class Content {
  late String province; // 省
  late String status; // 预警信息的状态
  late String code; // 预警代码
  late String description; // 描述
  late String regionId;
  late String county; // 县
  late String city; // 市
  late String alertId; // 预警 ID
  late String title; // 标题
  late String adcode; // 行政区划层级信息
  late String source; // 发布单位
  late String location; // 位置
  late String requestStatus;
  late DateTime pubtimestamp;
  late List<double> latlon;

  Content.fromJson(Map<String, dynamic> json) {
    province = json['province'];
    status = json['status'];
    code = json['code'];
    description = json['description'];
    regionId = json['regionId'];
    county = json['county'];
    pubtimestamp = DateTime.fromMillisecondsSinceEpoch(
      json['pubtimestamp'] * 1000,
    );
    latlon = json['latlon'].cast<double>();
    city = json['city'];
    alertId = json['alertId'];
    title = json['title'];
    adcode = json['adcode'];
    source = json['source'];
    location = json['location'];
    requestStatus = json['request_status'];
  }

  Map<String, dynamic> toJson() {
    return {
      'province': province,
      'status': status,
      'code': code,
      'description': description,
      'regionId': regionId,
      'county': county,
      'pubtimestamp': pubtimestamp,
      'latlon': latlon,
      'city': city,
      'alertId': alertId,
      'title': title,
      'adcode': adcode,
      'source': source,
      'location': location,
      'request_status': requestStatus,
    };
  }
}

class Adcodes {
  late int adcode;
  late String name;

  Adcodes.fromJson(Map<String, dynamic> json) {
    adcode = json['adcode'];
    name = json['name'];
  }

  Map<String, dynamic> toJson() {
    return {
      'adcode': adcode,
      'name': name,
    };
  }
}

class Realtime {
  late String status;
  late double temperature;
  late double humidity;
  late double cloudrate;
  late String skycon;
  late double visibility;
  late double dswrf;
  late Wind wind;
  late double pressure;
  late double apparentTemperature;
  late Precipitation precipitation;
  late AirQuality airQuality;
  late Map<String, LifeIndexItem> lifeIndex;

  Realtime.fromJson(Map<String, dynamic> json) {
    status = json['status'];
    temperature = (json['temperature'] as num).toDouble();
    humidity = (json['humidity'] as num).toDouble();
    cloudrate = (json['cloudrate'] as num).toDouble();
    skycon = json['skycon'];
    visibility = (json['visibility'] as num).toDouble();
    dswrf = (json['dswrf'] as num).toDouble();
    wind = Wind.fromJson(json['wind']);
    pressure = (json['pressure'] as num).toDouble();
    apparentTemperature = json['apparent_temperature'];
    precipitation = Precipitation.fromJson(json['precipitation']);
    airQuality = AirQuality.fromJson(json['air_quality']);
    lifeIndex = Map<String, LifeIndexItem>.from(
      (json['life_index'] as Map<String, dynamic>).map((k, v) {
        return MapEntry(k, LifeIndexItem.fromJson(v));
      }),
    );
  }

  Map<String, dynamic> toJson() {
    return {
      'status': status,
      'temperature': temperature,
      'humidity': humidity,
      'cloudrate': cloudrate,
      'skycon': skycon,
      'visibility': visibility,
      'dswrf': dswrf,
      'wind': wind.toJson(),
      'pressure': pressure,
      'apparent_temperature': apparentTemperature,
      'precipitation': precipitation.toJson(),
      'air_quality': airQuality.toJson(),
      'life_index': lifeIndex,
    };
  }
}

class Precipitation {
  late Local local;
  late Nearest nearest;

  Precipitation.fromJson(Map<String, dynamic> json) {
    local = Local.fromJson(json['local']);
    nearest = Nearest.fromJson(json['nearest']);
  }

  Map<String, dynamic> toJson() {
    return {
      'local': local.toJson(),
      'nearest': nearest.toJson(),
    };
  }
}

class Local {
  late String status;
  late String? datasource;
  late double intensity;

  Local({
    required this.status,
    required this.intensity,
    this.datasource,
  });

  Local.fromJson(Map<String, dynamic> json) {
    status = json['status'];
    datasource = json['datasource'];
    intensity = (json['intensity'] as num).toDouble();
  }

  Map<String, dynamic> toJson() {
    return {
      'status': status,
      'intensity': intensity,
      'datasource': datasource,
    };
  }
}

class Nearest {
  late String status;
  late double distance;
  late double intensity;

  Nearest({
    required this.status,
    required this.intensity,
    required this.distance,
  });

  Nearest.fromJson(Map<String, dynamic> json) {
    status = json['status'];
    distance = (json['distance'] as num).toDouble();
    intensity = (json['intensity'] as num).toDouble();
  }

  Map<String, dynamic> toJson() {
    return {
      'status': status,
      'intensity': intensity,
      'distance': distance,
    };
  }
}

class LifeIndexItem {
  late double index;
  late String desc;

  LifeIndexItem({
    required this.index,
    required this.desc,
  });

  LifeIndexItem.fromJson(Map<String, dynamic> json) {
    if (json['index'] is String) {
      index = double.parse(json['index']);
    } else {
      index = (json['index'] as num).toDouble();
    }

    desc = json['desc'];
  }

  Map<String, dynamic> toJson() {
    return {
      'index': index,
      'desc': desc,
    };
  }
}

class Wind {
  late double speed;
  late double direction;

  Wind.fromJson(Map<String, dynamic> json) {
    speed = (json['speed'] as num).toDouble();
    direction = (json['direction'] as num).toDouble();
  }

  Map<String, dynamic> toJson() {
    return {
      'speed': speed,
      'direction': direction,
    };
  }
}

class AirQuality {
  late double pm25;
  late double pm10;
  late double o3;
  late double so2;
  late double no2;
  late double co;
  late Aqi aqi;
  late Description description;

  AirQuality.fromJson(Map<String, dynamic> json) {
    pm25 = (json['pm25'] as num).toDouble();
    pm10 = (json['pm10'] as num).toDouble();
    o3 = (json['o3'] as num).toDouble();
    so2 = (json['so2'] as num).toDouble();
    no2 = (json['no2'] as num).toDouble();
    co = (json['co'] as num).toDouble();
    aqi = Aqi.fromJson(json['aqi']);
    description = Description.fromJson(json['description']);
  }

  Map<String, dynamic> toJson() {
    return {
      'pm25': pm25,
      'pm10': pm10,
      'o3': o3,
      'so2': so2,
      'no2': no2,
      'co': co,
      'aqi': aqi.toJson(),
      'description': description.toJson(),
    };
  }
}

class Aqi {
  late int chn;
  late int usa;

  Aqi.fromJson(Map<String, dynamic> json) {
    chn = (json['chn'] as num).toInt();
    usa = (json['usa'] as num).toInt();
  }

  Map<String, dynamic> toJson() {
    return {
      'chn': chn,
      'usa': usa,
    };
  }
}

class Description {
  late String chn;
  late String usa;

  Description.fromJson(Map<String, dynamic> json) {
    chn = json['chn'];
    usa = json['usa'];
  }

  Map<String, dynamic> toJson() {
    return {
      'chn': chn,
      'usa': usa,
    };
  }
}

class Minutely {
  late String status;
  late String datasource;
  late List<double> precipitation2h;
  late List<double> precipitation;
  late List<double> probability;
  late String description;

  Minutely.fromJson(Map<String, dynamic> json) {
    status = json['status'];
    datasource = json['datasource'];
    precipitation2h = json['precipitation_2h'].cast<double>();
    precipitation = json['precipitation'].cast<double>();
    probability = json['probability'].cast<double>();
    description = json['description'];
  }

  Map<String, dynamic> toJson() {
    return {
      'status': status,
      'datasource': datasource,
      'precipitation_2h': precipitation2h,
      'precipitation': precipitation,
      'probability': probability,
      'description': description,
    };
  }
}

class Hourly {
  late String status;
  late String description;
  late List<HourlyPrecipitation> precipitation;
  late List<HourlyTemperature> temperature;
  late List<HourlyApparentTemperature> apparentTemperature;
  late List<HourlyWind> wind;
  late List<HourlyHumidity> humidity;
  late List<HourlyCloudrate> cloudrate;
  late List<HourlySkycon> skycon;
  late List<HourlyPressure> pressure;
  late List<HourlyVisibility> visibility;
  late List<HourlyDswrf> dswrf;
  late HourlyAirQuality airQuality;

  Hourly.fromJson(Map<String, dynamic> json) {
    status = json['status'];
    description = json['description'];

    precipitation = (json['precipitation'] as List)
        .map((v) => HourlyPrecipitation.fromJson(v))
        .toList();

    temperature = (json['temperature'] as List)
        .map((v) => HourlyTemperature.fromJson(v))
        .toList();

    apparentTemperature = (json['apparent_temperature'] as List)
        .map((v) => HourlyApparentTemperature.fromJson(v))
        .toList();

    wind = (json['wind'] as List).map((v) => HourlyWind.fromJson(v)).toList();

    humidity = (json['humidity'] as List)
        .map((v) => HourlyHumidity.fromJson(v))
        .toList();

    cloudrate = (json['cloudrate'] as List)
        .map((v) => HourlyCloudrate.fromJson(v))
        .toList();

    skycon = (json['skycon'] as List).map((v) {
      return HourlySkycon.fromJson(v);
    }).toList();

    pressure = (json['pressure'] as List)
        .map((v) => HourlyPressure.fromJson(v))
        .toList();

    visibility = (json['visibility'] as List)
        .map((v) => HourlyVisibility.fromJson(v))
        .toList();

    dswrf = (json['dswrf'] as List).map((v) {
      return HourlyDswrf.fromJson(v);
    }).toList();

    airQuality = HourlyAirQuality.fromJson(json['air_quality']);
  }

  Map<String, dynamic> toJson() {
    return {
      'status': status,
      'description': description,
      'precipitation': precipitation.map((v) => v.toJson()).toList(),
      'temperature': temperature.map((v) => v.toJson()).toList(),
      'apparent_temperature': apparentTemperature.map((v) {
        return v.toJson();
      }).toList(),
      'wind': wind.map((v) => v.toJson()).toList(),
      'humidity': humidity.map((v) => v.toJson()).toList(),
      'cloudrate': cloudrate.map((v) => v.toJson()).toList(),
      'skycon': skycon.map((v) => v.toJson()).toList(),
      'pressure': pressure.map((v) => v.toJson()).toList(),
      'visibility': visibility.map((v) => v.toJson()).toList(),
      'dswrf': dswrf.map((v) => v.toJson()).toList(),
      'air_quality': airQuality.toJson(),
    };
  }
}

class HourlyAirQuality {
  late List<HourlyAqi> aqi;
  late List<HourlyPM25> pm25;

  HourlyAirQuality.fromJson(Map<String, dynamic> json) {
    aqi = (json['aqi'] as List).map((v) => HourlyAqi.fromJson(v)).toList();
    pm25 = (json['pm25'] as List).map((v) => HourlyPM25.fromJson(v)).toList();
  }

  Map<String, dynamic> toJson() {
    return {
      'aqi': aqi.map((v) => v.toJson()).toList(),
      'pm25': pm25.map((v) => v.toJson()).toList(),
    };
  }
}

class HourlyAqi {
  late DateTime datetime;
  late Aqi value;

  HourlyAqi.fromJson(Map<String, dynamic> json) {
    datetime = DateTime.parse(json['datetime']);
    value = Aqi.fromJson(json['value']);
  }

  Map<String, dynamic> toJson() {
    return {
      'value': value.toJson(),
      'datetime': datetime,
    };
  }
}

class HourlyPrecipitation {
  late DateTime datetime;
  late double value;
  late double probability;

  HourlyPrecipitation.fromJson(Map<String, dynamic> json) {
    datetime = DateTime.parse(json['datetime']);
    value = (json['value'] as num).toDouble();
    probability = (json['probability'] as num).toDouble();
  }

  Map<String, dynamic> toJson() {
    return {
      'datetime': datetime,
      'value': value,
      'probability': probability,
    };
  }
}

class HourlyWind extends Wind {
  late DateTime datetime;

  HourlyWind.fromJson(Map<String, dynamic> json) : super.fromJson(json) {
    datetime = DateTime.parse(json['datetime']);
  }

  @override
  Map<String, dynamic> toJson() {
    return {
      'speed': speed,
      'direction': direction,
      'datetime': datetime,
    };
  }
}

class HourlySkycon {
  late DateTime datetime;
  late String value;

  HourlySkycon.fromJson(Map<String, dynamic> json) {
    datetime = DateTime.parse(json['datetime']);
    value = json['value'];
  }

  Map<String, dynamic> toJson() {
    return {
      'datetime': datetime,
      'value': value,
    };
  }
}

class HourlyItem {
  late DateTime datetime;
  late double value;

  HourlyItem.fromJson(Map<String, dynamic> json) {
    datetime = DateTime.parse(json['datetime']);
    value = (json['value'] as num).toDouble();
  }

  Map<String, dynamic> toJson() {
    return {
      'datetime': datetime,
      'value': value,
    };
  }
}

typedef HourlyVisibility = HourlyItem;
typedef HourlyTemperature = HourlyItem;
typedef HourlyApparentTemperature = HourlyTemperature;
typedef HourlyHumidity = HourlyItem;
typedef HourlyCloudrate = HourlyItem;
typedef HourlyPressure = HourlyItem;
typedef HourlyDswrf = HourlyItem;
typedef HourlyPM25 = HourlyItem;

// 逐天
class Daily {
  late String status;
  late List<Astro> astro;
  late List<Precipitation08h20h> precipitation08h20h;
  late List<Precipitation20h32h> precipitation20h32h;
  late List<PrecipitationBase> precipitation;
  late List<DailyTemperature> temperature;
  late List<Temperature08h20h> temperature08h20h;
  late List<Temperature20h32h> temperature20h32h;
  late List<DailyWind> wind;
  late List<Wind08h20h> wind08h20h;
  late List<Wind20h32h> wind20h32h;
  late List<DailyHumidity> humidity;
  late List<DailyCloudrate> cloudrate;
  late List<DailyPressure> pressure;
  late List<DailyVisibility> visibility;
  late List<DailyDswrf> dswrf;
  late DailyAirQuality airQuality;
  late List<DailySkycon> skycon;
  late List<Skycon08h20h> skycon08h20h;
  late List<Skycon20h32h> skycon20h32h;
  late LifeIndex lifeIndex;

  Daily.fromJson(Map<String, dynamic> json) {
    status = json['status'];
    astro = (json['astro'] as List).map((v) => Astro.fromJson(v)).toList();

    precipitation08h20h = (json['precipitation_08h_20h'] as List)
        .map((v) => Precipitation08h20h.fromJson(v))
        .toList();

    precipitation20h32h = (json['precipitation_20h_32h'] as List)
        .map((v) => Precipitation20h32h.fromJson(v))
        .toList();

    precipitation = (json['precipitation'] as List)
        .map((v) => PrecipitationBase.fromJson(v))
        .toList();

    temperature = (json['temperature'] as List)
        .map((v) => DailyTemperature.fromJson(v))
        .toList();

    temperature08h20h = (json['temperature_08h_20h'] as List)
        .map((v) => Temperature08h20h.fromJson(v))
        .toList();

    temperature20h32h = (json['temperature_20h_32h'] as List)
        .map((v) => Temperature20h32h.fromJson(v))
        .toList();

    wind = (json['wind'] as List).map((v) => DailyWind.fromJson(v)).toList();

    wind08h20h = (json['wind_08h_20h'] as List)
        .map((v) => Wind08h20h.fromJson(v))
        .toList();

    wind20h32h = (json['wind_20h_32h'] as List)
        .map((v) => Wind20h32h.fromJson(v))
        .toList();

    humidity = (json['humidity'] as List)
        .map((v) => DailyHumidity.fromJson(v))
        .toList();

    cloudrate = (json['cloudrate'] as List)
        .map((v) => DailyCloudrate.fromJson(v))
        .toList();

    pressure = (json['pressure'] as List)
        .map((v) => DailyPressure.fromJson(v))
        .toList();

    visibility = (json['visibility'] as List)
        .map((v) => DailyVisibility.fromJson(v))
        .toList();

    dswrf = (json['dswrf'] as List).map((v) => DailyDswrf.fromJson(v)).toList();

    airQuality = DailyAirQuality.fromJson(json['air_quality']);

    skycon = (json['skycon'] as List).map((v) {
      return DailySkycon.fromJson(v);
    }).toList();

    skycon08h20h = (json['skycon_08h_20h'] as List)
        .map((v) => Skycon08h20h.fromJson(v))
        .toList();

    skycon20h32h = (json['skycon_20h_32h'] as List)
        .map((v) => Skycon20h32h.fromJson(v))
        .toList();

    lifeIndex = LifeIndex.fromJson(json['life_index']);
  }

  Map<String, dynamic> toJson() {
    return {
      'status': status,
      'astro': astro.map((v) => v.toJson()).toList(),
      'precipitation_08h_20h':
          precipitation08h20h.map((v) => v.toJson()).toList(),
      'precipitation_20h_32h':
          precipitation20h32h.map((v) => v.toJson()).toList(),
      'precipitation': precipitation.map((v) => v.toJson()).toList(),
      'temperature': temperature.map((v) => v.toJson()).toList(),
      'temperature_08h_20h': temperature08h20h.map((v) => v.toJson()).toList(),
      'temperature_20h_32h': temperature20h32h.map((v) => v.toJson()).toList(),
      'wind': wind.map((v) => v.toJson()).toList(),
      'wind_08h_20h': wind08h20h.map((v) => v.toJson()).toList(),
      'wind_20h_32h': wind20h32h.map((v) => v.toJson()).toList(),
      'humidity': humidity.map((v) => v.toJson()).toList(),
      'cloudrate': cloudrate.map((v) => v.toJson()).toList(),
      'pressure': pressure.map((v) => v.toJson()).toList(),
      'visibility': visibility.map((v) => v.toJson()).toList(),
      'dswrf': dswrf.map((v) => v.toJson()).toList(),
      'life_index': lifeIndex.toJson(),
      'skycon_20h_32h': skycon20h32h.map((v) => v.toJson()).toList(),
      'skycon_08h_20h': skycon08h20h.map((v) => v.toJson()).toList(),
      'skycon': skycon.map((v) => v.toJson()).toList(),
      'air_quality': airQuality.toJson(),
    };
  }
}

class DailyAirQuality {
  late List<DailyAqi> aqi;
  late List<Pm25> pm25;

  DailyAirQuality.fromJson(Map<String, dynamic> json) {
    aqi = (json['aqi'] as List).map((v) => DailyAqi.fromJson(v)).toList();
    pm25 = (json['pm25'] as List).map((v) => Pm25.fromJson(v)).toList();
  }

  Map<String, dynamic> toJson() {
    return {
      'aqi': aqi.map((v) => v.toJson()).toList(),
      'pm25': pm25.map((v) => v.toJson()).toList(),
    };
  }
}

class DailyAqi {
  late DateTime date;
  late Aqi max;
  late Aqi avg;
  late Aqi min;

  DailyAqi.fromJson(Map<String, dynamic> json) {
    date = DateTime.parse(json['date']);
    max = Aqi.fromJson(json['max']);
    avg = Aqi.fromJson(json['avg']);
    min = Aqi.fromJson(json['min']);
  }

  Map<String, dynamic> toJson() {
    return {
      'max': max.toJson(),
      'min': min.toJson(),
      'avg': avg.toJson(),
      'datetime': date,
    };
  }
}

class Astro {
  late DateTime date;
  late Sunrise sunrise;
  late SunSet sunset;

  Astro.fromJson(Map<String, dynamic> json) {
    date = DateTime.parse(json['date']);
    sunrise = Sunrise.fromJson(json['sunrise']);
    sunset = Sunrise.fromJson(json['sunset']);
  }

  Map<String, dynamic> toJson() {
    return {
      'date': date,
      'sunset': sunset.toJson(),
      'sunrise': sunrise.toJson(),
    };
  }
}

class Sunrise {
  late String time;

  Sunrise.fromJson(Map<String, dynamic> json) {
    time = json['time'];
  }

  Map<String, dynamic> toJson() {
    return {
      'time': time,
    };
  }
}

typedef SunSet = Sunrise;

// 逐天降水
class PrecipitationBase {
  late DateTime date;
  late double max;
  late double min;
  late double avg;
  late double probability;

  PrecipitationBase.fromJson(Map<String, dynamic> json) {
    date = DateTime.parse(json['date']);
    max = (json['max'] as num).toDouble();
    min = (json['min'] as num).toDouble();
    avg = (json['avg'] as num).toDouble();
    probability = (json['probability'] as num).toDouble();
  }

  Map<String, dynamic> toJson() {
    return {
      'date': date,
      'max': max,
      'min': min,
      'avg': avg,
      'probability': probability,
    };
  }
}

typedef Precipitation08h20h = PrecipitationBase;
typedef Precipitation20h32h = PrecipitationBase;

class DailyTemperature {
  late DateTime date;
  late double max;
  late double min;
  late double avg;

  DailyTemperature.fromJson(Map<String, dynamic> json) {
    date = DateTime.parse(json['date']);
    max = (json['max'] as num).toDouble();
    min = (json['min'] as num).toDouble();
    avg = (json['avg'] as num).toDouble();
  }

  Map<String, dynamic> toJson() {
    return {
      'date': date,
      'max': max,
      'min': min,
      'avg': avg,
    };
  }
}

typedef Temperature08h20h = DailyTemperature;
typedef Temperature20h32h = DailyTemperature;

// 逐天
class DailyItem {
  late DateTime date;
  late double max;
  late double min;
  late double avg;

  DailyItem.fromJson(Map<String, dynamic> json) {
    date = DateTime.parse(json['date']);
    max = (json['max'] as num).toDouble();
    min = (json['min'] as num).toDouble();
    avg = (json['avg'] as num).toDouble();
  }

  Map<String, dynamic> toJson() {
    return {
      'date': date,
      'max': max,
      'min': min,
      'avg': avg,
    };
  }
}

class DailyWind {
  late DateTime date;
  late Wind max;
  late Wind min;
  late Wind avg;

  DailyWind.fromJson(Map<String, dynamic> json) {
    date = DateTime.parse(json['date']);
    max = Wind.fromJson(json['max']);
    min = Wind.fromJson(json['min']);
    avg = Wind.fromJson(json['avg']);
  }

  Map<String, dynamic> toJson() {
    return {
      'date': date,
      'max': max,
      'min': min,
      'avg': avg,
    };
  }
}

typedef Wind08h20h = DailyWind;
typedef Wind20h32h = DailyWind;
typedef DailyHumidity = DailyItem;
typedef DailyCloudrate = DailyItem;
typedef DailyPressure = DailyItem;
typedef DailyDswrf = DailyItem;
typedef DailyVisibility = DailyItem;

class Pm25 {
  late DateTime date;
  late double max;
  late double avg;
  late double min;

  Pm25.fromJson(Map<String, dynamic> json) {
    date = DateTime.parse(json['date']);
    max = (json['max'] as num).toDouble();
    avg = (json['avg'] as num).toDouble();
    min = (json['min'] as num).toDouble();
  }

  Map<String, dynamic> toJson() {
    return {
      'date': date,
      'max': max,
      'avg': avg,
      'min': min,
    };
  }
}

// 逐天天气图标
class DailySkycon {
  late DateTime date;
  late String value;

  DailySkycon.fromJson(Map<String, dynamic> json) {
    date = DateTime.parse(json['date']);
    value = json['value'];
  }

  Map<String, dynamic> toJson() {
    return {
      'date': date,
      'value': value,
    };
  }
}

typedef Skycon08h20h = DailySkycon;
typedef Skycon20h32h = DailySkycon;

class LifeIndex {
  late List<Ultraviolet> ultraviolet;
  late List<CarWashing> carWashing;
  late List<Dressing> dressing;
  late List<Comfort> comfort;
  late List<ColdRisk> coldRisk;

  LifeIndex.fromJson(Map<String, dynamic> json) {
    ultraviolet = (json['ultraviolet'] as List)
        .map((v) => Ultraviolet.fromJson(v))
        .toList();

    carWashing = (json['carWashing'] as List)
        .map((v) => CarWashing.fromJson(v))
        .toList();

    dressing = (json['dressing'] as List).map((v) {
      return Dressing.fromJson(v);
    }).toList();

    comfort = (json['comfort'] as List).map((v) {
      return Comfort.fromJson(v);
    }).toList();

    coldRisk = (json['coldRisk'] as List).map((v) {
      return ColdRisk.fromJson(v);
    }).toList();
  }

  Map<String, dynamic> toJson() {
    return {
      'ultraviolet': ultraviolet.map((v) => v.toJson()).toList(),
      'carWashing': carWashing.map((v) => v.toJson()).toList(),
      'dressing': dressing.map((v) => v.toJson()).toList(),
      'comfort': comfort.map((v) => v.toJson()).toList(),
      'coldRisk': coldRisk.map((v) => v.toJson()).toList(),
    };
  }
}

class DailyLifeIndex extends LifeIndexItem {
  late DateTime date;

  DailyLifeIndex.fromJson(Map<String, dynamic> json) : super.fromJson(json) {
    date = DateTime.parse(json['date']);
  }

  @override
  Map<String, dynamic> toJson() {
    return {
      'date': date,
      'index': index,
      'desc': desc,
    };
  }
}

typedef Ultraviolet = DailyLifeIndex;
typedef CarWashing = DailyLifeIndex;
typedef Dressing = DailyLifeIndex;
typedef Comfort = DailyLifeIndex;
typedef ColdRisk = DailyLifeIndex;
