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
import uploadProfileImageGQL from '@/graphql/mutations/uploadProfileImage.gql';
import { useMutation } from '@vue/apollo-composable/dist';
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
    const {
      mutate: uploadProfile,
      onDone: onUploadProfileDone,
      onError: onUploadError,
    } = useMutation(uploadProfileImageGQL);
    const handleImageChange = (event: any) => {
      const file = event.target.files[0];
      if (file) {
        if (file.type === 'image/png' || file.type === 'image/jpeg') {
          if (file.size <= 5 * 5000000) {
            uploadProfile({ file });
          } else {
            ctx.$swal({
              icon: 'error',
              text: 'File Exceeded 5MB',
              timer: 1500,
              timerProgressBar: true,
            });
          }
        } else {
          ctx.$swal({
            icon: 'error',
            text: 'Wrong File Type',
            timer: 1500,
            timerProgressBar: true,
          });
        }
      }
    };
    onUploadProfileDone(() => {
      ctx.$swal({
        icon: 'success',
        text: 'อัพเดทโปรไฟล์สำเร็จ',
        timer: 1500,
        timerProgressBar: true,
      });
      ctx.$auth.fetchUser();
    });
    onUploadError(() => {
      ctx.$swal({
        icon: 'error',
        text: 'ไม่สามารถอัพโหลดไฟล์ได้',
        timer: 1500,
        timerProgressBar: true,
      });
    });
    return {
      user,
      chooseFiles,
      handleImageChange,
    };
  },
});
</script>
