<template lang="html">
  <div
    class="w-full h-full fixed mobile-sidebar z-50"
    :class="[sidebarOpen ? 'mobile-sidebar-open' : 'mobile-sidebar-close']"
  >
    <div
      class="bg-gradient-to-l from-black w-full h-screen fixed z-40"
      @click="toggleSidebar()"
    ></div>
    <div
      class="
        w-10/12
        sm:w-1/2
        bg-gray-600
        h-screen
        lg:hidden
        fixed
        right-0
        z-50
        mobile-sidebar
        overflow-y-scroll
      "
      :class="[sidebarOpen ? 'mobile-sidebar-open' : 'mobile-sidebar-close']"
    >
      <LayoutLeftSidebar></LayoutLeftSidebar>
      <LayoutRightSidebar></LayoutRightSidebar>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, namespace, Watch } from 'nuxt-property-decorator';
const layouts = namespace('layouts');
@Component
export default class AccountSideBar extends Vue {
  appInstaller!: any;
  @layouts.State
  sidebarOpen!: boolean;

  @layouts.State
  menuOpen!: boolean;

  get loggedIn() {
    return this.$auth.loggedIn;
  }

  get user() {
    if (this.loggedIn) {
      return this.$auth.user;
    } else {
      return null;
    }
  }

  toggleSidebar() {
    this.$store.commit('layouts/toggleSidebar');
  }

  disableScrolling() {
    const x = window.scrollX;
    const y = window.scrollY;
    window.onscroll = function () {
      window.scrollTo(x, y);
    };
  }

  enableScrolling() {
    window.onscroll = function () {};
  }

  @Watch('sidebarOpen')
  handleSidebar() {
    if (this.sidebarOpen) {
      this.disableScrolling();
    } else {
      this.enableScrolling();
    }
  }
}
</script>

<style scoped>
.mobile-sidebar {
  transition: 0.4s ease-out;
}

.mobile-sidebar-close {
  transform: translateX(100%);
}
.mobile-sidebar-open {
  transform: translateX(0);
}
.blur {
  backdrop-filter: blur(5px);
}

@keyframes marquee {
  0% {
    transform: translateX(100vw);
  }
  100% {
    transform: translateX(-100vw);
  }
}

.enable-spin {
  animation: spin 0.5s ease-in-out infinite;
}

@-moz-keyframes spin {
  from {
    -moz-transform: rotate(0deg);
  }
  to {
    -moz-transform: rotate(360deg);
  }
}
@-webkit-keyframes spin {
  from {
    -webkit-transform: rotate(0deg);
  }
  to {
    -webkit-transform: rotate(360deg);
  }
}
@keyframes spin {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}
</style>
