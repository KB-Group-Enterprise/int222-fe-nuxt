<template>
  <div
    class="
      relative
      overflow-hidden
      bg-gradient-to-br
      from-yellow-400
      to-purple-500
    "
  >
    <img
      class="absolute -top-10 hidden lg:flex"
      :src="require(`@/assets/images/volt-top-desk-2.png`)"
    />
    <img
      class="absolute top-0 lg:hidden flex"
      :src="require(`@/assets/images/volt-top-mobile.png`)"
    />
    <img
      class="absolute -bottom-10 -left-20 hidden lg:flex"
      :src="require(`@/assets/images/garen.png`)"
    />
    <img
      class="absolute -bottom-10 -right-10 hidden lg:flex"
      :src="require(`@/assets/images/ahri.png`)"
    />
    <img
      class="absolute bottom-0 lg:hidden flex max-w-lg"
      style="transform: scaleX(-1)"
      :src="require(`@/assets/images/killjoy.png`)"
    />
    <img
      class="absolute lg:-bottom-20 bottom-5 w-full flex scale-150 lg:scale-100"
      :src="require(`@/assets/images/volt-bottom-desk-2.png`)"
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
      <auth-signup />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from '@nuxtjs/composition-api';

export default defineComponent({
  setup() {},
});
</script>
