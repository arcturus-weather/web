<template>
  <router-view />
</template>

<script lang="ts">
import { useQuasar } from 'quasar';
import { defineComponent, onMounted } from 'vue';
import { useI18n } from 'vue-i18n';
import { useSettingStore } from './stores/stores';

if (process.env.NODE_ENV === 'development') {
  import('utils/mock');
}

console.log(process.env)

export default defineComponent({
  name: 'App',
  setup() {
    const { locale } = useI18n();

    onMounted(() => {
      const setting = useSettingStore();
      // 如果从本地获取失败就使用默认值, 这里不需要 save 进本地
      setting.setTheme(setting.getTheme() ?? setting.theme);
      setting.setDataSource(setting.getDataSource() ?? setting.dataSource);

      // 修改语言环境
      const $q = useQuasar();
      const lang = setting.getLanguage();
      const userLang = $q.lang.getLocale(); // 用户语言环境
      // 优先使用用户自定义的(从本地存储中获取)
      // 缓存中没有, 则根据用户的语言环境设置
      // 语言环境若获取失败, 则使用默认的
      locale.value = lang?.value ?? userLang ?? setting.language.value;
      // 如果是根据用户语言环境设置的, 还需要把状态管理上的数据改一下
      if (!lang && userLang) {
        setting.setLanguage(userLang as languages);
      }
    });
  },
});
</script>
