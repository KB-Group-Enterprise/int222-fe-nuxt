<template>
  <div class="p-3 w-full flex flex-col justify-between h-screen">
    <div class="flex flex-col">
      <nuxt-link to="/">
        <img
          class="w-2/3 flex justify-center mx-auto"
          :src="require(`@/assets/images/icon/Logo.png`)"
        />
      </nuxt-link>
      <div class="flex flex-col mt-10 space-y-4">
        <div
          v-for="item in items"
          :key="item.name"
          class="flex rounded-lg p-2 mx-2 cursor-pointer transition-all"
          :class="[
            item.path === $route.path ? 'bg-gray-800' : '',
            $auth.loggedIn || !item.loggedIn ? '' : 'hidden',
            true || item.role === '' || item.role === currentRole
              ? ''
              : 'hidden',
          ]"
          @click="$router.push(item.path)"
        >
          <div
            class="btn btn-circle border-none transition-colors"
            :class="
              $route.path === item.path
                ? 'bg-gradient-to-r from-blue-500 to-indigo-600'
                : ''
            "
          >
            <font-awesome-icon :icon="item.icon" />
          </div>
          <div class="pl-4 flex items-center text-lg">{{ item.name }}</div>
        </div>
      </div>
    </div>
    <div class="w-full flex justify-between">
      <div v-if="!$auth.user" class="w-full mr-1">
        <nuxt-link to="/login">
          <div class="btn w-full bg-blue-700 hover:bg-blue-800 border-0">
            Login
          </div>
        </nuxt-link>
      </div>
      <div v-if="!$auth.user" class="w-full ml-1">
        <nuxt-link to="/register">
          <div class="btn w-full border-0">Register</div>
        </nuxt-link>
      </div>
      <div v-if="$auth.user" class="w-full mr-1">
        <div
          class="btn w-full bg-red-700 hover:bg-red-800 border-0"
          @click="$auth.logout()"
        >
          Logout
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { computed, defineComponent, ref, useContext } from '@nuxtjs/composition-api';

export default defineComponent({
  setup() {
    const items = [
      { name: 'Home', icon: 'home', path: '/', role: '', loggedIn: false },
      {
        name: 'Profile',
        icon: 'user-circle',
        path: '/user/profile',
        role: '',
        loggedIn: true,
      },
      {
        name: 'Attribute',
        icon: 'list',
        path: '/admin/attributes',
        role: 'admin',
        loggedIn: true,
      },
      {
        name: 'Role Manager',
        icon: 'user-tag',
        path: '/admin/user',
        role: 'admin',
        loggedIn: true,
      },
      {
        name: 'Contributors',
        icon: 'users',
        path: '/contributors',
        role: '',
        loggedIn: false,
      },
    ];
    const ctx = useContext();
    const currentRole = computed(() => {
      return ctx.$auth.user.role.roleName && '';
    });
    return { items, currentRole };
  },
});
</script>

<style></style>
