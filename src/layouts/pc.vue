<template>
  <q-layout>
    <div class="tabbar" :class="$q.dark.isActive ? 'dark' : 'light'">
      <!-- logo -->
      <div class="logo row justify-center">
        <q-avatar size="48px">
          <img :src="logo" alt="logo" />
        </q-avatar>
      </div>

      <q-tabs v-model="tab" :vertical="true" class="tabs">
        <q-route-tab
          v-for="(item, idx) in _getTab()"
          :key="idx"
          :icon="item.icon"
          :to="item.url"
        />
      </q-tabs>
    </div>

    <!-- router -->
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
import { useAppInfoStore } from '@stores/stores';
import iceTransition from '@components/ice-transition.vue';

export default defineComponent({
  name: 'PCLayout',

  methods: {
    _getTab() {
      return [
        {
          // dashBoard
          icon: 'fa-solid fa-house',
          url: '/',
        },
        {
          // favorites
          icon: 'fa-solid fa-heart',
          url: '/favorites',
        },
        {
          // calendar
          icon: 'fa-solid fa-calendar-days',
          url: '/calendar',
        },
        {
          // settings
          icon: 'fa-solid fa-gear',
          url: '/settings',
        },
        {
          // about
          icon: 'fa-solid fa-circle-exclamation',
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
      logo: AppInfo.logo,
    };
  },
});
</script>

<style lang="scss" scoped>
$logo-height: 64px;
$logo-margin-bottom: 24px;
$width: 64px;

.tabbar {
  position: fixed;
  z-index: 999;
  left: 0;
  top: 0;
  bottom: 0;
  width: $width;
  backdrop-filter: blur(50px);

  &.dark {
    background-color: rgb(0, 0, 0, 0.5);
  }

  &.light {
    background-color: rgb(255, 255, 255, 0.5);
  }

  & .tabs {
    color: $yellow-10;
  }

  .logo {
    height: $logo-height;
    margin-bottom: $logo-margin-bottom;
  }
}

.container {
  padding-left: $width;
  overflow: hidden;
  box-sizing: border-box;
  height: 100vh;
}
</style>
