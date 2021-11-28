<template>
  <admin-game-create></admin-game-create>
</template>
<script lang="ts">
import Vue from 'vue';
export default Vue.extend({
  middleware: ['auth', 'is-admin'],
});
</script>
