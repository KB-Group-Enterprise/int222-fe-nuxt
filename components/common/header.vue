<template>
  <h1 class="text-3xl">{{ text }}</h1>
</template>

<script lang="ts">
import Vue from 'vue';
export default Vue.extend({
  props: {
    text: {
      required: true,
      type: String,
    },
  },
});
</script>
