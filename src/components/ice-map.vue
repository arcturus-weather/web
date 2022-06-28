<template>
  <div ref="map" class="map">
    <div class="input__container row" @click.stop>
      <div class="col-6 q-ma-md">
        <q-input
          outlined
          v-model="text"
          bg-color="white"
          :label="$t('mapPlaceholder')"
        />
      </div>
      <div class="col q-my-md justify-between">
        <q-btn
          class="q-mr-xs btn"
          unelevated
          color="blue"
          :label="$t('select')"
        />
        <q-btn class="btn" unelevated color="blue" :label="$t('favorites')" />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref, nextTick } from 'vue';
import { DrawQQMap } from 'utils/location/qqMap';
import { useLocationStore } from 'src/stores/stores';

export default defineComponent({
  name: 'iceMap',

  setup() {
    const location = useLocationStore(),
      map = ref<HTMLElement | null>(null),
      drawMap = ref<DrawQQMap | null>(null),
      text = ref<string>('');

    onMounted(() => {
      nextTick(() => {
        // 在 map 挂载后新建一个绘制地图对象
        drawMap.value = new DrawQQMap(
          map.value,
          location.select.latitude,
          location.select.longitude,
          (res: qqMapcallBack) => {
            location.select.latitude = res.latitude;
            location.select.longitude = res.logitude;
            location.select.address = res.name ?? '';
          }
        );
      });
    });

    return { map, drawMap, text };
  },
});
</script>

<style lang="scss" scoped>
.map {
  border-radius: 10px;
  overflow: hidden;
  height: 100%;
}

.input__container {
  width: 80%;
  position: absolute;
  top: 0;
  z-index: 9999;
}

.btn {
  height: 100%;
}
</style>
