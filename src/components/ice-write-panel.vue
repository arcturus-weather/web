<template>
  <q-dialog
    :v-model="visible"
    @update:model-value="(value) => $emit('update:model-value', value)"
    @show="content = origin"
  >
    <q-card>
      <q-card-section class="row items-center q-pb-none">
        <div class="text-h6">{{ $t('write') }}</div>
        <q-space />
        <q-btn icon="close" flat round dense v-close-popup />
      </q-card-section>

      <q-card-section>
        <q-editor v-model="content"></q-editor>
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
</script>

<style lang="scss" scoped></style>

