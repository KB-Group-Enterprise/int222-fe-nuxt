<template>
  <AdminGameForm :game="game" @save="sendGameUpdate"></AdminGameForm>
</template>

<script lang="ts">
import { ref, useContext, useRouter } from '@nuxtjs/composition-api';
import { useMutation, useQuery } from '@vue/apollo-composable/dist';
import getGameGQL from '@/graphql/queries/game.gql';
import updateGameGQL from '@/graphql/mutations/updateGame.gql';
import { defineComponent, onMounted } from '@vue/composition-api';
import { GameForm } from '~/types/type';
import { formatFormToGame } from '~/composables/services/gameService';
import { Game } from '~/types/types';

export default defineComponent({
  setup() {
    const ctx = useContext();
    const router = useRouter();
    const id: number = +ctx.route.value.params.id;
    const { onResult: onGameResult, refetch: refecthGame } = useQuery(
      getGameGQL,
      {
        gameId: +id,
      }
    );
    const game = ref<Game>();
    onGameResult((result) => {
      game.value = result.data.game;
    });

    const {
      mutate: updateGame,
      onDone: onUpdateGameDone,
      onError: onUpdateGameError,
    } = useMutation(updateGameGQL);
    const sendGameUpdate = (form: GameForm) => {
      const payload = formatFormToGame(form, id);
      updateGame({ updateGameData: payload });
    };
    onUpdateGameError(() => {
      ctx.$swal({
        title: 'เกิดข้อผิดผลาด',
        text: 'ไม่สามารถแก้ไขเกมได้',
        icon: 'error',
      });
    });
    onUpdateGameDone(() => {
      ctx.$swal({
        title: 'สำเร็จ',
        text: 'แก้ไขเกมสำเร็จ',
        timer: 1500,
        timerProgressBar: true,
        icon: 'success',
      });
      router.push('/');
    });
    onMounted(() => {
      refecthGame();
    });
    return { game, sendGameUpdate };
  },
});
</script>
