import { Notify } from 'quasar';
import { i18n } from 'src/boot/i18n';

export const notify: {
  (m: string, t: string, i: string): void;
  positive(m: string): void;
  negative(m: string): void;
  warning(m: string): void;
  info(m: string): void;
} = function (message: string, type = 'negative', icon: string) {
  Notify.create({ type, message, icon });
};

notify.positive = (m: string) => {
  notify(m, 'positive', 'fa-regular fa-circle-check');
};

notify.negative = (m: string) => {
  notify(m, 'negative', 'fa-solid fa-triangle-exclamation');
};

notify.warning = (m: string) => {
  notify(m, 'warning', 'fa-solid fa-exclamation');
};

notify.info = (m: string) => {
  notify(m, 'info', 'fa-solid fa-circle-exclamation');
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
export const languageToOption: Record<Languages, string> = {
  'zh-CN': '简体中文',
  'zh-TW': '繁體中文',
  'en-US': 'US English',
  'en-GB': 'UK English',
};

export const optionToLanguage = (function (map) {
  const m: Record<string, Languages> = {};

  Object.entries(map).forEach((el) => {
    m[el[1]] = el[0] as Languages;
  });

  return m;
})(languageToOption);

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

export function dateOffset(dst: Date, offset: string) {
  if (/^([0-1]{1}\d|2[0-3]):([0-5]\d)$/.test(offset)) {
    const t = offset.split(':');

    const res = new Date(dst);

    res.setHours(dst.getHours() + Number(t[0]));
    res.setMinutes(dst.getMinutes() + Number(t[1]));

    return res;
  } else if (/^[0-9]+$/.test(offset)) {
    const o = Number(offset);

    const res = new Date(dst);

    res.setMinutes(dst.getMinutes() + o);

    return res;
  }

  return dst;
}

export function log(res: any) {
  if (process.env.NODE_ENV === 'development') {
    console.log(res);
  }
}

export function isDef(obj: any) {
  return typeof obj !== 'undefined' && obj !== null && obj !== '';
}

export function toFixed(n: number, f = 4) {
  return Number(n.toFixed(f));
}
