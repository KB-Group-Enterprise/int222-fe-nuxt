<template>
  <form class="form-control w-full py-4" @submit.prevent="signup">
    <label class="label" for="username">Username</label>
    <input
      id="username"
      v-model="userData.username"
      class="input input-bordered"
      type="text"
    />
    <label class="label" for="password">Password</label>
    <input
      id="password"
      v-model="userData.password"
      class="input input-bordered"
      type="password"
    />
    <label class="label" for="confirmpassword">Confirm Password</label>
    <input
      id="confirmpassword"
      v-model="userData.confirmPassword"
      class="input input-bordered"
      type="password"
    />
    <label class="label" for="question">Question</label>
    <div v-if="!loading && result">
      <select
        id="question"
        v-model="userData.questionId"
        name="questions"
        class="select select-bordered w-full"
      >
        <option disabled="disabled" selected="selected">
          Choose your question for reset password
        </option>
        <option
          v-for="question in result.questions"
          :key="question.questionId"
          :value="question.questionId"
        >
          {{ question.question }}
        </option>
      </select>
    </div>
    <label class="label" for="restoreanswer">Answer</label>
    <input
      id="answer"
      v-model="userData.restoreAnswer"
      class="input input-bordered"
      type="text"
    />
    <button
      type="submit"
      class="btn btn-primary text-xs mt-5 md:text-base"
      :class="[isSignUpLoading ? 'loading' : '']"
    >
      {{ isSignUpLoading ? 'Loading' : 'Register' }}
    </button>
  </form>
</template>

<script lang="ts">
import {
  defineComponent,
  reactive,
  ref,
  useContext,
} from '@nuxtjs/composition-api';
import { useQuery } from '@vue/apollo-composable/dist';
import Question from '@/graphql/queries/question.gql';
import { RestoreQuestion } from '~/types/types';
export default defineComponent({
  setup() {
    const { result, loading, onResult } = useQuery(Question);
    const isSignUpLoading = ref(false);
    const questions = ref<RestoreQuestion[]>([]);
    const { $axios } = useContext();
    const userData = reactive({
      username: '',
      password: '',
      confirmPassword: '',
      restoreAnswer: '',
      questionId: '',
    });
    onResult(async ({ data }) => {
      questions.value = await data.questions;
    });
    const signup = async () => {
      try {
        const res = await $axios.post('/auth/register', userData);
        console.log(res);
      } catch (err) {
        console.log(err);
      }
    };
    return {
      result,
      loading,
      isSignUpLoading,
      userData,
      signup,
    };
  },
});
</script>

<style></style>
