<template>
  <admin-game-update></admin-game-update>
</template>
<script lang="ts">
import Vue from 'vue';
export default Vue.extend({
  middleware: ['auth', 'is-admin'],
});
</script>
