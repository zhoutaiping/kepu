<style lang="scss">
.DmDialogDrawer {
  &.el-dialog__wrapper {
    overflow: hidden;
  }

  &--actionPosition--header{
    .el-dialog__close{
      display: none;
    }
  }

  &__title {
    display: inline-block;
    font-size: 14px;
    padding-left: 12px;
    line-height: 14px;
    font-weight: 600;
    color: $--color-text-primary;
    border-left: 3px solid $--color-primary;
  }

  .el-drawer {
    &__header {
      padding: 0px 18px;
      border-bottom: 1px solid $--border-color-light;
      height: 48px;
      margin-bottom: 0px;

      .el-button{
        padding: 8px 20px;
      }
    }

    &__body {
      position: relative;
      overflow: auto;
      padding: 18px;
    }
  }

  &__footer {
    position: absolute;
    padding: 18px;
    border-top: 1px solid $--border-color-light;
    bottom: 0px;
    left: 0px;
    right: 0px;
    text-align: right;
  }
}
</style>

<template>
  <el-drawer
    ref="drawer"
    :title="title"
    :class="b([`actionPosition--${actionPosition}`])"
    :visible.sync="visible"
    :size="width"
  >
    <template slot="title">
      <span :class="b('title')">{{ titleShow }}</span>
      <template v-if="footerVisible && actionPosition === 'header'">
        <el-button @click="visible = false">取 消</el-button>
        <el-button
          :loading="submitLoading"
          type="primary"
          @click="handleSubmit()"
        >{{ submitLoading ? '提交中 ...' : '确 定' }}</el-button>
      </template>
    </template>
    <slot />
    <div v-if="footerVisible && actionPosition === 'footer'" :class="b('footer')">
      <el-button @click="visible = false">取 消</el-button>
      <el-button
        :loading="submitLoading"
        type="primary"
        @click="handleSubmit()"
      >{{ submitLoading ? '提交中 ...' : '确 定' }}</el-button>
    </div>
  </el-drawer>
</template>

<script>
import create from '@/utils/create-basic'

export default create({
  name: 'DmDialogDrawer',

  props: {
    width: [String, Number],
    appendToBody: Boolean,
    cancelVisible: {
      type: Boolean,
      default: true
    },
    submitText: {
      type: String,
      default: 'ok'
    },
    title: {
      type: String,
      default: ''
    },
    footerVisible: {
      type: Boolean,
      default: true
    },
    titleLabel: {
      type: String,
      default: ''
    },
    loading: Boolean,
    fetchSubmit: Function,
    mode: {
      type: String,
      default: 'Create'
    },
    rule: {
      type: Array,
      default: function() {
        return []
      }
    },
    option: {
      type: Object
    },
    actionPosition: {
      type: String,
      default: 'header'
    }
  },

  data() {
    return {
      visible: false,
      form: {},
      submitLoading: false
    }
  },

  computed: {
    titleShow() {
      if (this.title) {
        return this.title
      } else {
        return this.mode === 'Edit' ? `修改${this.titleLabel}` : `创建${this.titleLabel}`
      }
    }
  },

  methods: {
    handleClose() {
      this.visible = false
    },

    handleOpen() {
      this.visible = true
    },

    async handleSubmit() {
      if (this.fetchSubmit) {
        this.submitLoading = true
        try {
          await this.fetchSubmit()
        } catch (e) {
          return
        } finally {
          this.submitLoading = false
        }
      }
      this.$emit('submit')
    }
  }
})
</script>
