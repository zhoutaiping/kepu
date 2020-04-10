<style lang="scss" scoped>
.mt {
  margin: 10px 0 0;
}
.mt >>> .el-card__header{
  padding: 10px 10px !important;
}
.chartV2 {
  min-height: 600px;
}
</style>
<template>
  <PageHeader title="文章统计">
    <a-radio-group v-model="bindParams.articleType" :default-value="1" button-style="solid" style="margin:10px 0 0;" @change="$refs.DmData.initPage()">
      <a-radio-button :value="1">文 章</a-radio-button>
      <a-radio-button :value="2">公 告</a-radio-button>
    </a-radio-group>
    <DmData
      ref="DmData"
      style="margin:10px 0 0;"
      @init="fetchList({hallId:hall_key})"
    >
      <DmTable :loading="loading">
        <el-table :data="list">
          <el-table-column
            v-for="(item, index) in column"
            :key="index"
            :label="item.label"
            :width="item.width"
            show-overflow-tooltip
          >
            <template slot-scope="scope">
              <div>
                {{ scope.row[item.prop] }}
              </div>
            </template>
          </el-table-column>
        </el-table>
      </DmTable>
    </DmData>
  </PageHeader>
</template>
<script>
import { mapGetters } from 'vuex'
import consoleData from '@/mixins/consoleData'
export default {
  mixins: [consoleData],
  data() {
    return {
      API_INDEX: '/articleApi/GetAnalyArticlePages',
      API_METHOD: 'post',
      bindParams: {
        articleType: 1
      },
      column: [
        { label: '文章名称', prop: 'Title' },
        { label: '转发总次数', prop: 'ShareCount' },
        { label: '被查看次数', prop: 'OpenCount' },
        { label: '查看比例', prop: 'Percentage' },
        { label: '带来新粉丝数', prop: 'AddCount' }
      ]
    }
  },
  computed: {
    ...mapGetters([
      'hall_key'
    ])
  },
  watch: {
    hall_key(val) {
      this.$refs.DmData.initPage()
    }
  }
}
</script>
