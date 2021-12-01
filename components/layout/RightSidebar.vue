<template>
  <div class="p-5 w-full h-screen">
    <LayoutPopularGame></LayoutPopularGame>
    <div class="form-control">
      <div class="relative">
        <input
          v-model="searchString"
          type="text"
          placeholder="Search"
          class="
            w-full
            pr-16
            input
            in-sm
            input-primary input-bordered
            bg-gray-800
            border-0
          "
        />
      </div>
    </div>
    <div class="overflow-y-scroll h-96">
      <div
        v-for="game in games"
        :key="game.gameId"
        class="
          border border-gray-500
          rounded-lg
          p-2
          my-2
          flex
          bg-gradient-to-r
          cursor-pointer
        "
        @click="$router.push(`/game/${game.gameId}`)"
      >
        <div>
          <h4>{{ game.gameName }}</h4>
          <small>RATING | {{ game.rating || 'Not Rated' }}</small>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import {
  defineComponent,
  ref,
  useContext,
  watch,
} from '@nuxtjs/composition-api';
import GamesSearchGQL from '@/graphql/queries/gamesSearch.gql';
import { useQuery } from '@vue/apollo-composable/dist';
import { Game } from '~/types/types';
export default defineComponent({
  setup() {
    const items = [
      { name: 'Dashboard', icon: 'home' },
      { name: 'Prakit', icon: 'home' },
      { name: 'Ruangrit', icon: 'home' },
      { name: 'Sapondanai', icon: 'home' },
    ];
    const selectedItem = ref('Dashboard');

    const selectItem = (item: any) => {
      selectedItem.value = item;
    };

    const searchString = ref('');
    const games = ref<Game[]>([]);
    const { onResult: onGameResult, refetch: gameRefetch } = useQuery(
      GamesSearchGQL,
      { gameName: searchString.value }
    );

    watch(searchString, (newVal: string, oldVal: string) => {
      if (newVal === oldVal) return;
      gameRefetch({ gameName: searchString.value });
    });

    onGameResult((result) => {
      games.value = result.data.searchGames;
    });

    return { items, selectItem, selectedItem, searchString, games };
  },
});
</script>

<style></style>
