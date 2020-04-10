<style lang="scss" scoped>
.menu-box {
  width: 100%;
  padding: 5px;
  display: inline-grid;
  grid-template-columns: 250px auto;
  grid-template-rows: calc(100vh - 105px);
  grid-column-gap: 10px;
}
.border-box {
  border: 1px solid #f5f5f5;
}
.menu-box-title {
  width: 100%;
  height: 50px;
  line-height: 40px;
  padding: 5px;
  border-bottom: 1px solid #f5f5f5;
}
.el-menu-vertical-demo {
}
</style>
<template>
  <div class="menu-box">
    <div class="border-box ">
      <div class="menu-box-title">
        {{ appMenu.title }}
      </div>
      <el-menu
        default-active="1"
        class="el-menu-vertical-demo"
        @select="handleSelect"
      >
        <el-menu-item v-for="(item, index) in appMenu.items" :key="index" :index="(index + 1).toString()">
          {{ item.title }}
        </el-menu-item>
      </el-menu>
    </div>
    <div class="border-box ">
      //
    </div>
  </div>
</template>
<script>
export default {
  components: {},
  props: {
    appMenu: {
      type: Object,
      default: () => {}
    },
    pageRouter: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {

    }
  },
  methods: {
    handleSelect(key, keyPath) {
      console.log('keyPath=======', key, keyPath)
    }
  }
}
</script>
