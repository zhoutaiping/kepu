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
      <a-button type="primary" style="margin:10px 0 0;" @click="$refs.DmData.initPage()">刷 新</a-button>
    </DmToolbar>
    <DmData ref="DmData" style="margin:10px 0 0;" @init="fetchList({hallId:hall_key})">
      <DmTable :loading="loading">
        <el-table :data="list">
          <el-table-column type="index" label="序号" width="55" />
          <el-table-column v-for="(item, index) in column" :key="index" :label="item.label" :width="item.width" show-overflow-tooltip>
            <template slot-scope="scope">
              <div v-if="item.prop === 'ApplyLogo'">
                <img v-show="scope.row.ApplyLogo" :src="scope.row.ApplyLogo" height="60" width="60">
              </div>
              <div v-else>
                {{ formartValue(scope.row, item.prop) }}
              </div>
            </template>
          </el-table-column>
          <el-table-column label="操作" width="100">
            <template slot-scope="scope">
              <a class="success-text" @click="$refs.edit.handleOpen(scope.row)">店铺编辑</a>
            </template>
          </el-table-column>
        </el-table>
      </DmTable>
    </DmData>
    <EditDialog ref="edit" @success="initPage" />
  </PageHeader>
</template>
<script>
import { mapGetters } from 'vuex'
import consoleData from '@/mixins/consoleData'
import EditDialog from './components/edit'
export default {
  components: { EditDialog },
  mixins: [consoleData],
  data() {
    return {
      API_INDEX: '/ProjectApplyapi/GetProjectPages',
      API_METHOD: 'post',
      bindParams: {
        applyStatus: 1
      },
      column: [
        // { label: '店铺Logo', prop: 'ApplyLogo' },
        { label: '店铺名', prop: 'ApplyProjectName' },
        { label: '店铺管理员', prop: 'ApplyName' },
        { label: '店铺联系手机号', prop: 'ApplyPhone' },
        { label: '店铺联系微信号', prop: 'ApplyWxCode' },
        { label: '店铺状态', prop: 'ProjectApplyStatus' },
        { label: '店铺简介', prop: 'ApplyProjectDesc' },
        { label: '店铺有效期', prop: 'ValidityTimeString' }
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
        case 'ProjectApplyStatus':
          str = Number(data[prop]) === 1 ? '正常' : '其他'
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
