<template>
  <Transition
    name="animate__animated animated"
    :duration="duration"
    :appear="appear"
    mode="out-in"
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
      default: 'fadeInDown',
    },

    leave: {
      type: String,
      default: 'fadeOutDown',
    },

    duration: {
      type: Number,
      default: 700,
    },

    appear: {
      type: Boolean,
      default: false,
    },
  },
});
</script>
