<style lang="scss" scope>
.DmToolbar {
  font-size: 0px;
  margin-bottom: 12px;
  overflow: hidden;

  .el-range-editor {
    vertical-align: top;
  }

  .el-button + .el-button {
    margin-left: 0px;
  }

  > * {
    margin-right: 8px !important;
  }

  &__right {
    float: right;
    margin-right: 0px !important;
    > * {
      margin-left: 8px !important;
    }
  }
}
</style>
<template>
  <div :class="b()">
    <slot />
    <div :class="b('right')">
      <slot name="right" />
    </div>
  </div>
</template>

<script>
import create from '@/utils/create-basic'

export default create({
  name: 'DmToolbar'
})
</script>
