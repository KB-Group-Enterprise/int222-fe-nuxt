<template>
  <div class="p-3 w-full flex flex-col justify-between h-screen">
    <div class="flex flex-col">
      <nuxt-link to="/">
        <img
          class="w-4/12 lg:w-2/3 flex justify-center mx-auto mb-5"
          :src="require(`@/assets/images/icon/Logo.png`)"
        />
      </nuxt-link>
      <div
        v-if="$auth.loggedIn"
        class="w-full flex flex-col items-center cursor-pointer select-none"
        @click="$router.push('/user/profile')"
      >
        <img
          v-if="$auth.user.profileImage"
          class="w-32 h-32 bg-gray-500 rounded-full object-cover"
          :src="userImageUrl"
        />
        <h1 class="text-xl mt-2">{{ $auth.user.username }}</h1>
        <small class="text-base text-gray-300">{{
          $auth.user.role.roleName.toUpperCase()
        }}</small>
      </div>
      <div class="flex flex-col mt-5 space-y-4">
        <div
          v-for="item in items"
          :key="item.name"
          class="flex rounded-lg p-2 mx-2 cursor-pointer transition-all"
          :class="[
            item.path === $route.path ? 'bg-gray-800' : '',
            $auth.loggedIn || !item.loggedIn ? '' : 'hidden',
            item.role === '' || item.role === currentRole ? '' : 'hidden',
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
import {
  computed,
  defineComponent,
  ref,
  useContext,
} from '@nuxtjs/composition-api';

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
      if (ctx.$auth.user) return ctx.$auth.user.role.roleName;
      else return '';
    });

    const userImageUrl = computed(() => {
      if (!ctx.$auth.loggedIn || !ctx.$auth.user.profileImage)
        return 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500';
      else return 'http://' + ctx.$auth.user.profileImage;
    });
    return { items, currentRole, userImageUrl };
  },
});
</script>

<style></style>
