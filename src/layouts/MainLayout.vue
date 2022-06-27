<template>
  <q-layout>
    <q-drawer v-model="drawer" show-if-above :width="160" :breakpoint="400">
      <!-- 侧边栏 -->
      <div class="sidebar">
        <!-- 路由 -->
        <q-tabs v-model="tab" vertical class="text-primary tabs">
          <q-route-tab
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
          <div class="text-weight-bold">{{ project }}</div>
        </div>
      </div>
    </q-drawer>
    <q-page-container class="container">
      <router-view v-slot="{ Component }">
        <transition name="slide-up" mode="out-in">
          <component :is="Component" />
        </transition>
      </router-view>
    </q-page-container>
  </q-layout>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import { useAppInfoStore } from 'stores/stores';

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
    const AppInfo = useAppInfoStore();

    return {
      tab: ref('dashBoard'),
      drawer: ref(true),
      logo: AppInfo.logo,
      project: AppInfo.project,
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

.slide-up-enter-from {
  opacity: 0;
  transform: translateY(30px);
}

.slide-up-enter-active,
.slide-up-leave-active {
  transition: all 0.5s ease;
}

.slide-up-leave-to {
  opacity: 0;
  transform: translateY(-30px);
}

.container {
  overflow: hidden;
}
</style>
