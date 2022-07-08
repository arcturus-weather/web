export default {
  appInfo: {
    project: '小冰天氣',
    github: '項目地址',
    issue: '問題/建議',
    contributors: '貢獻者',
  },
  date: {
    morning: '早晨',
    afternoon: '中午',
    evening: '旁晚',
    night: '夜間',
    day: '日間',
    pubTime: '發布時間',
  },
  weather: {
    astronomy: {
      label: '日月升落',
      moonphase: '月相',
      illumination: '照明度',
      moonPhaseValue: '月相數值',
    },
    wind: {
      speed: '風速',
    },
    temperature: {
      label: '溫度',
      max: '最高溫度',
      min: '最低溫度',
    },
    pressure: '大氣壓',
    dew: '露點溫度',
    humidity: '空氣濕度',
    visibility: '能見度',
    coluds: '雲量',
    uvIndex: '紫外線指數',
    precipitation: '降水量',
    precipChance: '降水概率',
    aqi: '空氣質量指數',
    hourly: '小時概述',
    daily: '逐日概述',
    air: {
      excellent: '優',
      good: '良',
      lightlyPollution: '輕度汙染',
      ModeratePollution: '中度汙染',
      HeavyPollution: '重度汙染',
      SeriousPollution: '嚴重汙染',
    },
  },
  account: {
    logOut: '退出',
    logIn: '登錄',
    signIn: '註冊',
    forget: '忘記密碼',
  },
  waring: {
    key: 'key 缺失',
  },
  setting: {
    theme: {
      label: '主題',
      darkMode: '暗黑模式',
      autoMode: '自動模式',
      lightMode: '亮色模式',
      systemMode: '跟隨系統',
    },
    language: {
      label: '語言',
    },
    dataSources: {
      label: '數據提供商',
      qWeather: '和風天氣',
      openWeather: 'openWeather',
      caiyun: '彩雲天氣',
    },
  },
  map: {
    label: '地圖',
    placeholder: '請輸入地點',
    select: '地圖選點',
  },
  confirm: '確認',
  cacel: '取消',
  settings: '設置',
  calendar: '日歷',
  about: '關於',
  favorites: '收藏',
  dashBoard: '儀表盤',
};

export const time: Record<string, Intl.DateTimeFormatOptions> = {
  short: {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  },
  long: {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
    weekday: 'short',
  },
  hour: {
    hour: 'numeric',
    hour12: false,
  },
  time: {
    hour: 'numeric',
    minute: 'numeric',
  },
};
