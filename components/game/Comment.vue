<template>
  <div class="card bordered mt-5 flex flex-row w-4/6 relative overflow-visible">
    <div class="w-1/6 flex items-center justify-center text-lg font-bold">
      {{ updateData.rating }}
    </div>
    <div class="card-body py-6 px-3 pr-5 w-5/6">
      <h2 class="card-title">{{ review.reviewer.username }}</h2>
      <p v-if="!isEdit">{{ updateData.comment }}</p>
      <div v-else class="flex flex-col">
        <input
          v-model="updateData.comment"
          class="input input-sm input-primary input-bordered"
          type="text"
        />
        <div class="flex mt-2 w-1/3 justify-between">
          <div class="text-green-400 cursor-pointer" @click="edit">ติ๊กถูก</div>
          <div class="text-red-500 cursor-pointer" @click="changeIsEdit">
            กากบาท
          </div>
        </div>
      </div>
    </div>
    <div
      v-if="review.reviewer.userId === $auth.user.userId"
      class="dropdown dropdown-end relative top-4 right-4 z-50"
    >
      <div tabindex="0" class="btn btn-square btn-ghost px-3">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          class="inline-block w-6 h-6 stroke-current absolute"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M5 12h.01M12 12h.01M19 12h.01M6 12a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0z"
          ></path>
        </svg>
      </div>
      <ul
        tabindex="0"
        class="shadow menu dropdown-content bg-base-200 rounded-box w-52 z-50"
      >
        <li><a @click="changeIsEdit">Edit</a></li>
        <li><a>Delete</a></li>
      </ul>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, useContext } from '@nuxtjs/composition-api';
import { updateReview } from '@/composables/services/reviewService';
import { Review, UpdateReviewInput, User } from '~/types/types';

export default defineComponent({
  props: {
    review: {
      type: Object as () => Review,
      default: null,
    },
    gameId: {
      type: Number,
      default: -1,
    },
  },
  setup({ review, gameId }) {
    const { $auth } = useContext();
    const currentUser = $auth.user as User;
    const reviewer = review.reviewer;
    const updateData = reactive<UpdateReviewInput>({
      reviewId: review.reviewId,
      rating: review.rating,
      comment: review.comment,
      userId: reviewer.userId,
      gameId,
    });
    const { changeIsEdit, edit, isEdit } = updateReview(
      reviewer,
      updateData,
      currentUser,
      review
    );
    return {
      isEdit,
      edit,
      updateData,
      changeIsEdit,
    };
  },
});
</script>

<style></style>
