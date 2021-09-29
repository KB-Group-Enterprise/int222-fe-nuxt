<template>
  <div class="p-5 w-full">
    <div class="form-control">
      <div class="relative">
        <input
          type="text"
          placeholder="Search"
          class="w-full pr-16 input in-sm input-primary input-bordered bg-gray-800 border-0"
        />
        <button class="absolute top-0 right-0 rounded-l-none btn btn-primary">
          go
        </button>
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
