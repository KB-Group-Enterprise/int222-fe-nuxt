<template>
  <div>
    <h1>user page</h1>
    <AdminUser v-for="user in users" :key="user.userId" :user="user">
    </AdminUser>
  </div>
</template>

<script lang="ts">
import { defineComponent, onBeforeMount, ref } from '@nuxtjs/composition-api';
import { fetchUsers } from '@/composables/services/adminService';
export default defineComponent({
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
