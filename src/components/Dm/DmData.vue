<style lang="scss">
.DmData {
  background: #fff;
  overflow: auto;
  // box-shadow: 0 2px 3px 0 rgba(0, 0, 0, 0.2);

  &-pagination {
    &__desc {
      line-height: 45px;
      font-size: 13px;
      color: #333;
      font-weight: 600;
    }
  }

  .DmData {
    &-pagination {
      padding: 12px;
      overflow: hidden;
    }
  }
}
</style>

<template>
  <div class="DmData">
    <div class="DmData-table">
      <slot />
    </div>
    <div class="DmData-pagination">
      <div class="pull-left DmData-pagination__desc">
        <slot name="pagination-desc" />
      </div>
      <div
        v-if="showPagination"
        class="pull-right"
      >
        <el-pagination
          :current-page="pagination.page"
          :page-sizes="pagination.page_sizes"
          :page-size="pagination.per_page"
          :total="pagination.total"
          layout="total, sizes, prev, pager, next, jumper"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
        />
      </div>
    </div>
  </div>
</template>

<script>
// import { deepClone } from '@/utils'

export default {
  name: 'DmData',

  props: {
    autoInit: {
      type: Boolean,
      default: true
    },
    innerCard: {
      type: Boolean,
      default: true
    },
    group: {
      type: Boolean,
      default: true
    },
    showPagination: {
      type: Boolean,
      default: true
    },
    perPage: {
      type: Number,
      default: 10
    }
  },

  data() {
    return {
      pagination: {
        page: 1,
        per_page: this.perPage,
        total: 0,
        page_sizes: [10, 20, 30, 50]
      }
    }
  },

  mounted() {
    if (this.autoInit) this.handleInit()
  },

  methods: {
    handleInit() {
      const { page, per_page } = this.pagination
      this.$emit('init', {
        Page: page,
        PageSize: per_page
      })
    },

    getPagination() {
      return this.pagination
    },

    getParams() {
      const { page, per_page } = this.pagination
      return {
        Page: page,
        PageSize: per_page
      }
    },

    init(options) {
      let { total = 0 } = options
      if (isNaN(total)) total = 0
      this.pagination.total = total
    },

    initPage() {
      this.handleCurrentChange(1)
    },

    handleSizeChange(per_page) {
      this.pagination.per_page = per_page
      this.pagination.page = 1
      this.handleInit()
    },

    handleCurrentChange(page) {
      this.pagination.page = page
      this.handleInit()
    }
  }
}
</script>
