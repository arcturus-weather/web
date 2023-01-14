import enUS, { time as EN_Time } from './en-US';
import zhCN, { time as CN_Time } from './zh-CN';
import zhTW, { time as TW_Time } from './zh-TW';

export default {
  'en-US': enUS,
  'en-GB': enUS,
  'zh-CN': zhCN,
  'zh-TW': zhTW,
};

export const datetimeFormats = {
  'zh-TW': TW_Time,
  'zh-CN': CN_Time,
  'en-US': EN_Time,
  'en-GB': EN_Time,
};
