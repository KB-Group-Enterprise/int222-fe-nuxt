import { GameForm } from '~/types/type';
import {
  PublisherInput,
  CategoryInput,
  RetailerInput,
  NewGameInput,
  UpdateGameInput,
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
