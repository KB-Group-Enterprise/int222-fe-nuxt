<template>
  <div
    class="
      card
      bordered
      mt-4
      mb-3
      flex flex-row
      justify-center
      w-full
      relative
      overflow-visible
    "
  >
    <div class="flex flex-col w-1/6 items-center justify-center my-4">
      <svg
        aria-hidden="true"
        focusable="false"
        data-prefix="fas"
        data-icon="caret-up"
        class="svg-inline--fa fa-caret-up fa-w-10 text-4xl cursor-pointer"
        :class="[isUpvote ? 'text-green-500' : '']"
        role="img"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 320 512"
        @click="isUpvote = true"
      >
        <path
          fill="currentColor"
          d="M288.662 352H31.338c-17.818 0-26.741-21.543-14.142-34.142l128.662-128.662c7.81-7.81 20.474-7.81 28.284 0l128.662 128.662c12.6 12.599 3.676 34.142-14.142 34.142z"
        ></path>
      </svg>
      <h4 class="text-sm text-green-500">{{ upVoteLength }}</h4>
      <div class="flex text-lg font-bold">
        {{ updateData.rating }}
      </div>
      <h4 class="text-sm text-red-500">{{ downVoteLength }}</h4>
      <svg
        aria-hidden="true"
        focusable="false"
        data-prefix="fas"
        data-icon="caret-down"
        class="svg-inline--fa fa-caret-down fa-w-10 text-4xl cursor-pointer"
        :class="[isUpvote === false ? 'text-red-500' : '']"
        role="img"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 320 512"
        @click="isUpvote = false"
      >
        <path
          fill="currentColor"
          d="M31.3 192h257.3c17.8 0 26.7 21.5 14.1 34.1L174.1 354.8c-7.8 7.8-20.5 7.8-28.3 0L17.2 226.1C4.6 213.5 13.5 192 31.3 192z"
        ></path>
      </svg>
    </div>
    <div class="card-body py-6 px-3 pr-5 w-5/6 flex flex-col justify-center">
      <h2 class="card-title">{{ review.reviewer.username }}</h2>
      <p v-if="!isEdit">{{ updateData.comment }}</p>
      <div v-else class="flex flex-col">
        <input
          v-model="updateData.comment"
          class="input input-sm input-primary input-bordered"
          type="text"
        />
        <div class="flex mt-2 w-2/3 lg:w-1/3 justify-between">
          <div class="text-green-400 cursor-pointer" @click="edit">ติ๊กถูก</div>
          <div class="text-red-500 cursor-pointer" @click="changeIsEdit">
            กากบาท
          </div>
        </div>
      </div>
    </div>
    <div
      v-if="
        $auth.user &&
        (review.reviewer.userId === $auth.user.userId ||
          $auth.user.role.roleName === 'admin')
      "
      class="dropdown dropdown-end relative top-4 right-4 z-50"
    >
      <div tabindex="0" class="btn btn-square btn-ghost px-3">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          class="inline-block w-5 h-5 lg:w-6 lg:h-6 stroke-current absolute"
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
        class="
          shadow
          menu
          dropdown-content
          bg-base-200
          rounded-box
          w-32
          lg:w-52
          z-50
        "
      >
        <li v-if="review.reviewer.userId === $auth.user.userId">
          <a @click="changeIsEdit">Edit</a>
        </li>
        <li><a @click="removeReview">Delete</a></li>
      </ul>
    </div>
  </div>
</template>

<script lang="ts">
import {
  defineComponent,
  reactive,
  ref,
  useContext,
  watch,
} from '@nuxtjs/composition-api';
import {
  deleteReview,
  updateReview,
} from '@/composables/services/reviewService';
import {
  getUpandDownVote,
  handleVote,
} from '@/composables/services/voteService';
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
  setup({ review, gameId }, { emit }) {
    const { $auth } = useContext();
    const currentUser = $auth.user as User;
    const reviewer = review.reviewer;
    const votes = review.votes;
    const ownerInVotes = votes.find(
      (vote) => vote.user.userId === $auth.user?.userId
    );
    const isUpvote = ref<boolean | null>(
      !ownerInVotes ? null : ownerInVotes.isUpvote >= 1
    );
    const { upVoteLength, downVoteLength } = getUpandDownVote(votes);
    const { createUpVote, createDownVote } = handleVote(
      review.reviewId,
      $auth.user?.userId as string,
      upVoteLength,
      downVoteLength
    );
    watch(isUpvote, (_, prev) => {
      // if prev = null, It's mean user never vote before
      if (prev === null) {
        if (isUpvote.value === true) createUpVote();
        else if (isUpvote.value === false) createDownVote();
      }
    });
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
    const { removeReview } = deleteReview(review, emit);
    return {
      isEdit,
      edit,
      updateData,
      changeIsEdit,
      removeReview,
      upVoteLength,
      downVoteLength,
      isUpvote,
    };
  },
});
</script>
