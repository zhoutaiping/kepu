<style lang="scss">
.el-input.InputSearch {
  width: 200px;
}
</style>

<template>
  <el-input
    v-model="keyword"
    :class="b()"
    :placeholder="placeholder"
    :size="size"
    clearable
    @change="handleChange"
    @keyup.enter.native="handleSubmit"
  >
    <i
      :slot="iconPosition"
      class="el-icon-search el-input__icon"
      @click="handleSubmit"
    />
  </el-input>
</template>

<script>
import create from '@/utils/create-basic'

export default create({
  name: 'InputSearch',

  props: {
    iconPosition: {
      type: String,
      default: 'prefix'
    },
    size: {
      type: String,
      default: 'small'
    },
    value: [String, Number],

    placeholder: {
      type: String,
      default() {
        return this.$t('InputSearch.placeholder')
      }
    }
  },

  data() {
    return {
      keyword: ''
    }
  },

  watch: {
    value(val) {
      this.keyword = val
    },

    keyword(val) {
      this.handleChange()
      this.$emit('input', val)
    }
  },

  mounted() {
    this.keyword = this.value
  },

  methods: {
    handleChange() {
      this.$emit('change', this.keyword)
    },

    handleSubmit() {
      this.$emit('submit', this.keyword)
    }
  }
})
</script>

<i18n>
{
  "cht": {
    "InputSearch.placeholder": "請輸入進行査詢"
  },
  "en": {
    "InputSearch.placeholder": "Please enter for query"
  },
  "zh": {
    "InputSearch.placeholder": "请输入进行查询"
  }
}
</i18n>
