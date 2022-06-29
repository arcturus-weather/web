<template>
  <q-page padding>
    <!-- 主题切换 -->
    <div class="q-ma-lg">
      <div class="text-h6 q-mb-md">{{ $t('setting.theme') }}</div>
      <div>
        <q-btn-toggle
          unelevated
          no-caps
          v-model="theme"
          @update:model-value="setTheme"
          :options="themes"
          padding="10px 15px"
          color="grey-11"
          text-color="primary"
        />
      </div>
    </div>
    <!-- 数据源切换 -->
    <div class="q-ma-lg">
      <div class="text-h6 q-mb-md">{{ $t('setting.dataSources') }}</div>
      <div>
        <q-btn-toggle
          unelevated
          no-caps
          v-model="dataSource"
          @update:model-value="setDataSource"
          :options="dataSources"
          color="grey-11"
          text-color="primary"
          padding="10px 15px"
        />
      </div>
    </div>
    <!-- 语言切换 -->
    <div class="q-ma-lg">
      <div class="text-h6 q-mb-md">{{ $t('setting.language') }}</div>
      <div style="width: 200px">
        <q-select
          outlined
          v-model="language"
          :options="languages"
          @update:model-value="setLanguages"
        >
          <template v-slot:prepend>
            <q-icon name="mdi-translate" />
          </template>
        </q-select>
      </div>
    </div>
  </q-page>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { useSettingStore } from 'stores/stores';
import { Themes } from 'stores/stores';
import { storeToRefs } from 'pinia';
import { useI18n } from 'vue-i18n';
import languageList from 'src/i18n/languages';

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
    setLanguages(language: { label: string; value: string }) {
      this.locale = language.value;

      setting.saveLanguage();
    },
  },
  computed: {
    themes() {
      return [
        {
          label: this.$t('setting.lightMode'),
          value: 'lightMode',
          icon: 'mdi-white-balance-sunny',
          disable: false,
        },
        {
          label: this.$t('setting.darkMode'),
          value: 'darkMode',
          icon: 'mdi-weather-night',
          disable: false,
        },
        {
          label: this.$t('setting.systemMode'),
          value: 'systemMode',
          icon: 'mdi-weather-night',
          disable: false,
        },
        {
          label: this.$t('setting.autoMode'),
          value: 'autoMode',
          icon: 'mdi-cellphone-link',
          disable: false,
        },
      ];
    },
    dataSources() {
      return [
        {
          label: this.$t('setting.qWeather'),
          value: 'qWeather',
          disable: false,
        },
        {
          label: this.$t('setting.openWeather'),
          value: 'openWeather',
          disable: true,
        },
        {
          label: this.$t('setting.colorfulClouds'),
          value: 'colorfulClouds',
          disable: true,
        },
      ];
    },
  },
  setup() {
    const { locale } = useI18n();

    const { dataSource, theme, language } = storeToRefs(setting);

    return {
      theme,
      dataSource,
      languages: languageList(),
      language,
      locale,
    };
  },
});
</script>

<style lang="scss" scoped></style>
