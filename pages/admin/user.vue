<template>
  <CommonContainer>
    <div class="my-10">
      <h1 class="text-3xl">ROLES MANAGER</h1>
      <AdminUser v-for="user in users" :key="user.userId" :user="user">
      </AdminUser>
    </div>
  </CommonContainer>
</template>

<script lang="ts">
import { defineComponent, onBeforeMount, ref } from '@nuxtjs/composition-api';
import { fetchUsers } from '@/composables/services/adminService';
export default defineComponent({
  middleware: ['auth', 'is-admin'],
  setup() {
    const { users, fetchAllUsers } = fetchUsers();
    onBeforeMount(() => {
      fetchAllUsers();
    });

    return {
      users,
    };
  },
});
</script>

<style></style>
