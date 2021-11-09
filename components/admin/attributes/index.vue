<template>
  <div class="flex justify-center">
    <div class="w-full px-2 sm:w-10/12">
      <div class="tabs tabs-boxed mt-5">
        <div
          v-for="(tab, index) in tabs"
          :key="index"
          class="tab"
          :currentIndex="selectedTabIndex"
          :class="[selectedTabIndex === index ? 'tab-active' : '']"
          @click="changeTab(index)"
        >
          {{ tab }}
        </div>
      </div>
      <AdminAttributesSelector
        :list="selectedList"
        @add="handleAdd"
        @update="handleUpdate"
        @delete="handleDelete"
      ></AdminAttributesSelector>
    </div>
  </div>
</template>

<script lang="ts">
import {
  defineComponent,
  nextTick,
  reactive,
  readonly,
  ref,
  useContext,
  watch,
} from '@nuxtjs/composition-api';
import { useMutation, useQuery } from '@vue/apollo-composable/dist';
import GameAttributesQuery from '@/graphql/queries/attributes.gql';
import AddCategoryGQL from '@/graphql/mutations/addCategory.gql';
import UpdateCategoryGQL from '@/graphql/mutations/updateCategory.gql';
import DeleteCategoryGQL from '@/graphql/mutations/deleteCategory.gql';
import AddRetailerGQL from '@/graphql/mutations/addRetailer.gql';
import UpdateRetailerGQL from '@/graphql/mutations/updateRetailer.gql';
import DeleteRetailerGQL from '@/graphql/mutations/deleteRetailer.gql';
import AddPublisherGQL from '@/graphql/mutations/addPublisher.gql';
import UpdatePublisherGQL from '@/graphql/mutations/updatePublisher.gql';
import DeletePubisherGQL from '@/graphql/mutations/deletePublisher.gql';
import {
  Category,
  Game,
  NewCategoryInput,
  NewPublisherInput,
  NewRetailerInput,
  Publisher,
  Retailer,
} from '~/types/types';
export default defineComponent({
  setup() {
    const ctx = useContext();
    const tabs = readonly(['Categories', 'Retailers', 'Publisher']);
    const SelectableIndex = readonly({
      CATEGORIES: 0,
      RETAILERS: 1,
      PUBLISHER: 2,
    });
    const selectedTabIndex = ref<number>(-1);
    const changeTab = (index: number) => {
      selectedTabIndex.value = index;
    };
    const listData = reactive<{
      [key: number]: Publisher[] | Category[] | Retailer[];
    }>({});
    watch(selectedTabIndex, (newval: number) => {
      if (listData[newval]) selectedList.value = listData[newval];
    });
    const selectedList = ref<Retailer[] | Category[] | Publisher[]>([]);
    const { onResult: onAttributesResult, refetch: refetchAttribute } =
      useQuery(GameAttributesQuery);
    const mounted = ref(false);
    onAttributesResult((result) => {
      listData[SelectableIndex.PUBLISHER] = result.data.publishers;
      listData[SelectableIndex.CATEGORIES] = result.data.categories;
      listData[SelectableIndex.RETAILERS] = result.data.retailers;
      nextTick(() => {
        if (!mounted.value) {
          selectedTabIndex.value = SelectableIndex.CATEGORIES;
          mounted.value = true;
        }
        selectedList.value = listData[selectedTabIndex.value];
        mounted.value = true;
      });
    });
    const {
      mutate: sendNewCategory,
      onDone: onSendCategoryDone,
      onError: onSendCategoryError,
    } = useMutation(AddCategoryGQL);
    const {
      mutate: sendNewRetailer,
      onDone: onSendRetailerDone,
      onError: onSendRetailerError,
    } = useMutation(AddRetailerGQL);
    const {
      mutate: sendNewPublisher,
      onDone: onSendPublisherDone,
      onError: onSendPublisherError,
    } = useMutation(AddPublisherGQL);
    onSendCategoryDone(() => {
      refetchAttribute();
      ctx.$swal({
        icon: 'success',
        text: 'Added New Category',
        timer: 1500,
        timerProgressBar: true,
      });
    });
    onSendCategoryError(() => {
      ctx.$swal({
        icon: 'error',
        text: 'Cannot Add New Category',
        timer: 1500,
        timerProgressBar: true,
      });
    });
    onSendRetailerDone(() => {
      refetchAttribute();
      ctx.$swal({
        icon: 'success',
        text: 'Added New Retailer',
        timer: 1500,
        timerProgressBar: true,
      });
    });
    onSendRetailerError(() => {
      ctx.$swal({
        icon: 'error',
        text: 'Cannot Add New Retailer',
        timer: 1500,
        timerProgressBar: true,
      });
    });
    onSendPublisherDone(() => {
      refetchAttribute();
      ctx.$swal({
        icon: 'success',
        text: 'Added New Publisher',
        timer: 1500,
        timerProgressBar: true,
      });
    });
    onSendPublisherError(() => {
      ctx.$swal({
        icon: 'error',
        text: 'Cannot Add New Publisher',
        timer: 1500,
        timerProgressBar: true,
      });
    });
    const handleAdd = (newName: string) => {
      if (selectedTabIndex.value === SelectableIndex.CATEGORIES) {
        const payload: NewCategoryInput = { categoryName: newName };
        sendNewCategory({ newCategoryData: payload });
      } else if (selectedTabIndex.value === SelectableIndex.RETAILERS) {
        const payload: NewRetailerInput = { retailerName: newName };
        sendNewRetailer({ newRetailerData: payload });
      } else if (selectedTabIndex.value === SelectableIndex.PUBLISHER) {
        const payload: NewPublisherInput = { publisherName: newName };
        sendNewPublisher({ newPublisherData: payload });
      }
    };
    const {
      mutate: sendDeleteCategory,
      onDone: onDeleteCategoryDone,
      onError: onDeleteCategoryError,
    } = useMutation(DeleteCategoryGQL);
    const {
      mutate: sendDeleteRetailer,
      onDone: onDeleteRetailerDone,
      onError: onDeleteRetailerError,
    } = useMutation(DeleteRetailerGQL);
    const {
      mutate: sendDeletePublisher,
      onDone: onDeletePublisherDone,
      onError: onDeletePublisherError,
    } = useMutation(DeletePubisherGQL);
    onDeleteCategoryDone(() => {
      refetchAttribute();
      ctx.$swal({
        icon: 'success',
        text: 'Category Successfully Deleted',
        timer: 1500,
        timerProgressBar: true,
      });
    });
    onDeleteCategoryError(() => {
      ctx.$swal({
        icon: 'error',
        text: 'Cannot Delete Category',
        timer: 1500,
        timerProgressBar: true,
      });
    });
    onDeleteRetailerDone(() => {
      refetchAttribute();
      ctx.$swal({
        icon: 'success',
        text: 'Retailer Successfully Deleted',
        timer: 1500,
        timerProgressBar: true,
      });
    });
    onDeleteRetailerError(() => {
      ctx.$swal({
        icon: 'error',
        text: 'Cannot Delete Retailer',
        timer: 1500,
        timerProgressBar: true,
      });
    });
    onDeletePublisherDone(() => {
      refetchAttribute();
      ctx.$swal({
        icon: 'success',
        text: 'Publisher Successfully Deleted',
        timer: 1500,
        timerProgressBar: true,
      });
    });
    onDeletePublisherError(() => {
      ctx.$swal({
        icon: 'error',
        text: 'Cannot Delete Publisher',
        timer: 1500,
        timerProgressBar: true,
      });
    });
    const handleDelete = (id: number) => {
      if (selectedTabIndex.value === SelectableIndex.CATEGORIES)
        sendDeleteCategory({ id });
      else if (selectedTabIndex.value === SelectableIndex.RETAILERS)
        sendDeleteRetailer({ id });
      else if (selectedTabIndex.value === SelectableIndex.PUBLISHER)
        sendDeletePublisher({ id });
    };
    const {
      mutate: sendUpdateCategory,
      onDone: onUpdateCategoryDone,
      onError: onUpdateCategoryError,
    } = useMutation(UpdateCategoryGQL);
    const {
      mutate: sendUpdateRetailer,
      onDone: onUpdateRetailerDone,
      onError: onUpdateRetailerError,
    } = useMutation(UpdateRetailerGQL);
    const {
      mutate: sendUpdatePublisher,
      onDone: onUpdatePublisherDone,
      onError: onUpdatePublisherError,
    } = useMutation(UpdatePublisherGQL);
    const handleUpdate = (item: { id: number; name: string }) => {
      if (selectedTabIndex.value === SelectableIndex.CATEGORIES) {
        const payload: Category = {
          categoryId: item.id,
          categoryName: item.name,
        };
        sendUpdateCategory({ newCategoryData: payload });
      } else if (selectedTabIndex.value === SelectableIndex.RETAILERS) {
        const payload: Retailer = {
          retailerId: item.id,
          retailerName: item.name,
        };
        sendUpdateRetailer({ newRetailerData: payload });
      } else if (selectedTabIndex.value === SelectableIndex.PUBLISHER) {
        const payload: Publisher = {
          publisherId: item.id,
          publisherName: item.name,
        };
        sendUpdatePublisher({ newPublisherData: payload });
      }
    };
    onUpdateCategoryDone(() => {
      refetchAttribute();
      ctx.$swal({
        icon: 'success',
        text: 'Successfully Updated Category',
        timer: 1500,
        timerProgressBar: true,
      });
    });
    onUpdateCategoryError(() => {
      ctx.$swal({
        icon: 'error',
        text: 'Cannot Update Category',
        timer: 1500,
        timerProgressBar: true,
      });
    });
    onUpdateRetailerDone(() => {
      refetchAttribute();
      ctx.$swal({
        icon: 'success',
        text: 'Successfully Updated Retailer',
        timer: 1500,
        timerProgressBar: true,
      });
    });
    onUpdateRetailerError(() => {
      ctx.$swal({
        icon: 'error',
        text: 'Cannot Delete Retailer',
        timer: 1500,
        timerProgressBar: true,
      });
    });
    onUpdatePublisherDone(() => {
      refetchAttribute();
      ctx.$swal({
        icon: 'success',
        text: 'Successfully Updated Publisher',
        timer: 1500,
        timerProgressBar: true,
      });
    });
    onUpdatePublisherError(() => {
      ctx.$swal({
        icon: 'error',
        text: 'Cannot Update Pubisher',
        timer: 1500,
        timerProgressBar: true,
      });
    })
    return {
      selectedTabIndex,
      tabs,
      changeTab,
      selectedList,
      handleAdd,
      handleUpdate,
      handleDelete,
    };
  },
});
</script>
