<template>
  <div>
    <input
      v-if="isAddMode"
      v-model="newName"
      type="text"
      placeholder="name"
      class="input bg-white text-black sm:hidden w-full px-4 mt-4"
      @keyup.enter="handleNewName"
    />
    <table class="table w-full mt-5">
      <thead>
        <tr>
          <th>ID</th>
          <th>Name</th>
          <th class="flex justify-end">
            <input
              v-if="isAddMode"
              v-model="newName"
              type="text"
              placeholder="name"
              class="
                input
                bg-white
                text-black
                absolute
                right-32
                hidden
                sm:block
              "
              @keyup.enter="handleNewName"
            />
            <button
              class="btn"
              :class="[isAddMode ? 'btn-warning' : 'btn-accent']"
              @click="isAddMode = !isAddMode"
            >
              <span v-if="!isAddMode">ADD +</span><span v-else>CANCEL</span>
            </button>
          </th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(item, index) in list" :key="item[Object.keys(item)[0]]">
          <td>{{ item[Object.keys(item)[0]] }}</td>
          <td class="sm:w-56">
            <template v-if="index === updateModeIndex">
              <input
                type="text"
                placeholder="name"
                class="input bg-white text-black w-28 sm:w-full"
                :value="item[Object.keys(item)[1]]"
                @keyup.enter="handleUpdate($event, item)" /></template
            ><template v-else>{{ item[Object.keys(item)[1]] }}</template>
          </td>
          <td class="flex justify-end">
            <div class="w-full sm:w-1/2 grid grid-cols-2 gap-2 sm:gap-8">
              <button
                v-if="index === updateModeIndex"
                class="btn btn-warning"
                @click="changeUpdateIndex"
              >
                <span class="hidden sm:inline">CANCEL</span>
                <span class="sm:hidden">X</span>
              </button>
              <button
                v-else
                class="btn btn-primary"
                @click="changeUpdateIndex(index)"
              >
                EDIT
              </button>
              <button
                class="btn btn-secondary"
                @click="$emit('delete', item[Object.keys(item)[0]])"
              >
                DEL<span class="hidden xl:block">ETE</span>
              </button>
            </div>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script lang="ts">
import {
  defineComponent,
  onMounted,
  ref,
  useContext,
  watch,
} from '@nuxtjs/composition-api';
import { Category, Publisher, Retailer } from '~/types/types';
export default defineComponent({
  props: {
    list: {
      type: Array as () => Publisher[] | Retailer[] | Category[],
      required: true,
    },
  },
  setup(props, { emit }) {
    const updateModeIndex = ref(-1);
    const isAddMode = ref(false);
    const changeUpdateIndex = (index: number) => {
      updateModeIndex.value = index;
    };
    watch(isAddMode, () => {
      if (updateModeIndex.value > -1) updateModeIndex.value = -1;
      if (isAddMode.value) newName.value = '';
    });
    watch(updateModeIndex, () => {
      if (updateModeIndex.value > -1) isAddMode.value = false;
    });
    watch(
      () => props.list,
      () => {
        updateModeIndex.value = -1;
        isAddMode.value = false;
      }
    );
    const newName = ref('');
    const handleNewName = (event: KeyboardEvent) => {
      if (newName.value) emit('add', newName.value);
      newName.value = '';
      isAddMode.value = false;
    };
    const handleUpdate = (event: any, item: any) => {
      updateModeIndex.value = -1;
      const newName: string = event.target.value;
      const oldName: string = item[Object.keys(item)[1]];
      const id: number = item[Object.keys(item)[0]];
      if (newName && newName !== oldName) {
        emit('update', { id, name: newName });
      }
    };
    return {
      updateModeIndex,
      handleNewName,
      newName,
      changeUpdateIndex,
      isAddMode,
      handleUpdate,
    };
  },
});
</script>
