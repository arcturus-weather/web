import { Notify } from 'quasar';
import { i18n } from 'src/boot/i18n';

export const notify: {
  (m: string, t: string): void;
  positive(m: string): void;
  negative(m: string): void;
  warning(m: string): void;
  info(m: string): void;
  ongoing(m: string): void;
} = function (message: string, type = 'negative') {
  Notify.create({ type, message });
};

notify.positive = (m: string) => {
  notify(m, 'positive');
};

notify.negative = (m: string) => {
  notify(m, 'negative');
};

notify.warning = (m: string) => {
  notify(m, 'warning');
};

notify.info = (m: string) => {
  notify(m, 'info');
};

notify.ongoing = (m: string) => {
  notify(m, 'ongoing');
};

// 防抖函数
export function debounce(fn: (e: any) => void, dur = 1500) {
  let timer: NodeJS.Timeout;

  return function (this: unknown, ...args: any) {
    clearTimeout(timer); // 计时器还在就清掉

    timer = setTimeout(() => {
      fn.apply(this, args);
    }, dur);
  };
}

// 这里的 value 需要和 quasar 获取的语言环境一一对应
// docs: https://quasar.dev/start/upgrade-guide#quasar-language-packs
export const languageMap = {
  简体中文: 'zh-CN',
  English: 'en-US',
  繁體中文: 'zh-TW',
};

export const languageMap_ = (function (map) {
  const m = {};

  Object.entries(map).forEach((el) => {
    m[el[1]] = el[0];
  });

  return m;
})(languageMap);

// 判断邮箱的正确性
export function isValidEmail(val: string): string | boolean {
  const re =
    /^(?=[a-zA-Z0-9@._%+-]{6,254}$)[a-zA-Z0-9._%+-]{1,64}@(?:[a-zA-Z0-9-]{1,63}\.){1,8}[a-zA-Z]{2,63}$/;

  if (val === '') {
    return i18n.global.t('waring.emailMissing');
  } else if (!re.test(val)) {
    return i18n.global.t('waring.emailInvaild');
  }

  return true;
}

// 密码有效性
export function isValidPassword(pwd: string): string | boolean {
  if (pwd === '') {
    return i18n.global.t('waring.passwordRequire');
  } else if (pwd.length < 3) {
    return i18n.global.t('waring.passwordMin');
  } else if (pwd.length > 30) {
    return i18n.global.t('waring.passwordMax');
  }

  return true;
}

