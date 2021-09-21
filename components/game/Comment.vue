<template>
  <div class="card bordered mt-5 flex flex-row w-4/6 relative overflow-visible">
    <div class="w-1/6 flex items-center justify-center text-lg font-bold">
      {{ rating }}
    </div>
    <div class="card-body py-6 px-3 pr-5 w-5/6">
      <h2 class="card-title">{{ reviewer.username }}</h2>
      <p>{{ comment }}</p>
    </div>
    <div class="dropdown dropdown-end relative top-4 right-4 z-50">
      <div tabindex="0" class="btn btn-square btn-ghost px-3">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          class="inline-block w-6 h-6 stroke-current absolute"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M5 12h.01M12 12h.01M19 12h.01M6 12a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0z"
          ></path>
        </svg>
      </div>
      <ul
        tabindex="0"
        class="shadow menu dropdown-content bg-base-200 rounded-box w-52 z-50"
      >
        <li><a>Edit</a></li>
        <li><a>Delete</a></li>
      </ul>
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
