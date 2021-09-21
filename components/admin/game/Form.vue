<template>
  <common-container>
    <div class="w-full flex flex-col mt-20">
      <h1>Add Game</h1>
      <ValidationObserver v-slot="{ handleSubmit }">
        <form
          class="grid grid-cols-2 gap-4"
          @submit.prevent="handleSubmit(onSubmit)"
        >
          <ValidationProvider
            v-for="field in formTemplate"
            :key="field.name"
            v-slot="{ errors }"
            :name="field.name"
            :rules="field.rules"
          >
            <div class="form-control">
              <label class="label">
                <span class="label-text">{{ field.name }}</span>
              </label>
              <input
                v-model="form[field.model]"
                :type="field.type"
                :placeholder="field.placeholder"
                class="input input-bordered"
              />
              <p v-if="errors[0]" class="text-red-600">{{ errors[0] }}</p>
            </div>
          </ValidationProvider>
          <div class="form-control">
            <label class="label">
              <span class="label-text">Publisher</span>
            </label>
            <select
              v-model="form.publisher"
              class="select select-bordered w-full max-w-xs"
            >
              <option value="">Please Select One</option>
              <option
                v-for="publisher in publishers"
                :key="publisher.publusherId"
                :value="publisher"
              >
                {{ publisher.publisherName }}
              </option>
            </select>
            <p v-if="validateError.publisher" class="text-red-600">
              กรุณาเลือก Publisher
            </p>
          </div>
          <div class="form-control">
            <label class="label">
              <span class="label-text">Categories</span>
            </label>
            <p v-if="validateError.categories" class="text-red-600">
              กรุณาเลือกอย่างน้อยหนึ่ง Category
            </p>
            <label
              v-for="category in categories"
              :key="category.categoryId"
              class="
                cursor-pointer
                label
                border border-gray-500
                rounded-md
                px-1
                my-1
              "
            >
              <span class="label-text">{{ category.categoryName }}</span>
              <input
                v-model="form.categories"
                :value="category"
                type="checkbox"
                class="checkbox"
              />
            </label>
          </div>
          <div class="form-control">
            <label class="label">
              <span class="label-text">Retailers</span>
            </label>
            <p v-if="validateError.retailers" class="text-red-600">
              กรุณาเลือกอย่างน้อยหนึ่ง Retailer
            </p>
            <label
              v-for="retailer in retailers"
              :key="retailer.retailerId"
              class="
                cursor-pointer
                label
                border border-gray-500
                rounded-md
                px-1
                my-1
              "
            >
              <span class="label-text">{{ retailer.retailerName }}</span>
              <input
                v-model="form.retailers"
                :value="retailer"
                type="checkbox"
                class="checkbox"
              />
            </label>
          </div>
          <button class="btn btn-primary">SAVE</button>
        </form>
      </ValidationObserver>
    </div>
  </common-container>
</template>
<script lang="ts">
import {
  defineComponent,
  onBeforeMount,
  reactive,
  readonly,
  ref,
  useContext,
  watch,
} from '@nuxtjs/composition-api';
import { useQuery } from '@vue/apollo-composable/dist';
import GameAttributesQuery from '@/graphql/queries/attributes.gql';
import { Category, Game, Publisher, Retailer } from '~/types/types';
import { GameForm } from '~/types/type';
export default defineComponent({
  props: {
    game: {
      type: Object as () => Game,
      default: () => ref(null),
    },
  },
  setup(props, { emit }) {
    const retailers = ref<Retailer[]>([]);
    const categories = ref<Category[]>([]);
    const publishers = ref<Publisher[]>([]);
    watch(
      () => props.game,
      () => {
        if (props.game && props.game.gameId) {
          Object.assign(form, props.game);
        }
      }
    );
    const validateError = reactive({
      publisher: false,
      categories: false,
      retailers: false,
    });
    const form = reactive<GameForm>({
      gameName: '',
      description: '',
      basePrice: undefined,
      publisher: '' as any,
      categories: [],
      retailers: [],
    });
    const getAllGames = () => {
      const { onResult } = useQuery(GameAttributesQuery);
      onResult((result) => {
        retailers.value = result.data.retailers;
        categories.value = result.data.categories;
        publishers.value = result.data.publishers;
      });
    };
    const onSubmit = () => {
      if (!hasError()) {
        emit('save', form);
      }
    };
    onBeforeMount(() => {
      getAllGames();
    });
    const hasError = () => {
      validateError.categories = form.categories.length < 1;
      validateError.retailers = form.retailers.length < 1;
      validateError.publisher = !form.publisher;
      return (
        validateError.categories ||
        validateError.retailers ||
        validateError.publisher
      );
    };
    const formTemplate = readonly([
      {
        name: 'Name',
        type: 'text',
        rules: 'required',
        placeholder: 'Game Name',
        model: 'gameName',
      },
      {
        name: 'Description',
        type: 'textarea',
        rules: 'required',
        placeholder: 'a brief description of this game',
        model: 'description',
      },
      {
        name: 'Price',
        type: 'number',
        rules: 'required',
        placeholder: 'Game Price',
        model: 'basePrice',
      },
    ]);
    return {
      formTemplate,
      form,
      publishers,
      retailers,
      categories,
      onSubmit,
      validateError,
    };
  },
});
</script>
