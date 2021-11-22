import { ref, Ref, useContext } from '@nuxtjs/composition-api';
import { useMutation } from '@vue/apollo-composable/dist';
import UpdateVoteMutation from '@/graphql/mutations/updateVote.gql';
import CreateVoteMutation from '@/graphql/mutations/createVote.gql';
import { CreateVoteInput, UpdateVoteInput, User, Vote } from '~/types/types';

export function getUpandDownVote(votes: Vote[]) {
  const upVoteLength = ref(votes.filter((vote) => vote.isUpvote >= 1).length);
  const downVoteLength = ref(votes.filter((vote) => vote.isUpvote < 1).length);
  return {
    upVoteLength,
    downVoteLength,
  };
}

export function handleVote(
  reviewId: number,
  userId: string | null,
  upVoteLength: Ref<number>,
  downVoteLength: Ref<number>,
  votes: Vote[]
) {
  const {
    mutate: createVote,
    onDone,
    onError,
  } = useMutation(CreateVoteMutation);
  const { $toast } = useContext();
  const sendVote = (isUpVote: boolean) => {
    if (!userId) {
      $toast.error('You need to login before voting');
      return;
    }
    const payload: CreateVoteInput = {
      isUpvote: isUpVote ? 10 : -1,
      reviewId,
      userId,
    };
    createVote({ createVoteInput: payload });
    onDone((result) => {
      const vote = result.data.createVote as Vote;
      if (isUpVote) upVoteLength.value += 1;
      else downVoteLength.value -= 1;
      votes.push(vote);
    });
    onError(() => {
      $toast.error('Create vote failed');
    });
  };
  return {
    sendVote,
  };
}

export function updateVote() {
  const {
    mutate: updateVote,
    onDone,
    onError,
  } = useMutation(UpdateVoteMutation);
  const { $toast } = useContext();
  const mutateVote = (
    currentVote: Ref<boolean | null>,
    upVoteLength: Ref<number>,
    downVoteLength: Ref<number>,
    updateVoteData: UpdateVoteInput
  ) => {
    if (currentVote.value) {
      updateVoteData.isUpvote = 10;
      downVoteLength.value -= 1;
      upVoteLength.value += 1;
    } else {
      updateVoteData.isUpvote = -1;
      upVoteLength.value -= 1;
      downVoteLength.value += 1;
    }
    updateVote({ updateVoteInput: updateVoteData });
    onDone(() => {
      $toast.success('Update vote success');
    });
    onError(() => {
      $toast.error('Update vote failed');
    });
  };
  return { mutateVote };
}
