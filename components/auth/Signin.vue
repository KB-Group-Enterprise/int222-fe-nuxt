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
    <div class="font-bold text-4xl text-center pb-5">LOGIN</div>
    <form class="form-control w-full" @submit.prevent="login">
      <label class="label" for="username">Username</label>
      <input
        id="username"
        v-model="username"
        class="input input-bordered"
        type="text"
      />
      <label class="label" for="password">Password</label>
      <input
        id="password"
        v-model="password"
        class="input input-bordered"
        type="password"
      />
      <br />
      <button
        type="submit"
        class="btn btn-primary text-xs md:text-base"
        :class="[isLoading ? 'loading' : '']"
      >
        {{ isLoading ? 'Loading' : 'Login' }}
      </button>
      <p v-if="error" class="text-red-500">{{ error }}</p>
    </form>
    <nuxt-link to="/forgot_password">
      <div class="w-full flex justify-end mt-3 hover:underline cursor-pointer">
        Forgot Password
      </div>
    </nuxt-link>
  </div>
</template>

<script>
import { defineComponent, ref, useContext } from '@nuxtjs/composition-api';

export default defineComponent({
  setup() {
    const username = ref('');
    const password = ref('');
    const isLoading = ref(false);
    const { $auth, $toast } = useContext();
    const error = ref('');
    async function login() {
      error.value = '';
      const credential = {
        username: username.value,
        password: password.value,
      };
      isLoading.value = true;
      try {
        await $auth.loginWith('local', {
          data: credential,
        });
        isLoading.value = false;
        $toast.success('Login success');
      } catch (err) {
        isLoading.value = false;
        $toast.error('Username or password wrong');
      }
    }
    return {
      username,
      password,
      login,
      isLoading,
      error,
    };
  },
});
</script>

<style></style>
