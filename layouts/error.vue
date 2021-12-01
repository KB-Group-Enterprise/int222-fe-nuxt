<template>
  <div class="w-full mt-20 text-center justify-center">
    <div class="p-5 rounded-xl border border-gray-500">
      <h1 v-if="error.statusCode === 404">Page not found</h1>
      <h1 v-else>An error occurred</h1>
      <NuxtLink to="/">Home page</NuxtLink>
    </div>
  </div>
</template>

<script>
export default {
  props: ['error'],
  layout: 'error', // you can set a custom layout for the error page
};
</script>
