<template>
  <div>{{ data.secret }}</div>
</template>

<script>
import {
  defineComponent,
  onMounted,
  ref,
  useContext,
  useFetch,
} from '@nuxtjs/composition-api';

// export default {
//   middleware: ['auth'],
//   data() {
//     return {
//       data: '',
//     };
//   },
//   async mounted() {
//     this.data = await this.$axios.$get('/auth/secret');
//     console.log(this.data);
//   },
// };
export default defineComponent({
  setup() {
    const data = ref('');
    const { $axios } = useContext();
    onMounted(async () => {
      data.value = await $axios.$get('/auth/secret');
    });
    return {
      data,
    };
  },
});
</script>

<style></style>
