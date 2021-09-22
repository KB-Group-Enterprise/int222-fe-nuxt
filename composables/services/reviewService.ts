import { useContext, ref } from '@nuxtjs/composition-api';
import { useMutation } from '@vue/apollo-composable/dist';
import UpdateReviewMutation from '@/graphql/mutations/updateReview.gql';
import { Review, UpdateReviewInput, User } from '~/types/types';

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
      updateData.reviewId = -1;
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
