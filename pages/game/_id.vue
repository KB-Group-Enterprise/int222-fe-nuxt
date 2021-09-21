<template>
  <div v-if="!loading && game">
    <h1>Game Id: {{ game.gameId }}</h1>
    <h1>Game Name: {{ game.gameName }}</h1>
    <ValidationObserver v-slot="{ handleSubmit }">
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
    <GameComment
      v-for="comment in comments"
      :key="comment.reviewId"
      :reviewer="comment.reviewer"
      :comment="comment.comment"
      :rating="comment.rating"
    ></GameComment>
  </div>
</template>

<script lang="ts">
import {
  defineComponent,
  reactive,
  ref,
  useContext,
  useRoute,
  useRouter,
} from '@nuxtjs/composition-api';
import { useMutation, useQuery } from '@vue/apollo-composable/dist';
import GameQuery from '@/graphql/queries/game.gql';
import CreateReview from '@/graphql/mutations/createReview.gql';
import { CreateReviewInput, Game, Review } from '~/types/types';
export default defineComponent({
  setup() {
    const router = useRouter();
    const route = useRoute();
    const paramId = ref<Number>(Number(route.value.params.id));
    const game = ref<Game | null>(null);
    const { $auth } = useContext();
    const reviewData = reactive<CreateReviewInput>({
      rating: 0,
      comment: '',
      userId: $auth.user!.userId as string,
      gameId: 0,
    });
    const { onResult, loading } = useQuery(GameQuery, {
      id: paramId.value,
    });
    const { mutate: sendReview, loading: isCreating } =
      useMutation(CreateReview);
    const comments = ref<Review[]>([]);

    onResult((result) => {
      if (result.error) {
        router.push('/');
      } else {
        game.value = result.data.game;
        reviewData.gameId = game.value!.gameId;
      }
    });
    async function createReview() {
      try {
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
    return {
      paramId,
      game,
      loading,
      reviewData,
      isCreating,
      createReview,
      comments,
    };
  },
});
</script>

<style></style>
