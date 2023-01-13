<template>
  <router-view />
</template>

<script lang="ts">
import { useQuasar } from 'quasar';
import { defineComponent, onMounted } from 'vue';
import { useI18n } from 'vue-i18n';
import { useSettingStore } from '@stores/stores';
import { languageToOption, mock } from '@utils/utils';

mock();

export default defineComponent({
  name: 'App',
  setup() {
    const { locale } = useI18n();

    // 获取访问人数
    // const user = useUserStore();
    // user.visit();

    onMounted(() => {
      const setting = useSettingStore();

      // set theme
      const theme = setting.getTheme() ?? 'lightMode';
      setting.setTheme(theme);
      setting.theme = theme;

      // set datasource
      const dataSource = setting.getDataSource() ?? 'qWeather';
      setting.setDataSource(dataSource);
      setting.dataSource = dataSource;

      // change language
      const $q = useQuasar();
      const lang = setting.getLanguage() ?? $q.lang.getLocale() ?? 'zh-CN';
      locale.value = lang;
      setting.setLanguage(lang as Languages);
      setting.language = languageToOption[lang as Languages];
    });
  },
});
</script>

