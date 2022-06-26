<template>
  <router-view />
</template>

<script lang="ts">
import { defineComponent } from 'vue';

if (process.env.NODE_ENV === 'development') {
  import('utils/mock');
}

export default defineComponent({
  name: 'App',
});
</script>
