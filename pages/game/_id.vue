<template>
  <div v-if="game" class="overflow-hidden relative pb-10 mb-10">
    <img
      class="w-full h-80 object-cover"
      :src="
        game.images[0]
          ? $axios.defaults.baseURL + '/images/games/' + game.images[0].name
          : 'https://cdn.shopify.com/s/files/1/0630/8509/products/pst0584gtav_large.jpg?v=1540231536'
      "
      :style="fadeStyle"
    />
    <div
      class="
        bg-black
        -mt-14
        -ml-2
        absolute
        px-4
        py-2
        pl-12
        border-2 border-white
        bg-opacity-20
        backdrop-filter backdrop-blur-lg
        rounded-lg
      "
    >
      <div class="font-bold text-7xl">{{ game.gameName }}</div>
    </div>
    <div class="absolute right-10 -mt-14 flex justify-center items-center">
      <vue-ellipse-progress
        :no-data="game.ratings === null ? true : false"
        :progress="game.rating"
        :size="80"
        line-mode="out 3"
        color="#8B5CF6"
        empty-color="rgba(255,255,255,0.5)"
        :empty-thickness="3"
        :thickness="5"
      >
        <span slot="legend-value"> </span>
      </vue-ellipse-progress>
    </div>
    <h1>Game Name: {{ game.gameName }}</h1>
    <ValidationObserver
      v-if="$auth.user"
      v-slot="{ handleSubmit }"
      class="mt-10"
    >
      <form
        class="
          mx-3
          flex flex-col
          mt-32
          mb-10
          md:flex-row md:mt-10
          justify-between
          xl:justify-around
        "
        @submit.prevent="handleSubmit(sendReview)"
      >
        <label class="label" for="ratings">Ratings</label>
        <GameRatingStar @set-score="setScore" />
        <!-- <input
          id="ratings"
          v-model="reviewData.rating"
          class="input input-bordered"
          type="number"
        /><br /> -->
        <label class="label" for="comment">Comment</label>
        <ValidationProvider v-slot="{ errors }" name="Comment" rules="required">
          <input
            id="comment"
            v-model="reviewData.comment"
            class="input input-bordered w-full xl:w-72"
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
    <div class="flex flex-col px-3 w-full items-center">
      <GameComment
        v-for="comment in comments"
        :key="comment.reviewId"
        :review="comment"
        :game-id="game.gameId"
        @delete-review="deleteReview"
      ></GameComment>
    </div>
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
    const fadeStyle = ref(
      '-webkit-mask-image: -webkit-gradient(linear,left 40%,left bottom,from(rgba(0, 0, 0, 1)),to(rgba(0, 0, 0, 0)));'
    );
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
    function setScore(rating: number) {
      reviewData.rating = rating;
    }
    return {
      game,
      reviewData,
      sendReview,
      isCreating,
      comments,
      deleteReview,
      fadeStyle,
      setScore,
    };
  },
});
</script>
