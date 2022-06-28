<template>
  <q-page padding>
    <!-- 主题切换 -->
    <div class="q-ma-lg">
      <div class="text-h6 q-mb-md">{{ $t('setting.theme') }}</div>
      <div>
        <q-btn-toggle
          unelevated
          v-model="theme"
          @update:model-value="setTheme"
          :options="themes"
          padding="10px 15px"
        />
      </div>
    </div>
    <!-- 数据源切换 -->
    <div class="q-ma-lg">
      <div class="text-h6 q-mb-md">{{ $t('setting.dataSources') }}</div>
      <div>
        <q-btn-toggle
          unelevated
          v-model="dataSource"
          @update:model-value="setDataSource"
          :options="dataSources"
          color="grey-11"
          text-color="black"
          toggle-text-color="white"
          padding="10px 15px"
        />
      </div>
    </div>
  </q-page>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import { i18n } from 'boot/i18n';
import { useSettingStore } from 'stores/stores';
import { Themes } from 'stores/stores';

const setting = useSettingStore();

export default defineComponent({
  name: 'SettingsPage',

  methods: {
    setTheme(theme: Themes) {
      setting.setTheme(theme);
      setting.saveTheme(theme);
    },
    setDataSource(source: DataSources) {
      setting.setDataSource(source);
      setting.saveDataSource(source);
    },
  },
  setup() {
    const themes = [
      {
        label: i18n.global.t('setting.lightMode'),
        value: 'lightMode',
        icon: 'mdi-white-balance-sunny',
        disable: false,
      },
      {
        label: i18n.global.t('setting.darkMode'),
        value: 'darkMode',
        icon: 'mdi-weather-night',
        disable: false,
      },
      {
        label: i18n.global.t('setting.systemMode'),
        value: 'systemMode',
        icon: 'mdi-weather-night',
        disable: false,
      },
      {
        label: i18n.global.t('setting.autoMode'),
        value: 'autoMode',
        icon: 'mdi-cellphone-link',
        disable: false,
      },
    ];

    const dataSources = [
      {
        label: i18n.global.t('setting.qWeather'),
        value: 'qWeather',
        disable: false,
      },
      {
        label: i18n.global.t('setting.openWeather'),
        value: 'openWeather',
        disable: true,
      },
      {
        label: i18n.global.t('setting.colorfulClouds'),
        value: 'colorfulClouds',
        disable: true,
      },
    ];

    return {
      themes,
      dataSources,
      dataSource: ref(setting.dataSource),
      theme: ref(setting.theme),
    };
  },
});
</script>

<style lang="scss" scoped></style>
