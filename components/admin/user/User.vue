<template>
  <div class="border border-gray-500 rounded-xl my-5 p-5">
    <form>
      <div>UserId: {{ user.userId }}</div>
      <div>Username: {{ user.username }}</div>
      <div>
        <hr class="my-4 text-gray-500" />
        <label for="role" class="text-xl">CURRENT ROLE | </label>
        <select id="role" v-model="selectedRole" name="role" class="select bg-gray-800">
          <option value="admin">Admin</option>
          <option value="reviewer">Reviewer</option>
        </select>
      </div>
    </form>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, watch } from '@nuxtjs/composition-api';
import { updateRole } from '~/composables/services/adminService';
import { User } from '~/types/types';

export default defineComponent({
  props: {
    user: {
      type: Object as () => User,
      default: null,
    },
  },
  setup({ user }) {
    const selectedRole = ref(user.role.roleName);
    updateRole(selectedRole, user.userId);
    return {
      selectedRole,
    };
  },
});
</script>

<style></style>
