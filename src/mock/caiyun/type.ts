export interface CYCaiyunRes {
  status: string;
  api_version: string;
  api_status: string;
  lang: string;
  unit: string;
  tzshift: number;
  timezone: string;
  server_time: number;
  location: number[];
  result: CYResult;
}

export interface CYResult {
  alert: CYAlert;
  realtime: CYRealtime;
  minutely: CYMinutely;
  hourly: CYHourly;
  daily: CYDaily;
  primary: number;
  forecast_keypoint: string;
}

export interface CYAlert {
  status: string;
  content: CYContent[];
  adcodes: CYAdcodes[];
}

interface CYAdcodes {
  adcode: number;
  name: string;
}

interface CYContent {
  province: string;
  status: string;
  code: string;
  description: string;
  regionId: string;
  county: string;
  pubtimestamp: number;
  latlon: number[];
  city: string;
  alertId: string;
  title: string;
  adcode: string;
  source: string;
  location: string;
  request_status: string;
}

export interface CYRealtime {
  status: string;
  temperature: number;
  humidity: number;
  cloudrate: number;
  skycon: string;
  visibility: number;
  dswrf: number;
  wind: {
    speed: number;
    direction: number;
  };
  pressure: number;
  apparent_temperature: number;
  precipitation: {
    local: {
      status: string;
      datasource: string;
      intensity: number;
    };
    nearest: {
      status: string;
      distance: number;
      intensity: number;
    };
  };
  air_quality: CYAqi;
  life_index: CYLifeIndex;
}

export interface CYAqi {
  pm25: number;
  pm10: number;
  o3: number;
  so2: number;
  no2: number;
  co: number;
  aqi: {
    chn: number;
    usa: number;
  };
  description: {
    chn: string;
    usa: string;
  };
}

export interface CYLifeIndex {
  ultraviolet: {
    index: number;
    desc: string;
  };
  comfort: {
    index: number;
    desc: string;
  };
}

export interface CYMinutely {
  status: string;
  datasource: string;
  precipitation_2h: number[];
  precipitation: number[];
  probability: number[];
  description: string;
}

export interface CYHourly {
  status: string;
  description: string;
  precipitation: {
    datetime: string;
    value: number;
    probability: number;
  }[];
  temperature: {
    datetime: string;
    value: number;
  }[];
  apparent_temperature: {
    datetime: string;
    value: number;
  }[];
  wind: {
    datetime: string;
    speed: number;
    direction: number;
  }[];
  humidity: {
    datetime: string;
    value: number;
  }[];
  cloudrate: {
    datetime: string;
    value: number;
  }[];
  skycon: {
    datetime: string;
    value: string;
  }[];
  pressure: {
    datetime: string;
    value: number;
  }[];
  visibility: {
    datetime: string;
    value: number;
  }[];
  dswrf: {
    datetime: string;
    value: number;
  }[];
  air_quality: {
    aqi: {
      datetime: string;
      value: {
        chn: number;
        usa: number;
      };
    }[];
    pm25: {
      datetime: string;
      value: number;
    }[];
  };
}

export interface CYDaily {
  status: string;
  astro: CYSun[];
  precipitation_08h_20h: CYPrecipitation08h20h[];
  precipitation_20h_32h: CYPrecipitation20h32h[];
  precipitation: {
    date: string;
    max: number;
    min: number;
    avg: number;
    probability: number;
  }[];
  temperature: {
    date: string;
    max: number;
    min: number;
    avg: number;
  }[];
  temperature_08h_20h: CYTemperature08h20h[];
  temperature_20h_32h: CYTemperature20h32h[];
  wind: {
    date: string;
    max: {
      speed: number;
      direction: number;
    };
    min: {
      speed: number;
      direction: number;
    };
    avg: {
      speed: number;
      direction: number;
    };
  }[];
  wind_08h_20h: CYWind08h20h[];
  wind_20h_32h: CYWind20h32h[];
  humidity: {
    date: string;
    max: number;
    min: number;
    avg: number;
  }[];
  cloudrate: {
    date: string;
    max: number;
    min: number;
    avg: number;
  }[];
  pressure: {
    date: string;
    max: number;
    min: number;
    avg: number;
  }[];
  visibility: {
    date: string;
    max: number;
    min: number;
    avg: number;
  }[];
  dswrf: {
    date: string;
    max: number;
    min: number;
    avg: number;
  }[];
  air_quality: {
    aqi: {
      date: string;
      max: {
        chn: number;
        usa: number;
      };
      avg: {
        chn: number;
        usa: number;
      };
      min: {
        chn: number;
        usa: number;
      };
    }[];
    pm25: {
      date: string;
      max: number;
      avg: number;
      min: number;
    }[];
  };
  skycon: {
    date: string;
    value: string;
  }[];
  skycon_08h_20h: CYSkycon08h20h[];
  skycon_20h_32h: CYSkycon20h32h[];
  life_index: {
    ultraviolet: CYUltraviolet[];
    carWashing: CYCarWashing[];
    dressing: CYDressing[];
    comfort: CYComfort[];
    coldRisk: CYColdRisk[];
  };
}

export interface CYSun {
  date: string;
  sunrise: {
    time: string;
  };
  sunset: {
    time: string;
  };
}

interface CYPrecipitation08h20h {
  date: string;
  max: number;
  min: number;
  avg: number;
  probability: number;
}

interface CYPrecipitation20h32h {
  date: string;
  max: number;
  min: number;
  avg: number;
  probability: number;
}

interface CYTemperature08h20h {
  date: string;
  max: number;
  min: number;
  avg: number;
}

interface CYTemperature20h32h {
  date: string;
  max: number;
  min: number;
  avg: number;
}

interface CYWind08h20h {
  date: string;
  max: {
    speed: number;
    direction: number;
  };
  min: {
    speed: number;
    direction: number;
  };
  avg: {
    speed: number;
    direction: number;
  };
}

interface CYWind20h32h {
  date: string;
  max: {
    speed: number;
    direction: number;
  };
  min: {
    speed: number;
    direction: number;
  };
  avg: {
    speed: number;
    direction: number;
  };
}

interface CYSkycon08h20h {
  date: string;
  value: string;
}

interface CYSkycon20h32h {
  date: string;
  value: string;
}

interface CYComfort {
  date: string;
  index: string;
  desc: string;
}

interface CYUltraviolet {
  date: string;
  index: string;
  desc: string;
}

interface CYColdRisk {
  date: string;
  index: string;
  desc: string;
}

interface CYDressing {
  date: string;
  index: string;
  desc: string;
}

interface CYCarWashing {
  date: string;
  index: string;
  desc: string;
}
