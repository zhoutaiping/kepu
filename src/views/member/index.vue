<style lang="scss" scoped>
.input-box {
  width: 200px;
}
.mt {
  margin-top: 10px;
}
</style>
<template>
  <PageHeader title="会员管理">
    <DmToolbar class="mt">
      <a-button type="primary" @click="initPage">刷 新</a-button>
    </DmToolbar>
    <DmData ref="DmData" style="margin:10px 0 0;" @init="fetchList({hallId:hall_key})">
      <DmTable :loading="loading">
        <el-table :data="list">
          <el-table-column type="index" label="序号" width="55" />
          <el-table-column v-for="(item, index) in column" :key="index" :label="item.label" :width="item.width">
            <template slot-scope="scope">
              <div v-if="item.prop === 'UserUrl'">
                <img :src="scope.row.UserUrl" height="40" width="40">
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
            <template slot-scope="scope">
              <a-popconfirm
                title="是否确认取消会员?"
                ok-text="是"
                cancel-text="否"
                @confirm="cacel(scope.row)"
              >
                <a class="success-text">取消会员</a>
              </a-popconfirm>
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
import moment from 'moment'
export default {
  mixins: [consoleData],
  data() {
    return {
      API_INDEX: '/HallMemberapi/GetHallMemberList',
      API_METHOD: 'post',
      bindParams: {
        name: ''
      },
      column: [
        { label: '头像', prop: 'UserUrl', width: '100' },
        { label: '会员名称', prop: 'UserName' },
        { label: '注册时间', prop: 'CreateTime' }
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
    cacel(data, type) {
      if (!data.Id || data.Id === '') return
      this.Fetch.post('/HallMemberapi/CancelMember', {
        userId: '',
        userIds: [data.UserId],
        source: 1,
        isBatch: true
      }).then(res => {
        this.Message('ACTION_SUCCESS')
        this.initPage()
      }).catch(e => {})
    },
    formartValue(data, prop) {
      let str = ''
      switch (prop) {
        case 'CreateTime':
          str = this.formartData(data[prop])
          break
        default:
          str = data[prop]
          break
      }
      return str
    },
    formartData(time) {
      if (time) return moment(time).format('YYYY-MM-DD HH:mm:ss')
    }
  }
}
</script>
