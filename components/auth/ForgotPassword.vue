<template>
  <div
    class="
      w-full
      border
      lg:rounded-lg
      bg-black
      p-10
      bg-opacity-20
      backdrop-filter backdrop-blur-lg
    "
  >
    <div class="font-bold text-4xl text-center pb-5">Forgot Password</div>
    <ValidationObserver v-slot="{ handleSubmit }" class="w-full">
      <form
        class="form-control w-full"
        @submit.prevent="handleSubmit(resetPassword)"
      >
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
            <span v-if="answerError" class="text-red-500">{{
              answerError
            }}</span>
          </div>
          <label class="label" for="password">Your New Password</label>
          <ValidationProvider
            v-slot="{ errors }"
            name="Password"
            rules="required"
            vid="confirmation"
          >
            <input
              id="password"
              v-model="newPassword"
              class="input input-bordered w-full"
              type="password"
            />
            <error-text :error="errors[0]"></error-text>
          </ValidationProvider>
          <label class="label" for="confirmpassword"
            >Confirm New Password</label
          >
          <ValidationProvider
            v-slot="{ errors }"
            name="ConfirmPassword"
            rules="required|confirmed:confirmation"
          >
            <input
              id="confirmpassword"
              v-model="confirmPassword"
              class="input input-bordered w-full"
              type="password"
            />
            <error-text :error="errors[0]"></error-text>
          </ValidationProvider>
          <button
            class="btn btn-primary text-xs md:text-base mt-5 w-full"
            :class="[isResetPasswordLoading ? 'loading btn-disabled' : '']"
          >
            {{ isResetPasswordLoading ? 'Loading' : 'Reset Password' }}
          </button>
          <p v-if="error.answer" class="text-red-500">{{ error.answer }}</p>
        </div>
      </form>
    </ValidationObserver>
  </div>
</template>

<script lang="ts">
import {
  defineComponent,
  onMounted,
  reactive,
  ref,
  useContext,
} from '@nuxtjs/composition-api';
import { useMutation } from '@vue/apollo-composable/dist';
import GetRestoreQuestion from '@/graphql/mutations/getRestoreQuestion.gql';
import ForgotPassword from '@/graphql/mutations/forgotPassword.gql';
import { ForgotPasswordInput, RestoreQuestionOutput } from '~/types/types';
export default defineComponent({
  setup() {
    const username = ref<string>('');
    const questionOutput = ref<RestoreQuestionOutput | null>(null);
    const answer = ref('');
    const newPassword = ref('');
    const confirmPassword = ref('');
    const isFoundUsername = ref(false);
    const error = reactive({ username: '', answer: '' });
    const answerError = ref('');
    const { $toast } = useContext();
    const { mutate: getRestoreQuestion, loading: isQuestionLoading } =
      useMutation(GetRestoreQuestion);
    const {
      mutate: forgotPassword,
      onError: onForgotPassError,
      loading: isResetPasswordLoading,
      onDone,
    } = useMutation(ForgotPassword);

    async function resetPassword() {
      if (isFoundUsername.value) {
        error.answer = '';
        const payload: ForgotPasswordInput = {
          username: username.value,
          userId: questionOutput.value!.userId,
          restoreAnswer: answer.value,
          newPassword: newPassword.value,
        };
        forgotPassword({ newData: payload });
        onForgotPassError((err) => {
          $toast.clear();
          answer.value = '';
          answerError.value = 'Your answer is wrong';
          $toast.error(err.message);
        });
        onDone(() => {
          $toast.clear();
          isFoundUsername.value = false;
          newPassword.value = '';
          answer.value = '';
          $toast.success('Change Password success');
        });
      } else {
        error.username = '';
        const res = await getRestoreQuestion({
          username: username.value,
        }).catch(() => {
          error.username = 'Please check your username again';
          $toast.error("Your username doesn't exist");
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
      confirmPassword,
      answerError,
    };
  },
});
</script>

<style></style>
