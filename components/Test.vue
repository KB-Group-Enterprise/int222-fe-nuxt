<template>
  <div>
    <h1>Test</h1>
    <div v-if="!loading">{{ result }}</div>
    <div v-else>loading . . .</div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, reactive, ref, watch } from '@vue/composition-api';
import { useQuery } from '@vue/apollo-composable/dist';
import GamesQuery from '@/graphql/queries/games.gql';
import { Game } from '@/types/types';
export default defineComponent({
  setup() {
    const { result, loading, onResult } = useQuery(GamesQuery);
    const games = ref<Game[]>([]);
    onResult(async ({ data }) => {
      games.value = await data.movies;
    });
    return {
      result,
      loading,
    };
  },
});
</script>
