<template>
  <div class="w-1/2 bg-gray-500 my-5 py-3">
    <form>
      <div>UserId: {{ user.userId }}</div>
      <div>Username: {{ user.username }}</div>
      <div>
        <label for="role">Role:</label>
        <select id="role" v-model="selectedRole" name="role" class="select">
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
