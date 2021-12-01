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
      game-card
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
    <div class="absolute right-2 top-2">
      <vue-ellipse-progress
        v-if="game.rating"
        :no-data="game.ratings === null ? true : false"
        :progress="game.rating"
        :size="60"
        line-mode="out 3"
        color="#FFF"
        empty-color="rgba(255,255,255,0.5)"
        :empty-thickness="3"
        :thickness="5"
      >
        <span slot="legend-value"> </span>
      </vue-ellipse-progress>
      <div v-else class="bg-gray-400 opacity-75 rounded-full p-2">
        No Rating
      </div>
    </div>
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
        <div class="pt-24 items-center">
          <div class="flex flex-col justify-center">
            <h2 class="text-base">{{ game.gameName }}</h2>
            <small class="text-xs text-gray-200"
              ><span v-if="game.publisher">{{
                game.publisher.publisherName
              }}</span
              ><span v-else>No Publisher</span></small
            >
            <div
              v-if="$auth.loggedIn && $auth.user.role.roleName === 'admin'"
              class="inline-flex"
            >
              <div
                class="text-glow transition-all"
                @click.stop="$router.push(`/admin/game/edit/${game.gameId}`)"
              >
                Edit
              </div>
              <span class="mx-2"> | </span>
              <div
                class="text-glow transition-all"
                @click.stop="$emit('delete', { gameId: game.gameId })"
              >
                Delete
              </div>
            </div>
          </div>
        </div>
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

<style scoped>
.game-card {
  height: 250px;
}
@media screen and (min-width: 640px) {
  .game-card {
    height: 350px;
  }
}
@media screen and (min-width: 768px) {
  .game-card {
    height: 350px;
  }
}
@media screen and (min-width: 1024px) {
  .game-card {
    height: 400px;
  }
}

@media screen and (min-width: 1280px) {
  .game-card {
    height: 450px;
  }
}

.text-glow:hover {
  filter: drop-shadow(0 0 2px rgba(255, 255, 255, 0.5));
}
</style>
