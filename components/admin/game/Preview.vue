<template lang="html">
  <div
    class="
      grid grid-cols-5
      gap-4
      w-full
      border border-gray-500
      p-1
      lg:p-3 lg:my-2
    "
  >
    <div
      v-for="preview in previews"
      :key="preview"
      class="flex flex-col items-center md:flex-wrap img-load"
    >
      <img :src="preview" class="w-full object-cover m-2" />
      <button
        class="btn border border-red-500 p-2 w-11/12 text-red-500 font-bold"
        @click="deleteImg(previews.indexOf(preview))"
      >
        DELETE
      </button>
    </div>
    <button
      class="
        w-full
        m-2
        p-3
        add-button
        bg-gray-500
        text-white
        transition-all
        hover:bg-gray-400
        text-6xl
        font-bold
      "
      @click="chooseFiles()"
    >
      +
    </button>
  </div>
</template>
<script>
export default {
  props: {
    previews: {
      type: Array,
      default() {
        return [];
      },
    },
  },
  methods: {
    deleteImg(index) {
      this.$emit('ondelete', index);
    },
    chooseFiles() {
      this.$emit('choosefile');
    },
  },
};
</script>
<style lang="css" scoped>
@keyframes fadeInleft {
  from {
    opacity: 0;
    transform: translateX(-1rem);
  }
  to {
    opacity: 1;
  }
}
@keyframes fadeOut {
  from {
    opacity: 1;
  }
  to {
    opacity: 0;
    transform: scale(0.6, 0.6);
  }
}
.img-load {
  opacity: 0;
  animation: fadeInleft 1s forwards ease-in-out;
}
.img-out {
  animation: fadeOut 1s forwards ease-in-out;
}
img {
  width: auto;
  height: 350px;
}
.add-button {
  width: 100%;
  height: 350px;
}
</style>
