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
    <div class="font-bold text-4xl text-center pb-5">REGISTER</div>
    <ValidationObserver v-slot="{ handleSubmit }" class="w-full">
      <form class="form-control w-full" @submit.prevent="handleSubmit(signup)">
        <label class="label" for="username"
          ><span
            >Username
            <Tooltip
              :description="'Username จะต้องมีความยาวเกิน 4 ตัวอักษรขึ้นไป'"
          /></span>
        </label>
        <ValidationProvider
          v-slot="{ errors }"
          name="Username"
          rules="required|min:4"
        >
          <input
            id="username"
            v-model="userData.username"
            class="input input-bordered w-full"
            type="text"
          />
          <error-text :error="errorDetail"></error-text>
          <error-text :error="errors[0]"></error-text>
        </ValidationProvider>
        <label class="label" for="password">
          <span
            >Password
            <Tooltip
              :description="'Password จะต้องมีความยาวเกิน 8 ตัวอักษรขึ้นไป'"
          /></span>
        </label>
        <ValidationProvider
          v-slot="{ errors }"
          name="Password"
          rules="required"
          vid="confirmation"
        >
          <input
            id="password"
            v-model="userData.password"
            class="input input-bordered w-full"
            type="password"
          />
          <error-text :error="errors[0]"></error-text>
        </ValidationProvider>
        <label class="label" for="confirmpassword">
          <span
            >Confirm Password
            <Tooltip :description="'Confirm Password จะต้องเหมือนกับ Password'"
          /></span>
        </label>
        <ValidationProvider
          v-slot="{ errors }"
          name="ConfirmPassword"
          rules="required|confirmed:confirmation"
        >
          <input
            id="confirmpassword"
            v-model="userData.confirmPassword"
            class="input input-bordered w-full"
            type="password"
          />
          <error-text :error="errors[0]"></error-text>
        </ValidationProvider>
        <label class="label" for="question">
          <span
            >Question
            <Tooltip :description="'เลือก Question สำหรับใช้ในการกู้รหัสผ่าน'"
          /></span>
        </label>
        <div v-if="!loading && result">
          <ValidationProvider
            v-slot="{ errors }"
            name="Question"
            rules="required"
          >
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
            <error-text :error="errors[0]"></error-text>
          </ValidationProvider>
        </div>
        <label class="label" for="restoreanswer">
          <span
            >Answer
            <Tooltip :description="'ตอบ Answer สำหรับใช้ในการกู้รหัสผ่าน'"
          /></span>
        </label>
        <ValidationProvider v-slot="{ errors }" name="Answer" rules="required">
          <input
            id="answer"
            v-model="userData.restoreAnswer"
            class="input input-bordered w-full"
            type="text"
          />
          <error-text :error="errors[0]"></error-text>
        </ValidationProvider>
        <button
          type="submit"
          class="btn btn-primary text-xs mt-5 md:text-base"
          :class="[isSignUpLoading ? 'loading' : '']"
        >
          {{ isSignUpLoading ? 'Loading' : 'Register' }}
        </button>
      </form>
    </ValidationObserver>
  </div>
</template>

<script lang="ts">
import {
  defineComponent,
  reactive,
  ref,
  useContext,
  useRouter,
  watch,
} from '@nuxtjs/composition-api';
import { useQuery } from '@vue/apollo-composable/dist';
import Question from '@/graphql/queries/question.gql';
import { RestoreQuestion } from '~/types/types';
export default defineComponent({
  setup() {
    const { result, loading, onResult } = useQuery(Question);
    const isSignUpLoading = ref(false);
    const questions = ref<RestoreQuestion[]>([]);
    const errorDetail = ref('');
    const router = useRouter();
    const { $axios, $toast } = useContext();
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
    watch(userData, () => {
      errorDetail.value = '';
    });
    const signup = async () => {
      try {
        await $axios.post('/auth/register', userData);
        $toast.success('Register success');
        router.push('/login');
      } catch (err) {
        if (err) errorDetail.value = 'username already exist';
        $toast.error('Sorry something wrong. Please try again');
      }
    };
    return {
      result,
      loading,
      isSignUpLoading,
      userData,
      signup,
      errorDetail,
    };
  },
});
</script>

<style></style>
