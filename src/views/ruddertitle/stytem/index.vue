<template>
  <PageHeader title="系统头衔">
    <a-button type="primary" style="margin:10px 0 0;" @click="initPage">刷 新</a-button>
    <DmData
      ref="DmData"
      style="margin:10px 0 0;"
      @init="fetchList"
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
              <div v-if="item.prop === 'ImageUrl'">
                <img
                  :src="scope.row.ImageUrl"
                  height="24"
                  width="60"
                >
              </div>
              <div v-else>
                {{ formartValue(scope.row, item.prop) }}
              </div>
            </template>
          </el-table-column>
          <!-- <el-table-column label="操作" width="150">
            <template slot-scope="scope">
              <a class="success-text" @click="$emit('rudderRank',scope.row)">分 配</a>
              <el-divider direction="vertical" />
              <a class="success-text" @click="delete(scope.row, scope.$index)">删 除</a>
            </template>
          </el-table-column> -->
        </el-table>
      </DmTable>
    </DmData>
  </PageHeader>
</template>
<script>
import consoleData from '@/mixins/consoleData'

export default {
  components: {},
  mixins: [consoleData],
  data() {
    return {
      API_INDEX: '/systemapi/RankAnotherNamePages',
      API_METHOD: 'post',
      bindParams: {
        RankType: '-1'
      },
      column: [
        { label: '头衔图片', prop: 'ImageUrl' },
        { label: '系统身份', prop: 'RankTypeString' },
        { label: '头衔', prop: 'Name' }
      ]
    }
  },

  methods: {
    initPage() {
      this.$refs.DmData.initPage()
    },
    async delete(row, index) {
      this.Message('ACTION_SUCCESS')
      // await this.Fetch.post('/Systemapi/DeleteRankAnotherName', { id: row.Id }).then(res => {
      //   this.$refs.DmData.initPage()
      // }).catch(e => {})
    },
    formartValue(data, prop) {
      let str = ''
      switch (prop) {
        case 'status':
          str = '成功'
          break
        default:
          str = data[prop]
          break
      }
      return str
    }
  }
}
</script>
