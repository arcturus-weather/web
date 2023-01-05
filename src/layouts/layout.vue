<template>
  <PCLayout v-if="!$q.screen.xs"></PCLayout>
  <MobileLayout v-else></MobileLayout>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import MobileLayout from 'layouts/mobile.vue';
import PCLayout from 'layouts/pc.vue';

export default defineComponent({
  name: 'AppLayout',
  components: {
    MobileLayout,
    PCLayout,
  },
});
</script>
