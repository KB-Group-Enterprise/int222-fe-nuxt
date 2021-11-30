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
    <div class="overflow-y-scroll">
      <div
        class="card lg:card-side bordered my-2"
        v-for="game in games"
        :key="game.gameId"
        @click="$router.push(`/game/${game.gameId}`)"
      >
        <figure>
          <img src="" />
        </figure>
        <div class="card-body">
          <h2 class="card-title">{{ game.gameName }}</h2>
          <div class="flex justify-between">
            <div>rating</div>
            <div v-if="game.rating !== null">{{ game.rating }}</div>
            <div v-else>none</div>
          </div>
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
