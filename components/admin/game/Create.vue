<template>
  <admin-game-form @save="sendGame"></admin-game-form>
</template>
<script lang="ts">
import { useMutation } from '@vue/apollo-composable/dist';
import { defineComponent } from '@vue/composition-api';
import AddGame from '@/graphql/mutations/addGame.gql';
import {
  CategoryInput,
  NewGameInput,
  PublisherInput,
  RetailerInput,
} from '~/types/types';
export default defineComponent({
  setup() {
    const { mutate: sendNewGame } = useMutation(AddGame);
    const sendGame = (form: any) => {
      const publisher: PublisherInput = {
        publisherId: form.publisher.publisherId,
        publisherName: form.publisher.publisherName,
      };
      const categories: CategoryInput[] = form.categories.map(
        (category: any) => {
          return {
            categoryId: category.categoryId,
            categoryName: category.categoryName,
          };
        }
      );
      const retailers: RetailerInput[] = form.retailers.map((retailer: any) => {
        return {
          retailerId: retailer.retailerId,
          retailerName: retailer.retailerName,
        };
      });
      const payload: NewGameInput = {
        gameName: form.name,
        basePrice: +form.price,
        description: form.description,
        publisher,
        categories,
        retailers,
      };
      console.log(payload);
      sendNewGame({ newGameData: payload }).then((res) => {
        console.log(res);
      });
    };
    return { sendGame };
  },
});
</script>
