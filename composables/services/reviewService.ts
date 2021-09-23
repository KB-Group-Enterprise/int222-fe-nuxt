import { useContext, ref, Ref } from '@nuxtjs/composition-api';
import { useMutation } from '@vue/apollo-composable/dist';
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

export function createReview(
  reviewData: CreateReviewInput,
  comments: Ref<Review[]>
) {
  const { $auth, $toast } = useContext();
  const { mutate: send, loading: isCreating } =
    useMutation(CreateReviewMutation);
  const sendReview = async () => {
    try {
      const user = $auth.user as User;
      reviewData.userId = user.userId;
      reviewData.rating = Number(reviewData.rating);
      const res = await send({ reviewData });
      if (res) {
        if (res.data) {
          const comment = res.data.createReview as Review;
          comments.value.push(comment);
          $toast.success('Send Review success');
        }
      }
    } catch (err) {
      $toast.error('Send Review failed');
    }
  };
  return {
    isCreating,
    sendReview,
  };
}
