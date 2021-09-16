<template>
  <div class="tabs flex justify-evenly w-full">
    <AuthTab
      v-for="(tab, index) in tabs"
      :key="index"
      :class="[currentTabIndex === index ? 'tab-active' : '']"
      :tab-name="tab"
      @click="changeCurrentTab(index)"
    />
    <div
      v-if="isIphone5Width"
      class="flex-1 cursor-default tab tab-lifted"
    ></div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from '@nuxtjs/composition-api';

export default defineComponent({
  setup(props, { emit }) {
    const tabs = ref(['Sign in', 'Sign up', 'Forgot Password']);
    const currentTabIndex = ref(0);
    const windowInnerWidth = ref(window.innerWidth);
    const isIphone5Width = ref(windowInnerWidth.value > 320);
    const tabsComponent = ['AuthSignin', 'AuthSignup', 'AuthForgotPassword'];
    const changeCurrentTab = (index: number) => {
      currentTabIndex.value = index;
      emit('change-tab', tabsComponent[index]);
    };
    return {
      tabs,
      currentTabIndex,
      changeCurrentTab,
      windowInnerWidth,
      isIphone5Width,
    };
  },
});
</script>
