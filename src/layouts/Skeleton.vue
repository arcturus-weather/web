<!-- 骨架屏 -->
<template>
  <div class="row skeleton__container">
    <div class="col-9 column height__100 q-pa-md">
      <div class="row item-stretch">
        <!-- main -->
        <div class="col-8 q-pr-xs">
          <ice-main :visible="ready"></ice-main>
        </div>
        <!-- aqi panel -->
        <div class="col-4">
          <ice-air :visible="ready"></ice-air>
        </div>
        <!-- 日月升落 -->
        <div class="col-4 q-mt-md">
          <q-card flat square bordered>
            <q-card-section>
              <q-skeleton width="80px"></q-skeleton>
            </q-card-section>
            <q-card-section>
              <q-skeleton height="150px" square />
            </q-card-section>
          </q-card>
        </div>
        <!-- 风速,气压等 -->
        <div class="col-8 q-mt-md q-pl-xs gutter">
          <div v-for="i in 4" :key="i">
            <q-card flat bordered style="height: 100%">
              <q-card-section>
                <q-skeleton height="80px"></q-skeleton>
              </q-card-section>
            </q-card>
          </div>
        </div>
      </div>
    </div>
    <!-- 侧边天气数据 -->
    <div class="col-3 row">
      <q-separator vertical class="height__100" />
      <div class="column height__100 width__100 justify-between q-pa-md">
        <div class="row justify-between">
          <q-skeleton width="55px" height="80px" v-for="i in 4" :key="i" />
        </div>
        <q-skeleton class="rect__2" height="60px" v-for="i in 7" :key="i" />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import iceMain from 'components/ice-main.vue';
import iceAir from 'components/ice-air.vue';
import { useWeatherStore } from 'stores/stores';
import { storeToRefs } from 'pinia';

const weather = useWeatherStore();

export default defineComponent({
  name: 'iceSkeleton',

  components: { iceMain, iceAir },

  setup() {
    const { ready } = storeToRefs(weather);

    return { ready };
  },
});
</script>

<style lang="scss">
.skeleton__container {
  height: 100vh;

  .height__100 {
    height: 100%;
  }

  .width__100 {
    width: calc(100% - 1px);
  }

  .gutter {
    display: grid;
    grid-gap: 4px;
    grid-template-columns: repeat(2, 1fr);
  }
}
</style>
