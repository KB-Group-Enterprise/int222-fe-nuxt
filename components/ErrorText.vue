<template>
  <span v-if="error" class="text-red-500 pt-5">{{ error }}</span>
</template>

<script>
export default {
  props: {
    error: {
      type: String,
      default: '',
    },
  },
};
</script>

<style></style>
