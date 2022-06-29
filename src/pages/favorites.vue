<template>
  <q-page class="page__container">
    <ice-map v-model="visible" @confirm="confirm"></ice-map>
    <q-page-sticky position="bottom-right" :offset="[18, 18]">
      <q-btn fab icon="add" color="primary" @click="visible = true" />
    </q-page-sticky>
  </q-page>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import iceMap from 'src/components/ice-map.vue';

export default defineComponent({
  name: 'AboutPage',

  components: { iceMap },

  methods: {
    confirm(e: IMapData) {
      console.log(e);
    },
  },

  setup() {
    return {
      visible: ref(false),
    };
  },
});
</script>

<style lang="scss" scoped>
$page-padding: 15px;
.page__container {
  padding: $page-padding;
}
</style>
