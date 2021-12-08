<template>
  <AdminGameForm mode="add" @save="sendGame"></AdminGameForm>
</template>
<script lang="ts">
import { useMutation } from '@vue/apollo-composable/dist';
import {
  defineComponent,
  useContext,
  useRouter,
} from '@nuxtjs/composition-api';
import AddGameWithImages from '@/graphql/mutations/addGameWithImages.gql';

import { formatFormToGame } from '@/composables/services/gameService';
import { GameForm } from '~/types/type';
export default defineComponent({
  setup() {
    const {
      mutate: sendNewGame,
      onDone: onSendGameDone,
      onError: onSendGameError,
    } = useMutation(AddGameWithImages);
    const ctx = useContext();
    const router = useRouter();
    const sendGame = (form: GameForm, images: any[]) => {
      const payload = formatFormToGame(form);
      sendNewGame({ newGameData: payload, files: images });
    };
    onSendGameError(() => {
      ctx.$swal({
        title: 'เกิดข้อผิดผลาด',
        text: 'ไม่สามารถเพิ่มเกมได้',
        icon: 'error',
      });
    });
    onSendGameDone(() => {
      ctx.$swal({
        title: 'สำเร็จ',
        text: 'เพิ่มเกมสำเร็จ',
        timer: 1500,
        timerProgressBar: true,
        icon: 'success',
      });
      router.push('/');
    });
    return { sendGame };
  },
});
</script>
