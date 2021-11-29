<template>
  <CommonContainer>
    <div class="flex flex-col items-center mt-10">
      <div class="relative">
        <img
          class="rounded-full w-56 h-56 object-cover"
          src="https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500"
        />
        <div
          class="
            bg-gray-500
            rounded-full
            w-56
            h-56
            absolute
            top-0
            transition-all
            cursor-pointer
            opacity-0
            hover:opacity-75
            flex
            justify-center
            items-center
            text-2xl
          "
          @click="chooseFiles"
        >
          Upload Picture
        </div>
      </div>
      <input
        id="fileUpload"
        class="m-3 w-full lg:w-4/12"
        type="file"
        hidden
        @change="handleImageChange"
      />
      <div class="text-center mt-4">
        <h1 class="text-3xl">{{ user.username }}</h1>
        <small class="text-xl text-gray-400">{{ user.role.roleName }}</small>
      </div>
    </div>
  </CommonContainer>
</template>
<script lang="ts">
import { computed, defineComponent, useContext } from '@nuxtjs/composition-api';

export default defineComponent({
  setup() {
    const ctx = useContext();
    const user = computed(() => {
      return ctx.$auth.user;
    });
    const chooseFiles = () => {
      const uploadButton = document.getElementById('fileUpload');
      if (uploadButton) uploadButton.click();
    };
    const handleImageChange = (event: any) => {
        console.log(event);
    }
    return {
      user,
      chooseFiles,
      handleImageChange,
    };
  },
});
</script>
