<style lang="scss">
@import "@/styles/variables.scss";

.DmTable {
  position: relative;

  &--border {
    border: 1px solid #eee;
  }

  &__loading {
    position: absolute;
    left: 0px;
    right: 0px;
    bottom: 0px;
  }

  &--primary {
    .el-table {
      thead {
        font-weight: bold;
        color: #fff !important;
        th {
          background: $color-primary;
        }
      }
    }

    .el-checkbox__inner::after {
      border-width: 2px;
      border-color: $color-primary;
    }

    .el-checkbox__input.is-indeterminate .el-checkbox__inner::before {
      background-color: $color-primary;
      height: 3px;
      top: 5px;
    }
    .el-checkbox__input.is-checked .el-checkbox__inner,
    .el-checkbox__input.is-indeterminate .el-checkbox__inner {
      background-color: #fff;
    }
  }

  &--minHeight {
    .el-table {
      min-height: 480px;
    }
  }

  .el-table {
    font-size: 13px;
    line-height: 19.5px;

    &--medium {
      td {
        padding: 16px 0 !important;
      }
    }

    td {
      padding: 12px 0 !important;
    }

    thead {
      font-weight: bold;
      color: #606266;
    }

    /* th > .cell {
      font-weight: 600;
    } */

    &__empty-block {
      .el-button--text {
        font-size: 13px;
      }
    }
  }

  .btn-add {
    display: block;
    text-align: center;
    height: 48px;
    line-height: 48px;
    cursor: pointer;

    &.is-disabled {
      cursor: not-allowed;
      opacity: 0.5;
    }

    .yd-icon {
      font-size: 12px;
      margin-right: 4px;
    }

    &__title {
      color: $color-primary;
      font-size: 13px;
    }

    &__desc {
      color: #999;
      font-size: 12px;
    }

    &:hover {
      background: $--color-primary-light-9;
    }

    &:active {
      background: rgb(250, 250, 250);
    }
  }
}
</style>

<template>
  <div :class="[b([type]), b({minHeight, addButton, border}), {'is-loading': loading}]">
    <slot />
    <div
      v-if="loading"
      v-loading="loading"
      :class="b('loading')"
      :style="{top: headerHeight}"
      element-loading-text="加载中"
      element-loading-spinner="el-icon-loading"
    />
    <div v-if="addButton">
      <a
        :class="{'is-disabled': addButtonDisabled}"
        class="btn-add"
        @click="handleAddRow"
      >
        <span class="btn-add__title">
          <yd-icon name="el-icon-plus" />
          {{ addButtonText }}
        </span>
        <span class="btn-add__desc">
          <slot name="add-row-text" />
        </span>
      </a>
    </div>
  </div>
</template>

<script>
import create from '@/utils/create-basic'

export default create({
  name: 'DmTable',

  props: {
    type: {
      type: String,
      default: 'primary'
    },
    headerHeight: {
      type: String,
      default: '40px'
    },
    // 添加按钮设置
    addButton: Boolean,
    addButtonText: {
      type: String,
      default: '新增'
    },
    border: Boolean,
    addButtonDisabled: Boolean,
    //
    animate: Boolean,
    loading: Boolean,
    minHeight: Boolean
  },

  methods: {
    handleAddRow() {
      if (this.addButtonDisabled) return
      this.$emit('click-add-button')
    }
  }
})
</script>
