import { useQuery } from '@vue/apollo-composable/dist';
import GameWithReviews from '@/graphql/queries/gameWithReviews.gql';
import { useRouter, ref, useContext } from '@nuxtjs/composition-api';
import { GameForm } from '~/types/type';
import {
  PublisherInput,
  CategoryInput,
  RetailerInput,
  NewGameInput,
  UpdateGameInput,
  Game,
  CreateReviewInput,
  Review,
} from '~/types/types';

const formatFormToGame = (
  form: GameForm,
  gameId?: number
): NewGameInput | UpdateGameInput => {
  const publisher: PublisherInput = {
    publisherId: form.publisher.publisherId,
    publisherName: form.publisher.publisherName,
  };
  const categories: CategoryInput[] = form.categories.map(
    (category: CategoryInput) => {
      return {
        categoryId: category.categoryId,
        categoryName: category.categoryName,
      };
    }
  );
  const retailers: RetailerInput[] = form.retailers.map(
    (retailer: RetailerInput) => {
      return {
        retailerId: retailer.retailerId,
        retailerName: retailer.retailerName,
      };
    }
  );
  const payloadDetail = {
    gameName: form.gameName,
    basePrice: +form.basePrice!,
    description: form.description,
    publisher,
    categories,
    retailers,
  };
  if (gameId) {
    return {
      gameId,
      ...payloadDetail,
    };
  } else {
    return {
      ...payloadDetail,
    };
  }
};

export { formatFormToGame };

export function fetchGame(reviewData: CreateReviewInput) {
  const router = useRouter();
  const { $toast } = useContext();
  const game = ref<Game | null>(null);
  const comments = ref<Review[]>([]);
  const fetchGameWithReview = (paramId: number) => {
    const { onResult } = useQuery(GameWithReviews, {
      gameId: paramId,
    });
    onResult((result) => {
      if (result.error) {
        $toast.error('Something wrong with this game page');
        router.push('/');
      } else {
        game.value = result.data.gameWithReviews;
        reviewData.gameId = game.value!.gameId;
        comments.value = game.value!.reviews;
      }
    });
  };
  return {
    fetchGameWithReview,
    game,
    comments,
  };
}
