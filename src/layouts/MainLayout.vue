<template>
  <q-layout view="lHh Lpr lFf">
    <!-- 侧边栏 -->
    <div class="sidebar">
      <div class="row items-center justify-center q-mb-lg" style="height: 64px">
        <q-avatar size="56px" class="q-mr-sm">
          <img :src="logo" alt="logo" />
        </q-avatar>
        <div class="text-weight-bold">{{ $t('project') }}</div>
      </div>

      <q-tabs v-model="tab" vertical class="text-primary">
        <q-route-tab
          v-for="(item, idx) in _getTab()"
          :key="idx"
          :name="item.name"
          :icon="item.icon"
          :label="$t(`${item.name}`)"
        />
      </q-tabs>
    </div>

    <q-page-container>
      <router-view></router-view>
    </q-page-container>
  </q-layout>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';

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
          name: 'map',
          icon: 'explore',
          url: '/map',
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

  setup() {
    const leftDrawerOpen = ref(false);

    return {
      tab: ref('dashBoard'),
      leftDrawerOpen: ref(false),
      toggleLeftDrawer() {
        leftDrawerOpen.value = !leftDrawerOpen.value;
      },
      logo: ref('https://s2.loli.net/2022/06/27/x2E1DslO8Ka3h7c.png'),
      projectName: ref('IWEATHER'),
    };
  },
});
</script>

<style lang="scss">
.sidebar {
  max-width: 150px;
  height: 100%;
}
</style>
