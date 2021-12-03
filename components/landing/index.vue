<template>
  <common-container>
    <LandingGameFilter
      :default-filter="gameFilter"
      @update="handleFilterUpdate"
    ></LandingGameFilter>
    <div class="flex justify-centerp p-5">
      <div
        v-if="isAdmin"
        class="
          w-full
          h-24
          bg-gray-800
          text-white
          flex flex-col
          items-center
          justify-center
          shadow
          cursor-pointer
          hover:bg-gray-600
          transition-colors
          col-span-4
          rounded-lg
        "
        @click="$router.push('/admin/game/add')"
      >
        <div class="font-bold">ADD GAME</div>
      </div>
    </div>
    <div
      class="w-full grid grid-cols-2 md:grid-cols-3 2xl:grid-cols-4 gap-4 mt-2"
    >
      <LandingGameCard
        v-for="game in games"
        :key="game.gameId"
        :game="game"
        @click="goGamePage(game.gameId)"
        @delete="deleteGamePrompt"
      >
      </LandingGameCard>
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
    const limit = ref(9);
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
      console.log(result);
      const output: GamePaginationOutput = result.data.paginateGames;
      games.value = output.items;
      meta.value = output.meta;
    });
    onBeforeMount(() => {
      gameRefetch();
    });
    const deleteGamePrompt = async (deleteGameArgs: { gameId: number }) => {
      const result = await ctx.$swal({
        title: 'ลบเกม',
        text: 'คุณแน่ใจแล้วหรือไม่',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'ยืนยัน',
        cancelButtonText: 'ยกเลิก',
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
      Object.assign(gameFilter, filterOption);
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
      handlePageChange,
    };
  },
  head() {
    return {
      title: 'Game-Leview',
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: 'The community of gamer คอมมูนิตี้แหล่งรวมเหล่าเกมเมอร์',
        },
      ],
    };
  },
});
</script>
