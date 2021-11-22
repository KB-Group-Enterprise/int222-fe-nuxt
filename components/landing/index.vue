<template>
  <common-container>
    <LandingGameFilter
      :default-filter="gameFilter"
      @update="handleFilterUpdate"
    ></LandingGameFilter>
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
              @click.stop="deleteGamePrompt({ gameId: game.gameId })"
            >
              Delete
            </button>
          </div>
        </div>
      </div>
      <div
        v-if="isAdmin"
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
    <div v-if="meta" class="flex justify-center my-10">
      <CommonPagination
        :total-page="meta.totalPages"
        :current-page="page"
        @onChangePage="handlePageChange"
      ></CommonPagination>
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
  reactive,
} from '@nuxtjs/composition-api';
import { useMutation, useQuery } from '@vue/apollo-composable/dist';
import GamesPaginateGQL from '@/graphql/queries/gamesPaginate.gql';
import deleteGameGQL from '@/graphql/mutations/deleteGame.gql';
import { Game, GamePaginaionMeta, GamePaginationOutput } from '~/types/types';
import { FilterOption } from '~/types/type';

export default defineComponent({
  setup() {
    const ctx = useContext();
    const page = ref(1);
    const limit = ref(10);
    const games = ref<Game[]>();
    const gameFilter = reactive<FilterOption>({
      sortBy: '',
      order: 'ASC',
      filterBy: [],
      filter: [],
    });
    const meta = ref<GamePaginaionMeta>();
    const { onResult: onGameResult, refetch: gameRefetch } = useQuery(
      GamesPaginateGQL,
      { limit: limit.value, page: page.value, ...gameFilter }
    );
    const {
      mutate: deleteGame,
      onError: onDeleteError,
      onDone: onDeleteDone,
    } = useMutation(deleteGameGQL);
    onGameResult((result) => {
      const output: GamePaginationOutput = result.data.paginateGames;
      games.value = output.items;
      meta.value = output.meta;
    });
    onBeforeMount(() => {
      gameRefetch();
    });
    const deleteGamePrompt = async (deleteGameArgs: { gameId: number }) => {
      const result = await ctx.$swal({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!',
      });
      if (result.isConfirmed) deleteGame(deleteGameArgs);
    };
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
      gameRefetch();
    });
    const router = useRouter();
    const goGamePage = (gameId: number) => {
      router.push(`/game/${gameId}`);
    };
    const isAdmin = computed(() => {
      const user: any = ctx.$auth.user;
      if (user) {
        return user.role.roleName === 'admin';
      } else {
        return false;
      }
    });
    const handleFilterUpdate = (filterOption: FilterOption) => {
      Object.assign(filterOption, gameFilter);
      gameRefetch({ limit: limit.value, page: page.value, ...gameFilter });
    };
    const handlePageChange = (newPage: number) => {
      page.value = newPage;
      gameRefetch({ limit: limit.value, page: page.value, ...gameFilter });
    };
    return {
      games,
      goGamePage,
      deleteGamePrompt,
      isAdmin,
      handleFilterUpdate,
      gameFilter,
      meta,
      page,
      handlePageChange
    };
  },
});
</script>
