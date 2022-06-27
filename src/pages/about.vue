<template>
  <q-page class="row items-center justify-center">
    <div class="column items-center introduction">
      <!-- logo -->
      <q-avatar size="120px" class="q-mr-sm col">
        <img :src="logo" alt="logo" />
      </q-avatar>
      <!-- 项目名称 -->
      <div class="col text-h4 q-mb-md">
        {{ project }}
        <q-badge color="primary">v{{ version }}</q-badge>
      </div>
      <!-- 相关链接 -->
      <q-list>
        <q-item
          v-for="(item, idx) in links"
          :key="idx"
          clickable
          v-ripple
          :href="item.url"
          target="_blank"
        >
          <q-item-section avatar>
            <q-avatar color="primary" text-color="white" :icon="item.icon" />
          </q-item-section>
          <q-item-section>
            <q-item-label>{{ item.name }}</q-item-label>
            <q-item-label caption>{{ item.url }}</q-item-label>
          </q-item-section>
        </q-item>
      </q-list>
    </div>
    <div class="absolute-right contributors column items-center">
      <!-- 贡献者列表 -->
      <div class="text-h6 q-py-md">🥇 {{ $t('contributors') }}</div>
      <q-list>
        <q-item
          v-for="(item, idx) in contributors"
          :key="idx"
          :href="item.url"
          target="_blank"
          clickable
          v-ripple
        >
          <q-item-section avatar>
            <q-avatar>
              <img :src="item.avatar" />
            </q-avatar>
          </q-item-section>

          <q-item-section>{{ item.name }}</q-item-section>
        </q-item>
      </q-list>
    </div>
    <q-separator vertical />
    <div class="absolute-bottom q-mb-md text-center copyright">
      {{ copyRight }}
    </div>
  </q-page>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import { useAppInfoStore } from 'stores/stores';

export default defineComponent({
  name: 'AboutPage',

  setup() {
    const AppInfo = useAppInfoStore();

    return {
      logo: AppInfo.logo,
      project: AppInfo.project,
      version: AppInfo.version,
      drawer: ref(true),
      contributors: AppInfo.contributors(),
      links: AppInfo.links(),
      copyRight: AppInfo.copyRight(),
    };
  },
});
</script>

<style lang="scss" scoped>
$ctri-width: 250px;

.introduction {
  margin-right: $ctri-width;
}

.contributors {
  padding: 2em;
  width: $ctri-width;
  box-sizing: border-box;
}

.copyright {
  margin-right: $ctri-width;
}
</style>
