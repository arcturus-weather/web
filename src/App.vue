<template>
  <router-view />
</template>

<script lang="ts">
import { defineComponent, onMounted } from 'vue';

if (process.env.NODE_ENV === 'development') {
  import('utils/mock');
}

export default defineComponent({
  name: 'App',
  setup() {
    onMounted(() => {});
  },
});
</script>
