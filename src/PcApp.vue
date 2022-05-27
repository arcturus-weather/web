<template>
  <v-app>
    <v-main>
      <HelloWorld />
    </v-main>
  </v-app>
</template>

<script lang="ts">
import { defineComponent, getCurrentInstance } from 'vue'
import HelloWorld from 'components/HelloWorld.vue'

export default defineComponent({
  name: 'App',

  components: {
    HelloWorld,
  },
})
</script>
