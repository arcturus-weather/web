<template>
  <q-page padding>
    <!-- 主题切换 -->
    <div class="q-ma-lg">
      <div class="text-h6 q-mb-md">{{ $t('setting.theme.label') }}</div>
      <ice-btn-toggle
        v-model="theme"
        @update:model-value="setTheme"
        :options="themes"
      ></ice-btn-toggle>
    </div>
    <!-- 数据源切换 -->
    <div class="q-ma-lg">
      <div class="text-h6 q-mb-md">{{ $t('setting.dataSources.label') }}</div>
      <ice-btn-toggle
        :options="dataSources"
        v-model="dataSource"
      ></ice-btn-toggle>
    </div>
    <!-- 语言切换 -->
    <div class="q-ma-lg">
      <div class="text-h6 q-mb-md">{{ $t('setting.language.label') }}</div>
      <q-select
        outlined
        style="width: 200px"
        v-model="language"
        :options="languages"
        @update:model-value="setLanguages"
      >
        <template v-slot:prepend>
          <q-icon name="mdi-translate" />
        </template>
      </q-select>
    </div>
  </q-page>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import { useSettingStore } from 'stores/stores';
import { useI18n } from 'vue-i18n';
import { languageMap } from 'utils/utils';
import iceBtnToggle from 'src/components/ice-btn-toggle.vue';

const setting = useSettingStore();

export default defineComponent({
  name: 'SettingsPage',

  components: { iceBtnToggle },

  methods: {
    setTheme(theme: Themes) {
      setting.setTheme(theme);
      setting.saveTheme(theme);
    },

    setDataSource(source: DataSources) {
      setting.setDataSource(source);
      setting.saveDataSource(source);
    },

    setLanguages(lang: string) {
      // lang: '简体中文' | 'English' | '繁体中文'
      this.locale = languageMap[lang];
      setting.setLanguage(lang);
      setting.saveLanguage();
    },
  },

  computed: {
    // 主题
    themes() {
      return [
        {
          label: this.$t('setting.theme.lightMode'),
          value: 'lightMode',
          icon: 'mdi-white-balance-sunny',
        },
        {
          label: this.$t('setting.theme.darkMode'),
          value: 'darkMode',
          icon: 'mdi-weather-night',
        },
        {
          label: this.$t('setting.theme.systemMode'),
          value: 'systemMode',
          icon: 'mdi-weather-night',
        },
        {
          label: this.$t('setting.theme.autoMode'),
          value: 'autoMode',
          icon: 'mdi-cellphone-link',
        },
      ];
    },

    // 数据源
    dataSources() {
      return [
        {
          label: this.$t('setting.dataSources.qWeather'),
          value: 'qWeather',
          disable: false,
        },
        {
          label: this.$t('setting.dataSources.openWeather'),
          value: 'openWeather',
          disable: true,
        },
        {
          label: this.$t('setting.dataSources.caiyun'),
          value: 'caiyun',
          disable: true,
        },
      ];
    },
  },

  setup() {
    const { locale } = useI18n();

    return {
      theme: ref(setting.theme),
      dataSource: ref(setting.dataSource),
      languages: Object.keys(languageMap),
      language: ref(setting.language),
      locale,
    };
  },
});
</script>
