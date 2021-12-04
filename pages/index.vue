<template>
  <div class="w-full">
    <Landing />
  </div>
</template>
<script lang="ts">
import { defineComponent } from 'vue-demi';

export default defineComponent({
  head() {
    return {
      title: 'Game-Leview',
      meta: [
        {
          hid: 'og:description',
          property: 'og:description',
          content: 'The community of gamer คอมมูนิตี้แหล่งรวมเหล่าเกมเมอร์',
        },
        { hid: 'og:title', property: 'og:title', content: 'Game Leview' },
        {
          hid: 'og:site_name',
          property: 'og:site_name',
          content: 'game-leview.tech',
        },
        // {
        //   hid: 'og:image',
        //   property: 'og:image',
        //   content: '',
        // },
        {
          hid: 'description',
          name: 'description',
          content: 'The community of gamer คอมมูนิตี้แหล่งรวมเหล่าเกมเมอร์',
        },
      ],
    };
  },
});
</script>
