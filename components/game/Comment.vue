<template>
  <div class="card bordered mt-5 flex flex-row w-4/6">
    <div class="w-1/6 flex items-center justify-center text-lg font-bold">
      {{ rating }}
    </div>
    <div class="card-body py-6 px-3 pr-5 w-5/6">
      <h2 class="card-title">{{ reviewer.username }}</h2>
      <p>{{ comment }}</p>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api';
import { User } from '@/types/types';

export default defineComponent({
  props: {
    reviewer: {
      type: Object as () => User,
      default: null,
    },
    comment: {
      type: String,
      default: '',
    },
    rating: {
      type: Number,
      default: -1,
    },
  },
});
</script>

<style></style>
