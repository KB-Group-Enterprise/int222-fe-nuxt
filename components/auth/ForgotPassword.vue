<template>
  <form class="form-control w-full py-4" @submit.prevent="resetPassword">
    <label class="label" for="username">Username</label>
    <input
      id="username"
      v-model="username"
      class="input input-bordered"
      type="text"
      :disabled="isFoundUsername"
    />
    <p v-if="error.username" class="text-red-500">{{ error.username }}</p>
    <button
      v-if="!isFoundUsername"
      class="btn btn-primary text-xs md:text-base mt-5"
      :class="[isResetPasswordLoading ? 'loading disabled' : '']"
    >
      {{ isResetPasswordLoading ? 'Loading' : 'Check user' }}
    </button>
    <div v-if="isFoundUsername">
      <div v-if="questionOutput" class="w-full">
        <label class="label" for="answer">{{
          questionOutput.question.question
        }}</label>
        <input
          id="answer"
          v-model="answer"
          class="input input-bordered w-full"
          type="text"
        />
      </div>
      <label class="label" for="newpassword">Your New Password</label>
      <input
        id="newpassword"
        v-model="newPassword"
        class="input input-bordered w-full"
        type="password"
      />
      <button
        class="btn btn-primary text-xs md:text-base mt-5 w-full"
        :class="[isResetPasswordLoading ? 'loading btn-disabled' : '']"
      >
        {{ isResetPasswordLoading ? 'Loading' : 'Reset Password' }}
      </button>
      <p v-if="error.answer" class="text-red-500">{{ error.answer }}</p>
    </div>
  </form>
</template>

<script lang="ts">
import {
  defineComponent,
  onMounted,
  reactive,
  ref,
} from '@nuxtjs/composition-api';
import { useMutation } from '@vue/apollo-composable/dist';
import GetRestoreQuestion from '@/graphql/mutations/getRestoreQuestion.gql';
import ForgotPassword from '@/graphql/mutations/forgotPassword.gql';
import { ForgotPasswordInput, RestoreQuestionOutput } from '~/types/types';
export default defineComponent({
  setup() {
    const username = ref<string>('boat');
    const questionOutput = ref<RestoreQuestionOutput | null>(null);
    const answer = ref('');
    const newPassword = ref('');
    const isFoundUsername = ref(false);
    const error = reactive({ username: '', answer: '' });
    const { mutate: getRestoreQuestion, loading: isQuestionLoading } =
      useMutation(GetRestoreQuestion);
    const { mutate: forgotPassword, loading: isResetPasswordLoading } =
      useMutation(ForgotPassword);
    async function resetPassword() {
      if (isFoundUsername.value) {
        error.answer = '';
        const payload: ForgotPasswordInput = {
          username: username.value,
          userId: questionOutput.value!.userId,
          restoreAnswer: answer.value,
          newPassword: newPassword.value,
        };
        await forgotPassword({ newData: payload }).catch(() => {
          error.answer = 'Please check your information again';
        });
        username.value = '';
        newPassword.value = '';
        questionOutput.value = null;
        isFoundUsername.value = false;
      } else {
        error.username = '';
        const res = await getRestoreQuestion({
          username: username.value,
        }).catch(() => {
          error.username = 'Please check your username again';
        });
        if (res) {
          questionOutput.value = res.data
            .getRestoreQuestion as RestoreQuestionOutput;
          isFoundUsername.value = true;
        }
      }
    }
    return {
      username,
      isQuestionLoading,
      questionOutput,
      answer,
      isResetPasswordLoading,
      resetPassword,
      newPassword,
      isFoundUsername,
      error,
    };
  },
});
</script>

<style></style>
