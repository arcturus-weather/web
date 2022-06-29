<template>
  <q-page class="row items-center justify-evenly">
    <ice-map v-model="visible" @confirm="confirm"></ice-map>
    <q-page-sticky position="bottom-right" :offset="[18, 18]">
      <q-btn fab icon="search" color="primary" @click="visible = true" />
    </q-page-sticky>
  </q-page>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import iceMap from 'src/components/ice-map.vue';

export default defineComponent({
  name: 'dashBoardPage',

  components: { iceMap },

  methods: {
    confirm(e: { latitude: number; longitude: number }) {
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
