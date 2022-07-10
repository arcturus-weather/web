export default {
  appInfo: {
    project: 'ice weather',
    github: 'github',
    issue: 'issue/feedback',
    contributors: 'contributors',
  },
  date: {
    morning: 'morning',
    afternoon: 'afternoon',
    evening: 'evening',
    night: 'night',
    day: 'day',
    pubTime: 'publish',
  },
  weather: {
    astronomy: {
      label: 'sun & moon',
      moonphase: 'moon phase',
      illumination: 'illumination',
      moonPhaseValue: 'value',
    },
    wind: {
      speed: 'wind speed',
    },
    temperature: {
      label: 'temperature',
      max: 'max temp',
      min: 'min temp',
    },
    pressure: 'pressure',
    dew: 'dew point',
    humidity: 'humidity',
    visibility: 'visibility',
    coluds: 'coluds',
    uvIndex: 'uv index',
    precipitation: 'precipitation',
    precipChance: 'precip chance',
    aqi: 'air quality index',
    hourly: 'hourly',
    daily: 'daily',
    air: {
      excellent: 'excellent',
      good: 'good',
      lightlyPollution: 'lightly',
      ModeratePollution: 'moderate',
      HeavyPollution: 'heavy',
      SeriousPollution: 'serious',
    },
  },
  account: {
    logOut: 'log out',
    logIn: 'log in',
    backLogIn: 'back to login',
    signIn: 'sign in',
    forget: 'forget password',
    username: 'username',
    password: 'password',
    repeat: 'repeat password',
    reset: 'reset password',
    code: 'identifying code',
  },
  waring: {
    key: 'key is missing',
  },
  setting: {
    theme: {
      label: 'theme',
      darkMode: 'dark mode',
      autoMode: 'auto mode',
      lightMode: 'light mode',
      systemMode: 'follow system',
    },
    language: {
      label: 'language',
    },
    dataSources: {
      label: 'data sources',
      qWeather: 'qWeather',
      openWeather: 'openWeather',
      caiyun: 'caiyun',
    },
  },
  map: {
    label: 'map',
    placeholder: 'please input address',
    select: 'select addr with map',
    err: 'Locate failure',
  },
  confirm: 'confirm',
  cacel: 'cacel',
  settings: 'setting',
  calendar: 'calendar',
  about: 'about',
  favorites: 'favorites',
  dashBoard: 'dashboard',
  back: 'back to home',
};

export const time: Record<string, Intl.DateTimeFormatOptions> = {
  short: {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  },
  day: {
    month: 'short',
    day: 'numeric',
  },
  long: {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    weekday: 'short',
    hour: 'numeric',
    minute: 'numeric',
  },
  hour: {
    hour: 'numeric',
    hour12: true,
  },
  time: {
    hour: 'numeric',
    minute: 'numeric',
  },
  week: {
    weekday: 'short',
  },
};
