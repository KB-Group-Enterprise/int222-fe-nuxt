<template>
  <div class="p-3">
    <img
      class="w-2/3 flex justify-center mx-auto"
      :src="require(`@/assets/images/icon/Logo.png`)"
    />
    <div class="flex flex-col mt-10 space-y-4">
      <div
        v-for="item in items"
        :key="item.name"
        class="flex rounded-lg p-2 mx-2 cursor-pointer"
        :class="selectedItem === item.name ? 'bg-gray-800' : ''"
        @click="selectItem(item.name)"
      >
        <div
          class="
            btn btn-circle
            border-none
          "
          :class="
            selectedItem === item.name
              ? 'bg-gradient-to-r from-blue-500 to-indigo-600'
              : ''
          "
        >
          <font-awesome-icon :icon="item.icon" />
        </div>
        <div class="pl-4 flex items-center text-lg">{{ item.name }}</div>
      </div>
    </div>
  </div>
</template>

<script>
import { defineComponent, ref, useContext } from '@nuxtjs/composition-api';

export default defineComponent({
  setup() {
    const items = [
      { name: 'Dashboard', icon: 'home' },
      { name: 'Prakit', icon: 'home' },
      { name: 'Ruangrit', icon: 'home' },
      { name: 'Sapondanai', icon: 'home' },
    ];
    const selectedItem = ref('Dashboard');

    const selectItem = (item) => {
      selectedItem.value = item;
    };

    return { items, selectItem, selectedItem };
  },
});
</script>

<style></style>
