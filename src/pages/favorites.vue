<template>
  <q-page class="page__container">
    <div class="row page">
      <div class="col-8 q-pa-md map">
        <ice-map></ice-map>
      </div>
      <div class="col-2 q-pa-md">hello</div>
    </div>
  </q-page>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import iceMap from 'src/components/ice-map.vue';

export default defineComponent({
  name: 'AboutPage',
  components: { iceMap },

  setup() {},
});
</script>

<style lang="scss" scoped>
$page-padding: 15px;
.page__container {
  padding: $page-padding;

  .page {
    height: calc(100vh - 15px * 2);

    .map {
      height: 100%;
      box-sizing: border-box;
    }
  }
}
</style>
