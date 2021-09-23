<template>
  <div v-if="game">
    <h1>Game Id: {{ game.gameId }}</h1>
    <h1>Game Name: {{ game.gameName }}</h1>
    <ValidationObserver
      v-if="$auth.user"
      v-slot="{ handleSubmit }"
      class="mt-10"
    >
      <form @submit.prevent="handleSubmit(sendReview)">
        <label class="label" for="ratings">Ratings</label>
        <ValidationProvider
          v-slot="{ errors }"
          name="Ratings"
          rules="required|min_value:0|max_value:10"
        >
          <input
            id="ratings"
            v-model="reviewData.rating"
            class="input input-bordered"
            type="number"
          /><br />
          <error-text :error="errors[0]"></error-text>
        </ValidationProvider>
        <label class="label" for="comment">Comment</label>
        <ValidationProvider v-slot="{ errors }" name="Comment" rules="required">
          <input
            id="comment"
            v-model="reviewData.comment"
            class="input input-bordered"
            type="text"
          /><br />
          <error-text :error="errors[0]"></error-text>
        </ValidationProvider>
        <br />
        <button
          type="submit"
          class="btn btn-primary text-xs md:text-base"
          :class="[isCreating ? 'loading' : '']"
        >
          {{ isCreating ? 'Loading' : 'Send Review' }}
        </button>
      </form>
    </ValidationObserver>
    <div v-else class="flex flex-col mt-20">
      <p>You need to login before comment</p>
    </div>
    <GameComment
      v-for="comment in comments"
      :key="comment.reviewId"
      :review="comment"
      :game-id="game.gameId"
      @delete-review="deleteReview"
    ></GameComment>
  </div>
</template>

<script lang="ts">
import {
  defineComponent,
  onBeforeMount,
  onMounted,
  reactive,
  ref,
  useContext,
  useRoute,
  useRouter,
} from '@nuxtjs/composition-api';
import { createReview } from '@/composables/services/reviewService';
import { fetchGame } from '@/composables/services/gameService';
import { CreateReviewInput } from '~/types/types';
export default defineComponent({
  setup() {
    const reviewData = reactive<CreateReviewInput>({
      rating: 0,
      comment: '',
      userId: '',
      gameId: 0,
    });
    const { comments, game, fetchGameWithReview } = fetchGame(reviewData);
    const { isCreating, sendReview } = createReview(reviewData, comments);
    onBeforeMount(() => {
      const route = useRoute();
      const paramId = Number(route.value.params.id);
      fetchGameWithReview(paramId);
    });

    function deleteReview(id: number) {
      const commentList = comments.value;
      commentList.splice(
        commentList.findIndex((comment) => comment.reviewId === id),
        1
      );
    }
    return {
      game,
      reviewData,
      sendReview,
      isCreating,
      comments,
      deleteReview,
    };
  },
});
</script>

<style></style>
