<template>
  <router-view />
</template>

<script lang="ts">
import { defineComponent, onMounted } from 'vue';
import { useSettingStore } from './stores/stores';

if (process.env.NODE_ENV === 'development') {
  import('utils/mock');
}

export default defineComponent({
  name: 'App',
  setup() {
    onMounted(() => {
      const setting = useSettingStore();
      // 如果从本地获取失败就使用默认值, 这里不需要 save 进本地
      setting.setTheme(setting.getTheme() ?? setting.theme);
      setting.setDataSource(setting.getDataSource() ?? setting.dataSource);
    });
  },
});
</script>
