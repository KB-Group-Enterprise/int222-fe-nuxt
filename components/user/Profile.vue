<template>
  <CommonContainer>
    <div class="flex flex-col items-center mt-10">
      <div class="relative">
        <img
          class="rounded-full w-56 h-56 object-cover"
          :src="'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500'"
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
    <div class="mt-5 flex justify-center">
      <div class="grid grid-cols-2 gap-4">
        <div class="p-4 border border-gray-500 rounded-xl text-center">
          <h1 class="text-4xl my-2">{{ reviews.length }}</h1>
          <h2 class="text-sm">GAME REVIEWED</h2>
        </div>
        <div class="p-4 border border-gray-500 rounded-xl text-center">
          <h1 class="text-4xl my-2">{{ totalVotes }}</h1>
          <h2 class="text-sm">TOTAL VOTES</h2>
        </div>
      </div>
    </div>
    <div class="mt-5">
      <h1>REVIEW HISTORY</h1>
      <hr class="my-4" />
      <div
        v-for="review in reviews"
        :key="review.reviewId"
        class="border border-gray-500 rounded-xl p-5 my-2"
      >
        <div class="flex justify-between items-center">
          <div class="tex-lg">{{ review.game.gameName }}</div>
          <div
            class="text-xl"
            :class="[review.rating < 5 ? 'text-yellow-400' : 'text-green-500']"
          >
            {{ review.rating }}
          </div>
        </div>
        <div class="font-thin text-sm ml-4 text-gray-300">
          {{ review.comment }}
        </div>
      </div>
    </div>
  </CommonContainer>
</template>
<script lang="ts">
import {
  computed,
  defineComponent,
  ref,
  useContext,
} from '@nuxtjs/composition-api';
import uploadProfileImageGQL from '@/graphql/mutations/uploadProfileImage.gql';
import reviewByUserIdGQL from '@/graphql/queries/reviewByUserId.gql';
import { useMutation, useQuery } from '@vue/apollo-composable/dist';
import { Review } from '~/types/types';
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

    const { onResult: onReviewResult, refetch: reviewRefetch } = useQuery(
      reviewByUserIdGQL,
      { userId: ctx.$auth.user!.userId }
    );

    const reviews = ref<Review[]>([]);
    onReviewResult((result) => {
      reviews.value = result.data.reviewByUserId;
    });

    const totalVotes = computed(() => {
      let total = 0;
      reviews.value.forEach((review) => {
        review.votes.forEach((vote) => {
          const isUpvote =
            vote.isUpvote > 0 ? vote.isUpvote / 10 : vote.isUpvote;
          total += isUpvote;
        });
      });
      return total;
    });
    return {
      totalVotes,
      reviews,
      user,
      chooseFiles,
      handleImageChange,
    };
  },
});
</script>
