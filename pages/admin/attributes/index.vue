<template>
  <admin-attributes></admin-attributes>
</template>

<script lang="ts">
import Vue from 'vue';
export default Vue.extend({
  middleware: ['auth', 'is-admin'],
});
</script>
