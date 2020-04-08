<style lang="scss" scoped>
.input-box {
  width: 200px;
}
.mt {
  margin-top: 10px;
}
</style>
<template>
  <PageHeader title="店铺有效期管理">
    <DmToolbar class="mt">
      <a-button type="primary" style="margin:10px 0 0;">添 加</a-button>
      <div slot="right">
        <InputSearch
          v-model="bindParams.name"
          placeholder="店铺名称"
          class="input-box"
          style=""
          @submit="$refs.DmData.initPage()"
        />
      </div>
    </DmToolbar>
    <DmData ref="DmData" style="margin:10px 0 0;" @init="fetchList({hallId:hall_key})">
      <DmTable :loading="loading">
        <el-table :data="list">
          <el-table-column type="index" width="55" />
          <el-table-column v-for="(item, index) in column" :key="index" :label="item.label" :width="item.width" show-overflow-tooltip>
            <template slot-scope="scope">
              <div v-if="item.prop === 'Logo'">
                <img :src="scope.row.Logo" height="40" width="40">
              </div>
              <div v-else-if="item.prop === 'StatusString'">
                <span v-if="scope.row.Status ===1" class="error-text">{{ formartValue(scope.row, item.prop) }}</span>
                <span v-else class="success-text">{{ formartValue(scope.row, item.prop) }}</span>
              </div>
              <div v-else>
                {{ formartValue(scope.row, item.prop) }}
              </div>
            </template>
          </el-table-column>
          <el-table-column label="操作" width="250">
            <!-- <template slot-scope="scope"> -->
            <!-- <a>编 辑</a> -->
            <!-- <el-divider direction="vertical" /> -->
            <!-- </template> -->
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
      API_INDEX: '/HallGoodsapi/GetHallGoodsList',
      API_METHOD: 'post',
      bindParams: {
        name: ''
      },
      column: [
        { label: 'Logo', prop: 'Logo' },
        { label: '店铺名称', prop: 'Name' }
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
  },
  methods: {
    initPage() {
      this.$refs.DmData.initPage()
    },
    EditStatus(data, type) {
      if (!data.Id || data.Id === '') return
      this.Fetch.post('/HallGoodsapi/UpdateHallGoodsStatus', {
        hallGoodsStatus: type,
        hallGoodsIdList: [data.Id]
      }).then(res => {
        this.Message('ACTION_SUCCESS')
        this.initPage()
      }).catch(e => {})
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
