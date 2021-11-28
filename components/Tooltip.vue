<template>
  <div
    :data-tip="description"
    class="tooltip tooltip-right ml-3 tooltip-primary"
  >
    <!-- <i class="fas fa-question-circle"></i> -->
    <i class="far fa-question-circle"></i>
  </div>
</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api';

export default defineComponent({
  props: {
    description: {
      type: String,
      default: 'Tooltip',
    },
  },
});
</script>

<style></style>
