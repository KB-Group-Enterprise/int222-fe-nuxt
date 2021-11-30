import { useContext, ref, Ref } from '@nuxtjs/composition-api';
import { useMutation, useQuery } from '@vue/apollo-composable/dist';
import UpdateReviewMutation from '@/graphql/mutations/updateReview.gql';
import DeleteReviewMutation from '@/graphql/mutations/deleteReview.gql';
import CreateReviewMutation from '@/graphql/mutations/createReview.gql';
import {
  CreateReviewInput,
  Review,
  UpdateReviewInput,
  User,
} from '~/types/types';

export function updateReview(
  reviewer: User,
  updateData: UpdateReviewInput,
  currentUser: User,
  oldData: Review
) {
  const { $toast } = useContext();
  const isEdit = ref(false);
  const { mutate: updateReview, onError } = useMutation(UpdateReviewMutation);
  const edit = async () => {
    if (reviewer.userId === currentUser.userId) {
      isEdit.value = true;
      const res = await updateReview({ updateReviewInput: updateData });
      if (res) {
        $toast.success('Update comment success');
      }
      changeIsEdit();
    }
  };
  onError(() => {
    updateData.comment = oldData.comment;
    updateData.rating = oldData.rating;
    updateData.userId = oldData.reviewer.userId;
    $toast.error('Update comment failed');
  });
  const changeIsEdit = () => {
    isEdit.value = !isEdit.value;
  };
  return {
    edit,
    isEdit,
    changeIsEdit,
  };
}

export function deleteReview({ reviewId, comment }: Review, emit: any) {
  const { mutate: deleteReview, onError } = useMutation(DeleteReviewMutation);
  const { $toast } = useContext();

  const removeReview = async () => {
    const res = await deleteReview({ id: reviewId });
    if (res) {
      emit('delete-review', reviewId);
      $toast.success(`Delete comment "${comment}" success`);
    }
  };
  onError(() => {
    $toast.error('Delete failed');
  });
  return {
    removeReview,
  };
}
// export function prepareFetchReview(gameId: number) {
//   const reviews = ref<Review[]>([]);
//   const fetchReview = () => {
//     const { onResult, onError: onReviewsError } = useQuery(ReviewsInGame, {
//       gameId,
//     });
//     onResult((reviewResult) => {
//       reviews.value = reviewResult.data.gameWithReviews.reviews as Review[];
//       console.log('result in fn', reviews.value);
//     });
//     onReviewsError((error) => {
//       console.log(error);
//     });
//   };
//   return {
//     fetchReview,
//     reviews,
//   };
// }
export function createReview(
  reviewData: CreateReviewInput,
  comments: Ref<Review[]>
) {
  const { $auth, $toast } = useContext();
  const {
    mutate: send,
    loading: isCreating,
    onDone,
    onError,
  } = useMutation(CreateReviewMutation);

  const sendReview = () => {
    const user = $auth.user as User;
    reviewData.userId = user.userId;
    send({ reviewData });
    onDone((result) => {
      $toast.clear();
      const comment = result.data.createReview as Review;
      if (!comment.votes) comment.votes = [];
      const isCommentInArr = comments.value.findIndex(
        (review) => review.reviewId === comment.reviewId
      );
      if (isCommentInArr === -1) {
        comments.value.push(comment);
        reviewData.comment = '';
        reviewData.rating = 0;
        reviewData.gameId = -1;
        reviewData.userId = '';
        $toast.success('Send Review success');
      }
    });
    onError(() => {
      $toast.error('Send Review failed');
    });
  };
  return {
    isCreating,
    sendReview,
  };
}
