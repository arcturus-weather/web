<template>
  <q-layout>
    <q-drawer v-model="drawer" show-if-above :width="160" :breakpoint="400">
      <!-- 侧边栏 -->
      <div class="sidebar">
        <!-- 路由 -->
        <q-tabs v-model="tab" vertical class="text-primary tabs">
          <q-route-tab
            no-caps
            v-for="(item, idx) in _getTab()"
            :key="idx"
            :name="item.name"
            :icon="item.icon"
            :label="$t(`${item.name}`)"
            :to="item.url"
          />
        </q-tabs>

        <!-- logo -->
        <div class="row items-center justify-center absolute-top logo">
          <q-avatar size="56px" class="q-mr-sm">
            <img :src="logo" alt="logo" />
          </q-avatar>
          <div class="text-weight-bold">{{ $t('appInfo.project') }}</div>
        </div>
      </div>
    </q-drawer>
    <q-page-container class="container">
      <router-view v-slot="{ Component }">
        <ice-transition enter="fadeInUp" leave="fadeOutUp">
          <keep-alive>
            <component :is="Component" />
          </keep-alive>
        </ice-transition>
      </router-view>
    </q-page-container>
  </q-layout>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import { useAppInfoStore } from 'stores/stores';
import iceTransition from 'components/ice-transition.vue';

export default defineComponent({
  name: 'MainLayout',

  methods: {
    _getTab() {
      return [
        {
          name: 'dashBoard',
          icon: 'grid_view',
          url: '/',
        },
        {
          name: 'favorites',
          icon: 'favorite',
          url: '/favorites',
        },
        {
          name: 'calendar',
          icon: 'calendar_month',
          url: '/calendar',
        },
        {
          name: 'settings',
          icon: 'settings',
          url: '/settings',
        },
        {
          name: 'about',
          icon: 'help',
          url: '/about',
        },
      ];
    },
  },

  components: { iceTransition },

  setup() {
    const AppInfo = useAppInfoStore();

    return {
      tab: ref('dashBoard'),
      drawer: ref(true),
      logo: AppInfo.logo,
    };
  },
});
</script>

<style lang="scss">
$logo-height: 64px;
$logo-margin-bottom: 20px;

.sidebar {
  height: 100%;

  .logo {
    height: $logo-height;
    margin-bottom: $logo-margin-bottom;
  }

  .tabs {
    padding-top: $logo-margin-bottom + $logo-height;
  }
}

.container {
  overflow: hidden;
}
</style>
