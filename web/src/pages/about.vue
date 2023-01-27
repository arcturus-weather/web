<template>
  <q-page>
    <q-scroll-area
      style="height: 100vh"
      :thumb-style="{ width: '0px' }"
      class="about-page-wrapper"
    >
      <div class="introduction-wrapper">
        <div class="column items-center" style="width: 100%">
          <!-- logo -->
          <q-avatar size="120px" class="col">
            <img :src="logo" alt="logo" />
          </q-avatar>

          <!-- program name -->
          <div class="col text-h4 q-mb-md">
            {{ $t('appInfo.project') }}
            <q-badge color="primary">v{{ version }}</q-badge>
          </div>

          <!-- relative link -->
          <q-list style="max-width: 320px">
            <q-item
              v-for="(item, idx) in links"
              :key="idx"
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
    </q-scroll-area>
  </q-page>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'AboutPage',
});
</script>

<script lang="ts" setup>
import { computed } from 'vue';
import { useAppInfoStore } from '@stores/stores';
import { storeToRefs } from 'pinia';

const app = useAppInfoStore();
const { logo, version } = storeToRefs(app);

const links = computed(() => {
  return app.links();
});
</script>

<style lang="scss" scoped>
.about-page-wrapper {
  box-sizing: border-box;

  @media screen and (max-width: 600px) {
    padding-bottom: 72px; // tabbar height
  }

  .introduction-wrapper {
    padding: 2em;
    box-sizing: border-box;
    min-width: 400px;
  }
}
</style>

