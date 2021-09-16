<template>
  <div
    class="tab tab-lifted md:text-base lg:text-xl xl:text-base"
    @click="$emit('click')"
  >
    {{ tabName }}
  </div>
</template>

<script>
export default {
  props: {
    tabName: {
      type: String,
      default: 'tab',
    },
  },
};
</script>

<style></style>
