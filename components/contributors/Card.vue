<template>
  <div class="w-full h-full cursor-pointer">
      <div class="relative" v-if="pic == 'kb'">
          <img
          class="absolute -right-14 -top-16 scale-75"
          src='@/assets/images/contributors/bolt.png'
          >
      </div>
      <div class="relative" v-if="pic == 'boat'">
          <img
          class="absolute -right-10 top-10 scale-75"
          src='@/assets/images/contributors/bolt-2.png'
          >
      </div>
      <div class="relative" v-if="pic == 'ruang'">
          <img
          class="absolute top-20 -right-10"
          src='@/assets/images/contributors/missile.png'
          >
      </div>
    <div
      class="
        border-black border-8
        w-80
        h-96
        kbshadow
        flex flex-col
        justify-between
      "
    >
      <div
        class="
          w-full
          h-full
          overflow-hidden
          relative
          flex
          justify-center
          items-center
        "
      >
        <div class="zoom">
          <img
            class="object-cover object-center"
            :src="require(`@/assets/images/contributors/${pic}.png`)"
          />
        </div>
      </div>
      <div
        class="
          bg-black
          flex
          justify-center
          text-white
          font-bold
          w-full
          py-3
          text-xl
          uppercase
          bottombox
          flex-col
        "
      >
        <div class="text-center">{{ name }}</div>
        <div class="text-sm text-center">{{ code }}</div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'nuxt-property-decorator';

@Component
export default class Card extends Vue {
  //   @Prop({ required: true }) readonly gameName!: string;
  @Prop() readonly name!: string;
  @Prop() readonly pic!: string;
  @Prop() readonly code!: string;
  //   @Prop() readonly partners!: object;
}
</script>
<style>
.kbshadow {
  box-shadow: rgba(0, 0, 0, 1) 8px 8px 0px;
  transition: box-shadow 0.5s ease-out 0s,
    transform 0.5s cubic-bezier(0.75, 0, 0.25, 1) 0s;
}
.kbshadow:hover {
  box-shadow: rgba(0, 0, 0, 0.8) 14px 14px 0px;
}
.bottombox {
  background: black;
  transform: perspective(1px) translateZ(0);
  position: relative;
  transition: color 0.3s;
}
.bottombox:before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: -1;
  background: white;
  transform: scaleX(0);
  transform-origin: 0 50%;
  transition: transform 0.3s ease-out;
}
.kbshadow:hover .bottombox {
  color: black;
}
.kbshadow:hover .bottombox:before {
  transform: scaleX(1);
}

.zoom {
    transition: transform 0.3s ease-out;
}

.kbshadow:hover .zoom {
    transform: scale(1.1);
}
</style>
