import { boot } from 'quasar/wrappers';
import { createI18n } from 'vue-i18n';

import messages from 'src/i18n';

const i18n = createI18n({
  locale: 'zh-CN',
  fallbackLocale: 'zh-CN',
  messages,
  datetimeFormats: {
    'en-US': {
      short: {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
      },
      time: {
        weekday: 'short',
        hour: 'numeric',
        minute: 'numeric',
        hour12: true,
      },
      time2: {
        hour: 'numeric',
        minute: 'numeric',
        hour12: true,
      },
      tiem3: {
        hour: 'numeric',
        hour12: true,
      },
    },
    'zh-CN': {
      short: {
        // such as 2022-09-01
        year: 'numeric',
        month: 'short',
        day: 'numeric',
      },
      long: {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        weekday: 'long',
        hour: 'numeric',
        minute: 'numeric',
      },
      time: {
        // such as 周二09:00
        weekday: 'short',
        hour: 'numeric',
        minute: 'numeric',
      },
      time2: {
        // such as 09:00
        hour: 'numeric',
        minute: 'numeric',
      },
      time3: {
        hour: 'numeric',
      },
      week: {
        weekday: 'long',
      },
    },
  },
  globalInjection: true,
  legacy: false,
});

export default boot(({ app }) => {
  // Set i18n instance on app
  app.use(i18n);
});

export { i18n };
