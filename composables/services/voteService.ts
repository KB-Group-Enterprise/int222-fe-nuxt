import { ref, Ref, useContext } from '@nuxtjs/composition-api';
import { useMutation } from '@vue/apollo-composable';
import CreateVoteMutation from '@/graphql/mutations/createVote.gql';
import { CreateVoteInput, Vote } from '~/types/types';

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
  downVoteLength: Ref<number>
) {
  const { $toast } = useContext();
  const createUpVote = () => {
    if (!userId) {
      $toast.error('You need to login before voting');
      return;
    }
    upVoteLength.value += 1;
    console.log(upVoteLength.value);
    // const {
    //   mutate: createVote,
    //   onDone,
    //   onError,
    // } = useMutation(CreateVoteMutation);
    // const payload: CreateVoteInput = {
    //   isUpvote: 10,
    //   reviewId,
    //   userId,
    // };
    // createVote(payload);
    // onDone((result) => {
    //   console.log(result);
    //   upVoteLength.value += upVoteLength.value + 1;
    // });
    // onError((err) => {
    //   console.log(err);
    // });
  };
  const createDownVote = () => {
    if (!userId) {
      $toast.error('You need to login before voting');
      return;
    }
    downVoteLength.value += 1;
  };
  return {
    createUpVote,
    createDownVote,
  };
}

// export function updateVote(isVoteBefore: Ref<boolean>, upVoteLength: Ref<number>, downVoteLength: Ref<number>) {
//     if(isVoteBefore){

//     }
// }
