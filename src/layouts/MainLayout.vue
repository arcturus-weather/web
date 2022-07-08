<template>
  <q-layout>
    <!-- 导航栏 -->
    <div class="tabbar" :class="$q.dark.isActive ? 'dark' : 'light'">
      <q-tabs
        v-model="tab"
        :vertical="$q.screen.xs ? false : true"
        class="text-primary tabs"
      >
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
      <div
        v-if="!$q.screen.xs"
        class="row items-center justify-center absolute-top logo"
      >
        <q-avatar size="56px" class="q-mr-sm">
          <img :src="logo" alt="logo" />
        </q-avatar>
        <div class="text-weight-bold">{{ $t('appInfo.project') }}</div>
      </div>
    </div>
    <!-- 路由 -->
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
      logo: AppInfo.logo,
    };
  },
});
</script>

<style lang="scss">
$logo-height: 64px;
$logo-margin-bottom: 20px;
// tabbar 宽高
$width: 150px;
$height: 72px;

.tabbar {
  position: fixed;
  z-index: 99;
  backdrop-filter: blur(20px);

  &.dark {
    background-color: rgba(0, 0, 0, 0.5);
  }

  &.light {
    background-color: rgba(255, 255, 255, 0.5);
  }

  @media screen and (min-width: 600px) {
    // 屏幕宽度大于 500px, 右边导航栏
    left: 0;
    top: 0;
    bottom: 0;
    width: $width;

    .tabs {
      padding-top: $logo-margin-bottom + $logo-height;
    }
  }

  @media screen and (max-width: 600px) {
    // 屏幕宽度小于 500px, 底部导航栏
    left: 0;
    right: 0;
    bottom: 0;
    height: $height;
  }

  .logo {
    height: $logo-height;
    margin-bottom: $logo-margin-bottom;
  }
}

.container {
  overflow: hidden;
  box-sizing: border-box;
  height: 100vh;

  @media screen and (min-width: 600px) {
    padding-left: $width;
  }

  @media screen and (max-width: 600px) {
    padding-bottom: $height;
  }
}
</style>
