<template>
  <div>
    <LayoutNavbar></LayoutNavbar>
    <LayoutMobileSidebar></LayoutMobileSidebar>
    <div class="min-h-screen grid grid-cols-6 justify-center bg-gray-700">
      <div class="lg:flex hidden border-r border-gray-400">
        <layout-LeftSidebar class="sticky top-0" />
      </div>
      <nuxt class="lg:col-span-4 col-span-6" />
      <div class="lg:flex hidden border-l border-gray-400">
        <layout-RightSidebar class="sticky top-0" />
      </div>
      <!-- <div class="lg:flex border-l border-gray-400 flex flex-col">
      <p>Sidebar</p>
      <button v-if="$auth.user" class="btn btn-warning" @click="$auth.logout()">
        Logout
      </button>
      <button v-else class="btn btn-secondary" @click="$router.push('/auth')">
        Login
      </button>
    </div> -->
    </div>
  </div>
</template>
