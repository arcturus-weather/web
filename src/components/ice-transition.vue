<template>
  <Transition
    mode="out-in"
    name="animate__animated animated"
    :duration="duration"
    :appear="appear"
    :enter-active-class="`animate__${enter}`"
    :leave-active-class="`animate__${leave}`"
  >
    <slot></slot>
  </Transition>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import 'animate.css';

export default defineComponent({
  name: 'iceTransition',

  props: {
    enter: {
      type: String,
      default: 'fadeIn',
    },

    leave: {
      type: String,
      default: 'fadeOut',
    },

    duration: {
      type: Number,
      default: 1000,
    },

    appear: {
      type: Boolean,
      default: true,
    },
  },
});
</script>
