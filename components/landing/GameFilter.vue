<template>
  <div class="mt-10">
    <div :key="updateKey">
      <h4>Category</h4>
      <div class="tabs tabs-boxed">
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
      <h4>Retailer</h4>
      <div class="tabs tabs-boxed">
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
      <h4>Publisher</h4>
      <div class="tabs tabs-boxed">
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
    </div>
    <h4>Sort By</h4>
    <div class="grid grid-cols-2 gap-4">
      <select
        v-model="filterOption.sortBy"
        class="select select-bordered w-full max-w-xs"
      >
        <option v-for="item in sortByList" :key="item.slug" :value="item.slug">
          {{ item.name }}
        </option>
      </select>
      <select
        v-model="filterOption.order"
        class="select select-bordered w-full max-w-xs"
      >
        <option value="ASC">Least</option>
        <option value="DESC">Most</option>
      </select>
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
      { name: 'rating', slug: 'rating' },
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
    watch(
      () => filterOption.sortBy,
      () => {
        emit('update', filterOption);
      }
    );
    watch(
      () => filterOption.order,
      () => {
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
