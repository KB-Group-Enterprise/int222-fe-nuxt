<template>
  <common-container>
    <div class="w-full grid grid-cols-3 gap-4 mt-20">
      <div
        v-for="game in games"
        :key="game.gameId"
        class="card shadow-xl image-full"
      >
        <figure>
          <img
            src="https://cdn.shopify.com/s/files/1/0630/8509/products/pst0584gtav_large.jpg?v=1540231536"
          />
        </figure>
        <div class="justify-end card-body">
          <h2 class="card-title">{{ game.gameName }}</h2>
          <p>
            {{ game.description }}
          </p>
          <div class="card-actions">
            <button class="btn btn-primary">Review</button>
            <button
              class="btn btn-success"
              @click.stop="$router.push(`/admin/game/edit/${game.gameId}`)"
            >
              Edit
            </button>
            <button class="btn btn-error">Delete</button>
          </div>
        </div>
      </div>
      <div
        class="
          w-full
          h-full
          bg-gray-800
          text-white
          rounded-xl
          flex flex-col
          items-center
          justify-center
          shadow
          cursor-pointer
          hover:bg-gray-600
          transition-colors
        "
        @click="$router.push('/admin/game/add')"
      >
        <div class="font-bold">ADD GAME</div>
      </div>
    </div>
  </common-container>
</template>

<script lang="ts">
import { ref, defineComponent, onBeforeMount } from '@nuxtjs/composition-api';
import { useQuery } from '@vue/apollo-composable/dist';
import GamesQuery from '@/graphql/queries/games.gql';
import { Game } from '~/types/types';

export default defineComponent({
  setup() {
    const games = ref<Game[]>();
    const { onResult, refetch } = useQuery(GamesQuery);
    onResult((result) => {
      games.value = result.data.games;
    });
    onBeforeMount(() => {
      refetch();
    });
    return { games };
  },
});
</script>
