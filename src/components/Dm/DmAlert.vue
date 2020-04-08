<style lang="scss">
.DmAlert {
  border: 1px solid $--color-primary;
  background: $--color-primary-light-9;
  padding: 12px 20px;
  font-size: 12px;
  margin-bottom: 16px;
  color: $--color-text-primary;
  line-height: 1.5;

  a {
    color: $--color-primary;

    &:hover {
      text-decoration: underline;
    }
  }

  p {
    &:not(:last-child) {
      margin-bottom: 8px;
    }
  }

  ul {
    margin-left: 14px;
    list-style-type: disc;
  }

  ol {
    margin-left: 14px;
  }

  .num-item {
    text-indent: -10px;
    padding-left: 18px;
    list-style-type: decimal;

    &:not(:last-child) {
      margin-bottom: 8px;
    }
  }

  .dot-item {
    position: relative;
    padding-left: 4px;

    &:not(:last-child) {
      margin-bottom: 8px;
    }
  }
}
</style>

<template>
  <div :class="b()">
    <slot />
  </div>
</template>

<script>
import create from '@/utils/create-basic'

export default create({
  name: 'DmAlert',

  components: {},

  props: {},

  data() {
    return {}
  },

  computed: {},

  methods: {}
})
</script>
