<template>
  <div class="min-h-screen grid grid-cols-6 justify-center">
    <div class="lg:flex hidden border-r border-gray-400">
      <layout-LeftSidebar />
    </div>
    <nuxt class="lg:col-span-4 col-span-6" />
    <div class="lg:flex border-l border-gray-400 flex flex-col">
      <p>Sidebar</p>
      <button v-if="$auth.user" class="btn btn-warning" @click="$auth.logout()">
        Logout
      </button>
      <button v-else class="btn btn-secondary" @click="$router.push('/auth')">
        Login
      </button>
    </div>
  </div>
</template>
