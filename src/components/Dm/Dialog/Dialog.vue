<style lang="scss">
@keyframes dialog-aside-in {
  0% {
    transform: translate3d(120px, 0, 0);
    opacity: 0;
  }
  100% {
    transform: translate3d(0, 0, 0);
    opacity: 1;
  }
}

@keyframes dialog-aside-out {
  0% {
    transform: translate3d(0, 0, 0);
    opacity: 1;
  }
  100% {
    transform: translate3d(120px, 0, 0);
    opacity: 0;
  }
}

.yd-dialog {
  .el-dialog {
    border-radius: 0px !important;

    &__title {
      display: block;
      font-size: 14px;
      padding-left: 12px;
      line-height: 14px;
      border-left: 3px solid $--color-primary;
    }

    &__body {
      padding: 16px;
    }

    &__header {
      padding: 16px;
      border-bottom: 1px solid rgba(0, 0, 0, 0.06);

      .el-dialog__headerbtn {
        top: 12px;
        right: 16px;
      }
      .el-dialog__close {
        font-size: 15px;
      }
    }

    &__footer {
      border-top: 1px solid rgba(0, 0, 0, 0.1);
      padding: 10px;
      overflow: hidden;
    }
  }
  .yd-input-safe-code {
    text-align: center;
    margin: 20px auto;
  }

  &.is-aside {
    &.size--small {
      .el-dialog {
        width: 600px;
      }
    }

    &.size--mini {
      .el-dialog {
        width: 400px;
      }
    }

    &.size--500 {
      .el-dialog {
        width: 500px;
      }
    }

    &.size--600 {
      .el-dialog {
        width: 600px;
      }
    }
    .el-dialog {
      display: flex;
      flex-direction: column;
      overflow: auto;
      right: 0px !important;
      top: 0px !important;
      bottom: 0px;
      width: 850px;
      left: auto;
      transform: translateX(0%);
      margin-bottom: 0px;
      margin-right: 0px;
      margin-top: 0px !important;
      height: 100%;

      &.size--500 {
        .el-dialog {
          width: 500px;
        }
      }

      &.size--600 {
        .el-dialog {
          width: 600px;
        }
      }

      &__header {
        padding: 10px;
        margin-bottom: 10px;
        border-bottom: 1px solid #eee;
      }

      &__title {
        font-size: 16px;
        padding-top: 10px;
        padding-bottom: 10px;
        border-left: none;
        padding-left: 5px;
        border-left: 3px solid #2991fa;
      }

      &__body {
        padding: 0 20px;
        flex: 1;
        display: flex;
        flex-grow: 1;
        flex-direction: column;
        overflow-x: auto;
      }
    }

    &.dialog-fade-enter-active {
      animation: ease-in-out dialog-aside-in 0.18s !important;
    }

    &.dialog-fade-leave-active {
      animation: ease-in-out dialog-aside-out 0.18s !important;
    }

    &.yd-dialog-aside {
      &--top {
        .el-dialog__headerbtn {
          display: none;
        }

        .el-dialog__footer {
          position: absolute;
          right: 0px;
          top: 0px;
          padding: 7px 25px 7px 0 !important;
          .el-button {
            margin-left: 25px;
            font-size: 13px;

            &--primary {
              background: #fff;
              border: none;
              color: $--color-primary;
            }
          }
        }
      }
      &--default {
        .el-dialog__footer {
          background: rgb(245, 245, 245);
          position: absolute;
          overflow: auto;
          padding: 20px;
          right: 0px;
          left: 0px;
          bottom: 0px;
          height: 55px;
        }
      }
    }
  }
  &__footer {
    .pull-left {
      float: left;
    }
  }
}
</style>

<template>
  <el-dialog
    :class="[{'is-aside': aside}, 'yd-dialog-aside--' + asideType, 'size--' + size]"
    :width="width"
    :close-on-click-modal="closeOnClickModal"
    :modal="modal"
    :close-on-press-escape="closeOnPressEscape"
    :title="title"
    :append-to-body="appendToBody"
    :visible.sync="open"
    class="yd-dialog"
    @close="handleClose"
  >
    <slot />
    <div slot="footer">
      <slot name="footer" />
    </div>
  </el-dialog>
</template>

<script>
/*
+-----------------------------------------------------------------------------------------------------------------------
| Yundun
+-----------------------------------------------------------------------------------------------------------------------
| yd-dialog
| 弹框组件，支持 aside
*/

const NAME = 'yd-dialog'

export default {
  name: NAME,

  props: {
    title: {
      type: String,
      default: ''
    },
    modal: {
      type: Boolean,
      default: true
    },
    visible: Boolean,
    width: {
      type: [String, Number],
      default: ''
    },
    size: {
      type: String,
      default: ''
    },
    appendToBody: Boolean,
    asideType: {
      type: String,
      default: 'default'
    },
    aside: {
      type: Boolean,
      default: false
    },
    closeOnClickModal: {
      type: Boolean,
      default: true
    }
  },

  data() {
    return {
      closeOnPressEscape: false,
      open: this.visible
    }
  },

  watch: {
    visible(val) {
      if (val) {
        this.open = true
      } else {
        this.open = false
      }
    }
  },

  methods: {
    handleClose() {
      this.$emit('close')
      this.$emit('update:visible', false)
    }
  }
}
</script>
