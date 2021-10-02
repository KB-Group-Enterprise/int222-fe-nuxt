<template>
  <common-container>
    <div class="w-full grid grid-cols-3 gap-4 mt-20">
      <div
        v-for="game in games"
        :key="game.gameId"
        class="
          card
          shadow-xl
          image-full
          cursor-pointer
          transition
          hover:scale-105
          ease-in-out
          duration-200
        "
        @click="goGamePage(game.gameId)"
      >
        <figure>
          <img
            :src="
              game.images[0]
                ? $axios.defaults.baseURL +
                  '/images/games/' +
                  game.images[0].name
                : 'https://cdn.shopify.com/s/files/1/0630/8509/products/pst0584gtav_large.jpg?v=1540231536'
            "
          />
        </figure>
        <div class="justify-end card-body">
          <h2 class="card-title">{{ game.gameName }}</h2>
          <p>
            {{ game.description }}
          </p>
          <div v-if="$auth.user" class="card-actions">
            <button
              v-if="$auth.user.role.roleName === 'admin'"
              class="btn btn-success"
              @click.stop="$router.push(`/admin/game/edit/${game.gameId}`)"
            >
              Edit
            </button>
            <button
              v-if="$auth.user.role.roleName === 'admin'"
              class="btn btn-error"
              @click.stop="deleteGame({ gameId: game.gameId })"
            >
              Delete
            </button>
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
import {
  ref,
  defineComponent,
  onBeforeMount,
  useContext,
  useRouter,
  computed,
} from '@nuxtjs/composition-api';
import { useMutation, useQuery } from '@vue/apollo-composable/dist';
import GamesQuery from '@/graphql/queries/games.gql';
import deleteGameGQL from '@/graphql/mutations/deleteGame.gql';
import { Game } from '~/types/types';

export default defineComponent({
  setup() {
    const ctx = useContext();
    const games = ref<Game[]>();
    const { onResult, refetch } = useQuery(GamesQuery);
    const {
      mutate: deleteGame,
      onError: onDeleteError,
      onDone: onDeleteDone,
    } = useMutation(deleteGameGQL);
    onResult((result) => {
      games.value = result.data.games;
    });
    onBeforeMount(() => {
      refetch();
    });
    onDeleteError(() => {
      ctx.$swal({
        title: 'เกิดข้อผิดผลาด',
        text: 'ไม่สามารถลบเกมได้',
        icon: 'error',
      });
    });
    onDeleteDone(() => {
      ctx.$swal({
        title: 'สำเร็จ',
        text: 'ลบเกมสำเร็จ',
        timer: 1500,
        timerProgressBar: true,
        icon: 'success',
      });
      refetch();
    });
    const router = useRouter();
    const goGamePage = (gameId: number) => {
      router.push(`/game/${gameId}`);
    };
    return { games, goGamePage, deleteGame };
  },
});
</script>
