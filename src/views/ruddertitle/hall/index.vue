<template>
  <PageHeader :title="'店铺 - '+menuText() +'    当前拥有：'">
    <a-button type="primary" style="margin:10px 0 0;" @click="initPage">刷 新</a-button>
    <DmData ref="DmData" style="margin:10px 0 0;" @init="fetchList({hallId:hall_key})">
      <DmTable :loading="loading">
        <el-table :data="list">
          <el-table-column type="index" label="序号" width="55" />
          <el-table-column v-for="(item, index) in column" :key="index" :label="item.label" :width="item.width" show-overflow-tooltip>
            <template slot-scope="scope">
              <div v-if="item.prop === 'ImageUrl'">
                <img :src="scope.row.ImageUrl" height="24" width="60">
              </div>
              <div v-else>
                {{ formartValue(scope.row, item.prop) }}
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
      API_INDEX: '/systemapi/RudderRankAnotherNamePages',
      API_METHOD: 'post',
      bindParams: {
        RankType: '-1'
      },
      column: [
        { label: '系统身份', prop: 'RankTypeString' },
        { label: '头衔', prop: 'RankAnotherName' }
      ]
    }
  },
  computed: {
    ...mapGetters([
      'hall_list',
      'hall_key'
    ])

  },
  watch: {
    hall_key(val) {
      this.$refs.DmData.initPage()
    }
  },
  methods: {
    initPage() {
      this.$refs.DmData.initPage()
    },
    menuText() {
      const find = this.hall_list.find(i => {
        return i.Id === this.hall_key
      })
      let HallName = ''
      if (find) {
        HallName = find.HallName
      }
      return HallName
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
