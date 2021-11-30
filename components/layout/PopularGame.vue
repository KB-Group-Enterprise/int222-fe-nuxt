<template>
  <div>
    <h2>Popular Games</h2>
    <div v-if="games">
      <div
        v-for="(game, index) in games"
        :key="game.gameId"
        class="border border-gray-500 rounded-lg p-2 my-2 flex bg-gradient-to-r cursor-pointer"
        :class="placeColors[index]"
        @click="$router.push(`/game/${game.gameId}`)"
      >
        <div
          class="
            text-xl
            font-bold
            border border-0 border-r-2
            flex
            items-center
            p-1
            pr-2
            mr-2
          "
        >
          {{ index + 1 }}
        </div>
        <div>
          <h4>{{ game.gameName }}</h4>
          <small>RATING {{ game.rating }}</small>
        </div>
      </div>
    </div>
    <div v-else>
      <small class="text-sm text-center">None of The Games Reviewed</small>
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent, ref } from '@nuxtjs/composition-api';
import PopularGamesGQL from '@/graphql/queries/popularGames.gql';
import { useQuery } from '@vue/apollo-composable/dist';
import { Game } from '~/types/types';
export default defineComponent({
  setup() {
    const placeColors = ref([
      'from-yellow-400',
      'from-gray-400',
      'from-yellow-600',
    ]);
    const { onResult: onGameResult, refetch: gameRefetch } =
      useQuery(PopularGamesGQL);
    const games = ref<Game[]>([]);
    onGameResult((result) => {
      games.value = result.data.popularGames.slice(0, 3);
    });
    return { games, placeColors };
  },
});
</script>
