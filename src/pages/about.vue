<template>
  <q-page>
    <!-- 项目介绍 -->
    <q-scroll-area
      style="height: 100vh"
      :thumb-style="{ width: '0px' }"
      class="row justify-center items-stretch about-page__container"
    >
      <div
        class="col col-md-9 col-lg-11 row items-center justify-center introduction"
      >
        <div class="column items-center" style="width: 100%">
          <!-- logo -->
          <q-avatar size="120px" class="q-mr-sm col">
            <img :src="logo" alt="logo" />
          </q-avatar>
          <!-- 项目名称 -->
          <div class="col text-h4 q-mb-md">
            {{ $t('appInfo.project') }}
            <q-badge color="primary">v{{ version }}</q-badge>
          </div>
          <!-- 相关链接 -->
          <q-list style="max-width: 320px">
            <q-item
              v-for="(item, idx) in links"
              :key="idx"
              clickable
              v-ripple
              :href="item.url"
              target="_blank"
            >
              <q-item-section avatar>
                <q-avatar
                  color="primary"
                  text-color="white"
                  :icon="item.icon"
                />
              </q-item-section>
              <q-item-section>
                <q-item-label>{{ $t(`appInfo.${item.name}`) }}</q-item-label>
                <q-item-label caption class="ellipsis">
                  {{ item.url }}
                </q-item-label>
              </q-item-section>
            </q-item>
          </q-list>
        </div>
      </div>
      <!-- 贡献者 -->
      <div class="col col-md-3 col-lg-1 contributors column items-center">
        <!-- 贡献者列表 -->
        <div class="text-h6 q-py-md">🥇 {{ $t('appInfo.contributors') }}</div>
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
    </q-scroll-area>
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
      version: AppInfo.version,
      drawer: ref(true),
      contributors: AppInfo.contributors(),
      links: AppInfo.links(),
    };
  },
});
</script>

<style lang="scss" scoped>
.about-page__container {
  box-sizing: border-box;

  @media screen and (max-width: 600px) {
    padding-bottom: 72px; // 这是 tabbar 高度
  }
}
.introduction {
  padding: 2em;
  box-sizing: border-box;
  min-width: 400px;
}

.contributors {
  min-width: 200px;
  padding: 2em;
}
</style>
