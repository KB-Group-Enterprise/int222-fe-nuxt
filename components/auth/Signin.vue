<template>
  <form class="form-control w-full py-4" @submit.prevent="login">
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
</template>

<script>
import { defineComponent, ref, useContext } from '@nuxtjs/composition-api';

export default defineComponent({
  setup() {
    const username = ref('boat');
    const password = ref('12345678');
    const isLoading = ref(false);
    const { $auth } = useContext();
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
      } catch (err) {
        isLoading.value = false;
        error.value = 'Username or password wrong';
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
