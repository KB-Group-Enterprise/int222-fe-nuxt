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
        -mt-14
        -ml-2
        absolute
        px-4
        py-2
        pl-12
        backdrop-filter backdrop-blur-lg
        rounded-lg
      "
    >
      <div class="text-7xl">{{ game.gameName }}</div>
      <div class="text-xl">
        <font-awesome-icon icon="tag" />
        {{ game.basePrice || 'FREE' }}
        {{ game.basePrice ? ' THB' : '' }}
      </div>
    </div>
    <div class="absolute right-10 -mt-14 flex justify-center items-center">
      <vue-ellipse-progress
        v-if="game.rating !== null"
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
      <div v-else>
        <div class="bg-gray-400 opacity-75 p-2 rounded-xl">No Rating</div>
      </div>
    </div>
    <CommonContainer>
      <div class="mt-20">
        <div></div>
        <div class="grid grid-cols-3 gap-4">
          <div
            v-for="image in game.images"
            :key="image.name"
            class="h-48 bg-gray-800 flex justify-center"
          >
            <img
              :src="$axios.defaults.baseURL + '/images/games/' + image.name"
              class="object-cover h-full"
            />
          </div>
        </div>
      </div>
      <div class="mt-10 bg-gray-800 rounded-xl p-4">
        <h4 class="text-xl my-2">DESCRIPTION</h4>
        <hr class="mb-3" />
        <p class="w-3/4">{{ game.description }}</p>
      </div>
      <h4 class="text-xl my-2 mt-4 text-center">CATEGORIES</h4>
      <div class="flex justify-center">
        <div
          v-for="category in game.categories"
          :key="category.categoryId"
          class="
            rounded-lg
            mr-1
            p-1
            px-4
            py-4
            border border-gray-500
            rounded-xl
            text-center
            w-36
          "
        >
          {{ category.categoryName }}
        </div>
      </div>
      <h4 class="text-xl my-2 mt-4 text-center">AVAILABLE AT</h4>
      <div class="flex justify-center">
        <div
          v-for="retailer in game.retailers"
          :key="retailer.retailerId"
          class="
            rounded-lg
            mr-1
            p-1
            px-4
            py-4
            border border-gray-500
            rounded-xl
            text-center
            w-36
          "
        >
          {{ retailer.retailerName }}
        </div>
      </div>
      <h4 class="text-xl my-2 mt-6 text-center">PUBLISHED BY</h4>
      <div class="text-center text-6xl">{{ game.publisher.publisherName }}</div>
      <hr class="my-4" />
      <ValidationObserver
        v-if="$auth.user && !userReviewExist"
        v-slot="{ handleSubmit }"
      >
        <form
          class="flex flex-col border border-gray-500 p-5 rounded-xl"
          @submit.prevent="handleSubmit(sendReview)"
        >
          <h1>REVIEW THIS GAME</h1>
          <GameRatingStar class="-translate-x-4" @set-score="setScore" />
          <!-- <input
          id="ratings"
          v-model="reviewData.rating"
          class="input input-bordered"
          type="number"
        /><br /> -->
          <ValidationProvider
            v-slot="{ errors }"
            name="Comment"
            rules="required|max:250"
          >
            <textarea
              id="comment"
              v-model="reviewData.comment"
              placeholder="Comment"
              class="textarea h-24 w-full border border-gray-500 mt-4"
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
      <div v-else class="flex flex-col">
        <p class="text-center">
          {{
            userReviewExist
              ? 'You already reviewed this game.'
              : 'You need to login before comment.'
          }}
        </p>
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
    </CommonContainer>
  </div>
</template>

<script lang="ts">
import {
  computed,
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
import { useQuery } from '@vue/apollo-composable/dist';
import GameWithReviews from '@/graphql/queries/gameWithReviews.gql';
import { CreateReviewInput, Game, Review } from '~/types/types';
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
    const route = useRoute();
    const gameId = ref<number>(+route.value.params.id);

    const { onResult, refetch: refetchGame } = useQuery(GameWithReviews, {
      gameId: gameId.value,
    });
    const router = useRouter();
    const { $toast } = useContext();
    const game = ref<Game | null>(null);
    const comments = ref<Review[]>([]);
    onResult((result) => {
      if (result.error) {
        $toast.error('Something wrong with this game page');
        router.push('/');
      } else {
        game.value = result.data.gameWithReviews;
        reviewData.gameId = game.value!.gameId;
        comments.value = game.value!.reviews;
      }
    });

    const { isCreating, sendReview } = createReview(
      reviewData,
      comments,
      refetchGame
    );
    onBeforeMount(() => {
      const paramId = Number(route.value.params.id);
      gameId.value = paramId;
      refetchGame();
    });

    function deleteReview(id: number) {
      const commentList = comments.value;
      commentList.splice(
        commentList.findIndex((comment) => comment.reviewId === id),
        1
      );
      refetchGame();
    }
    const ctx = useContext();
    const userReviewExist = computed(() => {
      const user = ctx.$auth.user;
      if (!user) return false;
      return (
        comments.value.filter((item) => item.reviewer.userId === user.userId)
          .length > 0
      );
    });
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
      userReviewExist,
    };
  },
});
</script>
