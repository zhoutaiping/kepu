<style lang="scss" scoped>
.link-box {
  width: 100%;
  height: auto;
  min-height: 50px;
}
.title-text {
  height: 30px;
  line-height: 30px;
}
.card-box {
  margin: 5px 10px;
  min-height: 50px;
  border-radius: 0;
  border-style: solid;
  border-width: 0 0 0 3px;
  // border-left: 3px solid $--color-primary;
  box-shadow: 0 8px 16px 0px rgba(10, 14, 29, 0.04),
    0px 8px 64px 0px rgba(10, 14, 29, 0.08);
  position: relative;
}
.router-title {
  margin: 0px 0 5px;
  font-size: 17px;
  font-weight: 500;
}
.router-tab {
  margin-top: 10px;
}
.main {
  min-height: calc(100vh - 150px);
  padding-top: 160px !important;
}
</style>
<template>
  <div
    :class="classObj"
    class="app-wrapper"
  >
    <div
      v-if="device==='mobile'&&sidebar.opened"
      class="drawer-bg"
      @click="handleClickOutside"
    />
    <sidebar class="sidebar-container" />
    <div
      :class="{hasTagsView:needTagsView}"
      class="main-container"
    >
      <div :class="{'fixed-header':fixedHeader}">
        <navbar :breadcrumb="false" />
        <div class="link-box">
          <el-card
            shadow="never"
            class="card-box "
            :style="{'border-left':'3px solid','border-color':theme}"
            :body-style="{padding:'10px 10px 0'}"
          >
            <div class="router-title ">
              {{ routeTitle }}
            </div>
            <div
              v-if="tabs && tabs.items"
              class="router-tab"
            >
              <a-tabs
                :tab-bar-style="{margin: '0 0 2px', 'border-bottom': 'none'}"
                :active-key="tabs.active()"
                @change="tabs.callback"
              >
                <a-tab-pane
                  v-for="item in tabs.items"
                  :key="item.key"
                  :tab="item.title"
                  style="margin:0"
                />
              </a-tabs>
            </div>
          </el-card>
        </div>
      </div>
      <app-main class="main" />
    </div>
  </div>
</template>

<script>
import { AppMain, Navbar, Sidebar } from './components'
import ResizeMixin from './mixin/ResizeHandler'
import { mapState } from 'vuex'
export default {
  name: 'BasicLayout',
  components: {
    AppMain,
    Navbar,
    Sidebar
  },
  mixins: [ResizeMixin],
  props: {
    title: {
      type: String,
      default: ''
    },
    appMenu: {
      type: Object,
      default: () => { }
    }
  },
  data: () => {
    return {
      tabs: {}
    }
  },
  computed: {
    ...mapState({
      sidebar: state => state.app.sidebar,
      device: state => state.app.device,
      showSettings: state => state.settings.showSettings,
      needTagsView: state => state.settings.tagsView,
      fixedHeader: state => state.settings.fixedHeader
    }),
    classObj() {
      return {
        hideSidebar: !this.sidebar.opened,
        openSidebar: this.sidebar.opened,
        withoutAnimation: this.sidebar.withoutAnimation,
        mobile: this.device === 'mobile'
      }
    },
    theme() {
      return this.$store.state.settings.theme
    },
    routeTitle() {
      return this.title || this.$route.meta.title || ''
    }
  },
  mounted() {
    this.getPageMeta()
  },
  updated() {
    this.getPageMeta()
  },
  methods: {
    getPageMeta() {
      // console.log('this.$route', this.appMenu)
      this.tabs = this.appMenu
    },
    handleClickOutside() {
      this.$store.dispatch('app/closeSideBar', { withoutAnimation: false })
    }
  }
}
</script>

<style lang="scss" scoped>
@import "~@/styles/mixin.scss";
@import "~@/styles/variables.scss";

.app-wrapper {
  @include clearfix;
  position: relative;
  height: 100%;
  width: 100%;

  &.mobile.openSidebar {
    position: fixed;
    top: 0;
  }
}

.drawer-bg {
  background: #000;
  opacity: 0.3;
  width: 100%;
  top: 0;
  height: 100%;
  position: absolute;
  z-index: 999;
}

.fixed-header {
  position: fixed;
  top: 0;
  right: 0;
  z-index: 9;
  width: calc(100% - #{$sideBarWidth});
  transition: width 0.28s;
}

.hideSidebar .fixed-header {
  width: calc(100% - 54px);
}

.mobile .fixed-header {
  width: 100%;
}
</style>
