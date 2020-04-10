<template>
  <div class="PageHeader">
    <div
      v-show="showTitle"
      class="link-box"
    >
      <el-card
        :body-style="{padding:'10px 10px 0'}"
        class="card-box"
        shadow="never"
      >
        <div
          v-show="routeTitle"
          class="title-text "
        >{{ routeTitle }}</div>
      </el-card>
    </div>
    <div
      v-if="$slots.filter"
      class="PageHeader__filter"
    >
      <slot name="filter" />
    </div>
    <slot />
  </div>
</template>

<script>

export default {
  name: 'PageHeader',
  props: {
    title: {
      type: String,
      default: 'true'
    },
    message: {
      type: [Object, Array],
      default: () => []
    },
    showTitle: {
      type: Boolean,
      default: true
    }
  },
  computed: {
    routeTitle() {
      if (this.title !== '') {
        return this.title
      } else {
        return this.$route.meta.title || ''
      }
    }
  }
}
</script>

<style lang="scss">
@import "@/styles/variables.scss";
.PageHeader {
  &__filter {
    padding: 12px;
    padding-bottom: 0px;
    margin-bottom: 12px;
    background: rgb(250, 250, 250);
    .el-form {
      max-width: 1200px;
    }
    .el-form-item__label {
      font-weight: 500;
    }
  }
}
.link-box {
  width: 100%;
  height: auto;
  min-height: 50px;
  border-radius: 0;
}
.title-text {
  height: 30px;
  line-height: 30px;
  font-size: 15px;
}
.card-box {
  position: relative;
  min-height: 50px;
  border-radius: 0 !important;
  border-style: solid;
  border-left: 3px solid $color-primary !important;
  box-shadow: 0 8px 16px 0px rgba(10, 14, 29, 0.04),
    0px 8px 64px 0px rgba(10, 14, 29, 0.08);
}
</style>
