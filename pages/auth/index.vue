<template>
  <div
    class="
      flex
      text-xs
      min-h-full
      justify-center
      md:text-lg
      lg:text-xl
      xl:text-base
    "
  >
    <div class="flex flex-col w-full items-center justify-center md:w-2/4">
      <div
        class="
          flex flex-col
          items-start
          md:items-center
          2xl:items-start
          w-11/12
        "
      >
        <AuthTabs @change-tab="changeTab" />
        <keep-alive>
          <component
            :is="componentTab"
            class="h-30rem md:h-35rem xl:px-10 2xl:px-20"
          ></component>
        </keep-alive>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from '@nuxtjs/composition-api';

export default defineComponent({
  setup() {
    const componentTab = ref('AuthSignin');
    const changeTab = (tab: string) => {
      componentTab.value = tab;
    };
    return {
      componentTab,
      changeTab,
    };
  },
});
</script>

<style>
input {
  border: 1px solid black;
}
</style>
