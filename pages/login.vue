<template>
  <div
    class="
      relative
      overflow-hidden
      bg-gradient-to-tr
      from-purple-900
      to-blue-600
    "
  >
    <img
      class="absolute -top-10 hidden lg:flex"
      :src="require(`@/assets/images/volt-top-desk.png`)"
    />
    <img
      class="absolute top-0 lg:hidden flex"
      :src="require(`@/assets/images/volt-top-mobile.png`)"
    />
    <img
      class="absolute bottom-10 -left-10 hidden lg:flex"
      :src="require(`@/assets/images/omen.png`)"
    />
    <img
      class="absolute bottom-12 -right-20 hidden lg:flex max-w-screen-2xl"
      :src="require(`@/assets/images/jett.png`)"
    />
    <img
      class="absolute bottom-30 lg:hidden flex"
      style="transform: scaleX(-1)"
      :src="require(`@/assets/images/jugg.png`)"
    />
    <img
      class="absolute -bottom-10 hidden lg:flex"
      :src="require(`@/assets/images/volt-bottom-desk.png`)"
    />
    <img
      class="absolute bottom-0 lg:hidden flex"
      :src="require(`@/assets/images/volt-bottom-mobile.png`)"
    />
    <div
      class="
        absolute
        w-full
        max-w-2xl
        items-start
        max-h-screen
        justify-center
        left-1/2
        top-1/2
        transform
        -translate-x-1/2 -translate-y-1/2
      "
    >
      <auth-signin />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from '@nuxtjs/composition-api';

export default defineComponent({
  setup() {},
});
</script>
