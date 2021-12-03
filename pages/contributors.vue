<template>
  <div class="mx-auto flex flex-col justify-center -translate-y-20">
    <div class="font-bold text-9xl uppercase text-center">contributors</div>
    <div class="max-w-6xl flex md:flex-row flex-col gap-8 gap-y-12 md:gap-y-8">
      <ContributorsCard
        v-for="contributor in contributors"
        :key="contributor.code"
        :pic="contributor.pic"
        :name="contributor.name"
        :code="contributor.code"
      ></ContributorsCard>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'nuxt-property-decorator';

@Component
export default class Card extends Vue {
  contributors = [
    { name: 'Prakit Wongnuntananon', pic: 'boat', code: '62130500051' },
    { name: 'Ruangrit Kaewkrom', pic: 'ruang', code: '62130500077' },
    { name: 'Sapondanai Jamorn', pic: 'kb', code: '62130500116' },
  ];
  //   @Prop({ required: true }) readonly gameName!: string;
  //   @Prop() readonly games!: object;
  //   @Prop() readonly partners!: object;
}
</script>
