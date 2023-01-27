<template>
  <q-dialog
    :v-model="visible"
    @update:model-value="(value) => $emit('update:model-value', value)"
    @show="content = origin"
  >
    <q-card style="width: 400px" class="card-border">
      <q-card-section class="row items-center q-pb-none">
        <div class="text-h6">{{ $t('write') }}</div>
        <q-space />
        <q-btn flat round dense v-close-popup icon="fa-solid fa-xmark" />
      </q-card-section>

      <q-card-section>
        <q-editor v-model="content" :definitions="definitions"></q-editor>
      </q-card-section>

      <q-card-actions align="right">
        <q-btn flat :label="$t('cacel')" color="primary" v-close-popup />
        <q-btn
          flat
          :label="$t('confirm')"
          color="primary"
          @click="confirm"
          v-close-popup
        />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'iceWritePanel',
});
</script>

<script lang="ts" setup>
import { ref } from 'vue';

const emit = defineEmits(['confirm', 'update:model-value']);

defineProps({
  visible: {
    default: false,
    type: Boolean,
  },
  origin: {
    default: '',
    type: String,
  },
});

const content = ref('');

function confirm() {
  emit('confirm', content.value);
}

const definitions = ref({
  bold: {
    icon: 'fa-solid fa-bold',
  },
  italic: {
    icon: 'fa-solid fa-italic',
  },
  underline: {
    icon: 'fa-solid fa-underline',
  },
  strike: {
    icon: 'fa-solid fa-strikethrough',
  },
  left: {
    icon: 'fa-solid fa-align-left',
  },
  right: {
    icon: 'fa-solid fa-align-right',
  },
  center: {
    icon: 'fa-solid fa-align-center',
  },
  justify: {
    icon: 'fa-solid fa-align-justify',
  },
  undo: {
    icon: 'fa-solid fa-rotate-left',
  },
  redo: {
    icon: 'fa-solid fa-arrow-rotate-right',
  },
});
</script>

