export const languageMap = {
  'zh-CN': '简体中文',
  'en-US': 'English',
  'zh-TW': '繁體中文',
};

export default function () {
  return Object.keys(languageMap).map((e) => ({
    label: languageMap[e],
    value: e,
  }));
}
