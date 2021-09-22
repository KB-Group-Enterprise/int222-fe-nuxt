<template>
  <div v-if="game">
    <h1>Game Id: {{ game.gameId }}</h1>
    <h1>Game Name: {{ game.gameName }}</h1>
    <ValidationObserver
      v-if="$auth.user"
      v-slot="{ handleSubmit }"
      class="mt-10"
    >
      <form @submit.prevent="handleSubmit(createReview)">
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
import { useMutation, useQuery } from '@vue/apollo-composable/dist';
import GameQuery from '@/graphql/queries/game.gql';
import ReviewQuery from '@/graphql/queries/review.gql';
import CreateReview from '@/graphql/mutations/createReview.gql';
import { CreateReviewInput, Game, Review, User } from '~/types/types';
export default defineComponent({
  setup() {
    const router = useRouter();
    const game = ref<Game | null>(null);
    const { $auth } = useContext();
    const reviewData = reactive<CreateReviewInput>({
      rating: 0,
      comment: '',
      userId: '',
      gameId: 0,
    });
    const { mutate: sendReview, loading: isCreating } =
      useMutation(CreateReview);
    const comments = ref<Review[]>([]);
    const fetchGame = (paramId: number) => {
      const { onResult } = useQuery(GameQuery, {
        gameId: paramId,
      });
      onResult((result) => {
        if (result.error) {
          router.push('/');
        } else {
          game.value = result.data.game;
          reviewData.gameId = game.value!.gameId;
        }
      });
    };
    const fetchComments = (paramId: number) => {
      const { onResult } = useQuery(ReviewQuery, { id: paramId });
      onResult((result) => {
        comments.value = result.data.reviewByGameId;
      });
    };
    onBeforeMount(() => {
      const route = useRoute();
      const paramId = Number(route.value.params.id);
      fetchGame(paramId);
      fetchComments(paramId);
    });

    async function createReview() {
      try {
        const user = $auth.user as User;
        reviewData.userId = user.userId;
        reviewData.rating = Number(reviewData.rating);
        const res = await sendReview({ reviewData });
        if (res) {
          if (res.data) {
            const comment = res.data.createReview as Review;
            comments.value.push(comment);
          }
        }
      } catch (err) {
        console.log(err);
      }
    }
    function deleteReview(id: number) {
      comments.value = comments.value.filter(
        (comment) => comment.reviewId !== id
      );
    }
    return {
      game,
      reviewData,
      isCreating,
      createReview,
      comments,
      deleteReview,
    };
  },
});
</script>

<style></style>
