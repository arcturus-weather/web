<template>
  <router-view />
</template>

<script lang="ts">
import { useQuasar } from 'quasar';
import { defineComponent, onMounted } from 'vue';
import { useI18n } from 'vue-i18n';
import { useSettingStore } from './stores/stores';
import { languageMap, languageMap_ } from 'utils/utils';

if (process.env.NODE_ENV === 'development') {
  import('utils/mock');
}

export default defineComponent({
  name: 'App',
  setup() {
    const { locale } = useI18n();

    onMounted(() => {
      const setting = useSettingStore();
      const theme = setting.getTheme();
      // 如果从本地获取失败就使用默认值
      setting.setTheme(theme);

      if (theme) {
        setting.theme = theme;
      }

      // 设置数据源
      const dataSource = setting.getDataSource();
      setting.setDataSource(dataSource);

      if (dataSource) {
        setting.dataSource = dataSource;
      }

      // 修改语言环境
      const $q = useQuasar();
      const lang = setting.getLanguage();
      const userLang = $q.lang.getLocale(); // 用户语言环境
      // 优先使用用户自定义的(从本地存储中获取)
      // 缓存中没有, 则根据用户的语言环境设置
      // 语言环境若获取失败, 则使用默认的
      locale.value = lang ? languageMap[lang] : userLang;
      // 如果是根据用户语言环境或者存储设置的, 还需要把状态管理上的数据改一下
      if (lang) {
        setting.setLanguage(lang);
        setting.language = lang;
      } else if (userLang) {
        setting.setLanguage(languageMap_[userLang]);
        setting.language = languageMap_[userLang];
      }
    });
  },
});
</script>

