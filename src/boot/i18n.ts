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
    },
    'zh-CN': {
      short: {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
      },
      time: {
        weekday: 'short',
        hour: 'numeric',
        minute: 'numeric',
      },
      time2: {
        hour: 'numeric',
        minute: 'numeric',
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
