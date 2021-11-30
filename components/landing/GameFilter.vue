<template>
  <div class="mt-10">
    <div :key="updateKey">
      <div class="grid grid-cols-8 gap-2">
        <div class="col-span-8 md:col-span-2 lg:col-span-1 flex items-center">
          <h4>CATEGORY</h4>
        </div>
        <div class="tabs tabs-boxed col-span-8 md:col-span-6 lg:col-span-7">
          <div
            v-for="category in categories"
            :key="category.categoryId"
            class="tab"
            :class="[
              filterOption.filterBy.includes(FILTER_SLUG.CATEGORY) &&
              filterOption.filter[
                filterOption.filterBy.indexOf(FILTER_SLUG.CATEGORY)
              ] === category.categoryId.toString()
                ? 'tab-active'
                : '',
            ]"
            @click.prevent="
              handleFilter(FILTER_SLUG.CATEGORY, category.categoryId)
            "
          >
            {{ category.categoryName }}
          </div>
        </div>
        <div class="col-span-8 md:col-span-2 lg:col-span-1 flex items-center">
          <h4>RETAILER</h4>
        </div>
        <div class="tabs tabs-boxed col-span-8 md:col-span-6 lg:col-span-7">
          <div
            v-for="retailer in retailers"
            :key="retailer.retailerId"
            class="tab"
            :class="[
              filterOption.filterBy.includes(FILTER_SLUG.RETAILER) &&
              filterOption.filter[
                filterOption.filterBy.indexOf(FILTER_SLUG.RETAILER)
              ] === retailer.retailerId.toString()
                ? 'tab-active'
                : '',
            ]"
            @click.prevent="
              handleFilter(FILTER_SLUG.RETAILER, retailer.retailerId)
            "
          >
            {{ retailer.retailerName }}
          </div>
        </div>
        <div class="ccol-span-8 md:col-span-2 lg:col-span-1 flex items-center">
          <h4>PUBLISHER</h4>
        </div>
        <div class="tabs tabs-boxed col-span-8 md:col-span-6 lg:col-span-7">
          <div
            v-for="publisher in publishers"
            :key="publisher.publisherId"
            class="tab"
            :class="[
              filterOption.filterBy.includes(FILTER_SLUG.PUBLISHER) &&
              filterOption.filter[
                filterOption.filterBy.indexOf(FILTER_SLUG.PUBLISHER)
              ] === publisher.publisherId.toString()
                ? 'tab-active'
                : '',
            ]"
            @click.prevent="
              handleFilter(FILTER_SLUG.PUBLISHER, publisher.publisherId)
            "
          >
            {{ publisher.publisherName }}
          </div>
        </div>
        <div class="col-span-8 md:col-span-1 flex items-center">
          <h4>SORT BY</h4>
        </div>
        <div class="grid grid-cols-2 gap-1 col-span-8 md:col-span-4">
          <select
            v-model="filterOption.sortBy"
            class="select select-bordered w-full max-w-xs"
          >
            <option
              v-for="item in sortByList"
              :key="item.slug"
              :value="item.slug"
            >
              {{ item.name }}
            </option>
          </select>
          <select
            v-model="filterOption.order"
            class="select select-bordered w-full max-w-xs"
            :disabled="filterOption.sortBy === ''"
          >
            <option value="ASC">Least</option>
            <option value="DESC">Most</option>
          </select>
        </div>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { useQuery } from '@vue/apollo-composable/dist';
import GameAttributesQuery from '@/graphql/queries/attributes.gql';
import {
  defineComponent,
  onBeforeMount,
  onMounted,
  reactive,
  ref,
  watch,
} from '@nuxtjs/composition-api';
import { Category, Publisher, Retailer } from '~/types/types';
import { FilterOption } from '~/types/type';

export default defineComponent({
  props: {
    defaultFilter: {
      required: true,
      type: Object as () => FilterOption,
    },
  },
  setup(props, { emit }) {
    const updateKey = ref(0);
    const filterOption = reactive<FilterOption>({
      sortBy: '',
      order: 'ASC',
      filterBy: [],
      filter: [],
    });
    const FILTER_SLUG = {
      PUBLISHER: 'publisher',
      CATEGORY: 'category',
      RETAILER: 'retailer',
    };
    const sortByList = [
      { name: 'None', slug: '' },
      { name: 'Price', slug: 'base_price' },
      { name: 'Name', slug: 'game_name' },
      { name: 'Release Date', slug: 'release_date' },
      { name: 'Rating', slug: 'rating' },
    ];
    const { onResult: onAttributesResult, refetch: refetchAttribute } =
      useQuery(GameAttributesQuery);
    const retailers = ref<Retailer[]>([]);
    const categories = ref<Category[]>([]);
    const publishers = ref<Publisher[]>([]);
    onAttributesResult((result) => {
      retailers.value = result.data.retailers;
      categories.value = result.data.categories;
      publishers.value = result.data.publishers;
    });
    onMounted(() => {
      refetchAttribute();
    });
    onBeforeMount(() => {
      Object.assign(props.defaultFilter, filterOption);
    });
    // const test = ref('ASC');
    // watch(test, () => {
    //   console.log(test);
    // });
    watch(
      () => filterOption.sortBy,
      (newVal: string) => {
        emit('update', filterOption);
      }
    );
    watch(
      () => filterOption.order,
      (newVal: string) => {
        emit('update', filterOption);
      }
    );
    const handleFilter = (slug: string, id: number) => {
      if (filterOption.filterBy.includes(slug)) {
        const index = filterOption.filterBy.indexOf(slug);
        if (filterOption.filter[index] === id.toString()) {
          filterOption.filterBy.splice(index, 1);
          filterOption.filter.splice(index, 1);
          emit('update', filterOption);
        } else {
          filterOption.filter[index] = id.toString();
          emit('update', filterOption);
        }
      } else if (filterOption.filterBy.length === filterOption.filter.length) {
        filterOption.filterBy.push(slug);
        filterOption.filter.push(id.toString());
        emit('update', filterOption);
      } else {
        filterOption.filterBy = [];
        filterOption.filter = [];
        emit('update', filterOption);
      }
      updateKey.value++;
    };
    return {
      retailers,
      categories,
      publishers,
      sortByList,
      filterOption,
      FILTER_SLUG,
      handleFilter,
      updateKey,
    };
  },
});
</script>
