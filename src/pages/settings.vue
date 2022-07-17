<template>
  <q-page padding>
    <!-- 主题切换 -->
    <div class="q-ma-lg">
      <div class="text-h6 q-mb-md">
        {{ $t('setting.theme.label') }}
      </div>
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
        @update:model-value="setDataSource"
        v-model="dataSource"
      ></ice-btn-toggle>
    </div>
    <!-- 语言切换 -->
    <div class="q-ma-lg">
      <div class="text-h6 q-mb-md">
        {{ $t('setting.language.label') }}
      </div>
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
    <div class="q-ma-lg">
      <q-btn
        unelevated
        v-if="user.isLoggedIn()"
        color="primary"
        :label="$t('account.logOut')"
        @click="user.logout"
      ></q-btn>
    </div>
  </q-page>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'SettingsPage',
});
</script>

<script lang="ts" setup>
import { computed, ref } from 'vue';
import { useSettingStore, useUserStore } from 'stores/stores';
import { useI18n } from 'vue-i18n';
import { languageMap } from 'utils/utils';
import { storeToRefs } from 'pinia';
import iceBtnToggle from 'src/components/ice-btn-toggle.vue';

const setting = useSettingStore();
const user = useUserStore();
const { locale, t } = useI18n();

const { theme, dataSource, language } = storeToRefs(setting);
const languages = ref(Object.keys(languageMap));

function setTheme(theme: Themes) {
  setting.setTheme(theme);
  setting.saveTheme(theme);
}

function setDataSource(source: DataSources) {
  setting.setDataSource(source);
  setting.saveDataSource(source);
}

function setLanguages(lang: string) {
  // lang: '简体中文' | 'English' | '繁体中文'
  locale.value = languageMap[lang];
  setting.setLanguage(lang);
  setting.saveLanguage();
}

// 主题
const themes = computed(() => {
  return [
    {
      label: t('setting.theme.lightMode'),
      value: 'lightMode',
      icon: 'mdi-white-balance-sunny',
    },
    {
      label: t('setting.theme.darkMode'),
      value: 'darkMode',
      icon: 'mdi-weather-night',
    },
    {
      label: t('setting.theme.systemMode'),
      value: 'systemMode',
      icon: 'mdi-weather-night',
    },
    {
      label: t('setting.theme.autoMode'),
      value: 'autoMode',
      icon: 'mdi-cellphone-link',
    },
  ];
});

// 数据源
const dataSources = computed(() => {
  return [
    {
      label: t('setting.dataSources.qWeather'),
      value: 'qWeather',
      disable: false,
    },
    {
      label: t('setting.dataSources.openWeather'),
      value: 'openWeather',
      disable: true,
    },
    {
      label: t('setting.dataSources.caiyun'),
      value: 'caiyun',
      disable: true,
    },
  ];
});
</script>

