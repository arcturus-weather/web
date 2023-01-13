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
        dropdown-icon="fa-solid fa-caret-down"
      >
        <template v-slot:prepend>
          <q-icon name="fa-solid fa-language" />
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
import { useSettingStore, useUserStore } from '@stores/stores';
import { useI18n } from 'vue-i18n';
import { optionToLanguage } from '@utils/utils';
import { storeToRefs } from 'pinia';
import iceBtnToggle from 'src/components/ice-btn-toggle.vue';

const setting = useSettingStore();
const user = useUserStore();
const { locale, t } = useI18n();

const { theme, dataSource, language } = storeToRefs(setting);
const languages = ref(Object.keys(optionToLanguage));

function setTheme(theme: Themes) {
  setting.setTheme(theme);
  setting.saveTheme(theme);
}

function setDataSource(source: DataSources) {
  setting.setDataSource(source);
  setting.saveDataSource(source);
}

function setLanguages(lang: string) {
  locale.value = optionToLanguage[lang];
  setting.setLanguage(optionToLanguage[lang]);
  setting.saveLanguage();
}

// 主题
const themes = computed(() => {
  return [
    {
      label: t('setting.theme.lightMode'),
      value: 'lightMode',
      icon: 'fa-solid fa-sun',
    },
    {
      label: t('setting.theme.darkMode'),
      value: 'darkMode',
      icon: 'fa-solid fa-moon',
    },
    {
      label: t('setting.theme.systemMode'),
      value: 'systemMode',
      icon: 'fa-brands fa-windows',
    },
    {
      label: t('setting.theme.autoMode'),
      value: 'autoMode',
      icon: 'fa-solid fa-robot',
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
      label: t('setting.dataSources.caiyun'),
      value: 'caiyun',
      disable: false,
    },
  ];
});
</script>

