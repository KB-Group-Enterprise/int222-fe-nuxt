<template>
  <div
    class="
      card
      cursor-pointer
      transition
      hover:scale-105 hover:shadow-xl
      ease-in-out
      duration-200
      text-white
      border border-black
      relative
    "
    @click="$emit('click', game.gameId)"
  >
    <figure class="h-full">
      <img
        class="h-full object-cover"
        :src="
          game.images[0]
            ? $axios.defaults.baseURL + '/images/games/' + game.images[0].name
            : 'https://cdn.shopify.com/s/files/1/0630/8509/products/pst0584gtav_large.jpg?v=1540231536'
        "
      />
    </figure>
    <div
      class="h-full w-full absolute transition-all opacity-0 hover:opacity-100"
    >
      <div
        class="
          card-body
          absolute
          bottom-0
          bg-gradient-to-t
          from-gray-700
          w-full
          transition-all
        "
      >
        <div class="flex justify-between pt-24 items-center">
          <h2 class="card-title shadow-md">{{ game.gameName }}</h2>
          <div
            v-if="$auth.loggedIn && $auth.user.role.roleName === 'admin'"
            class="grid grid-cols-2"
          >
            <div @click.stop="$router.push(`/admin/game/edit/${game.gameId}`)">
              Edit |
            </div>
            <div @click.stop="$emit('delete', { gameId: game.gameId })">
              Delete
            </div>
          </div>
        </div>
        <!-- <div class="card-actions">
        <button
          v-if="$auth.user.role.roleName === 'admin'"
          class="btn btn-success"
          @click.stop="$router.push(`/admin/game/edit/${game.gameId}`)"
        >
          Edit
        </button>
        <button
          v-if="$auth.user.role.roleName === 'admin'"
          class="btn btn-error"
          @click.stop="deleteGamePrompt({ gameId: game.gameId })"
        >
          Delete
        </button>
      </div> -->
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api';
import { Game } from '~/types/types';

export default defineComponent({
  props: {
    game: {
      required: true,
      type: Object as () => Game,
    },
  },
  setup() {},
});
</script>
