<style scoped>
.input-box {
  width: 180px;
}
</style>
<template>
  <PageHeader title="班级key码管理">
    <el-select v-model="bindParams.ArticleCategoryId" clearable placeholder="Key码类型" class="input-box" size="small" @change="initPage">
      <el-option v-for="_ in key_list" :key="_.Id" :label="_.Name" :value="_.Id" />
    </el-select>
    <a-button type="primary" style="margin:10px 0 0;" @click="initPage">刷 新</a-button>
    <DmData
      ref="DmData"
      style="margin:10px 0 0;"
      :auto-init="false"
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
              <div v-if="item.prop === 'UseUserLogo'">
                <img
                  v-show="scope.row.UseUserLogo"
                  :src="scope.row.UseUserLogo"
                  height="40"
                  width="40"
                >
              </div>
              <div v-else-if="item.prop ==='IsTeacher'">
                <span :class="Number(scope.row.IsTeacher) === 1 ?'success-text':'warning-text'">{{ Number(scope.row.IsTeacher) === 1 ? '是' : '否' }}</span>
              </div>
              <span v-else>
                {{ formartValue(scope.row, item.prop) }}
              </span>
            </template>
          </el-table-column>
          <el-table-column label="操作" fixed="right" width="200">
            <template slot-scope="scope">
              <template v-if="Number(scope.row.IsTeacher) === 0 && !!scope.row.UseUserId">
                <el-button size="mini" type="text" @click="edit(scope.row,1)">设为班主任</el-button>
                <el-divider direction="vertical" />
              </template>
              <template v-if="Number(scope.row.IsTeacher) === 1 && !!scope.row.UseUserId">
                <el-button size="mini" type="text" @click="edit(scope.row,2)">取消班主任</el-button>
                <el-divider direction="vertical" />
              </template>
              <el-button v-if="!!scope.row.UseUserId" size="mini" type="text" @click="$refs.info.handleOpen(scope.row)">班级圈</el-button>
            </template>
          </el-table-column>
        </el-table>
      </DmTable>
    </DmData>
    <InFo ref="info" />
  </PageHeader>
</template>
<script>
import { mapGetters } from 'vuex'
import consoleData from '@/mixins/consoleData'
import moment from 'moment'
import InFo from './info'
export default {
  components: { InFo },
  mixins: [consoleData],
  data() {
    return {
      API_INDEX: '/PopularScienceapi/GetArticleCategoryPayKeyPage',
      API_METHOD: 'post',
      bindParams: {
        ArticleCategoryId: ''
      },
      column: [
        { label: 'Key码类型名', prop: 'ArticleCategoryName' },
        { label: 'Key码', prop: 'PayKeyCode' },
        { label: '使用人Logo', prop: 'UseUserLogo' },
        { label: '使用者', prop: 'UseUserName' },
        { label: '是否为班主任', prop: 'IsTeacher' },
        { label: '手机号', prop: 'CellPhone' },
        { label: '微信号', prop: 'WXQRCode' },
        { label: '使用时间', prop: 'UseTimeString' }
      ]
    }
  },
  computed: {
    ...mapGetters([
      'hall_key',
      'key_list'
    ])
  },
  watch: {
    async hall_key(val) {
      await Promise.all([
        this.$store.dispatch('system/GetFilterBoxList', this.hall_key)
      ])
      setTimeout(() => {
        if (this.key_list.length) {
          this.bindParams.ArticleCategoryId = this.key_list[0].Id || ''
        }
        this.initPage()
      }, 500)
    }
  },
  async created() {
    await this.$store.dispatch('system/GetFilterBoxList', this.hall_key)
    setTimeout(() => {
      if (this.key_list.length) {
        this.bindParams.ArticleCategoryId = this.key_list[0].Id || ''
      }
      this.initPage()
    }, 500)
  },
  methods: {
    initPage() {
      this.$store.dispatch('system/GetCircleLabel', this.bindParams.ArticleCategoryId)
      this.$refs.DmData.initPage()
    },
    formartValue(data, prop) {
      let str = ''
      switch (prop) {
        case 'UseTime' :
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
    },
    async edit(data, type) {
      try {
        if (type === 1) {
          await this.Fetch.post('/PopularScienceapi/UpClassTeacher', { id: data.Id })
          this.Message('ACTION_SUCCESS')
          this.$refs.DmData.initPage()
        } else if (type === 2) {
          await this.Fetch.post('/PopularScienceapi/DelClassTeacher', { id: data.Id })
          this.Message('ACTION_SUCCESS')
          this.$refs.DmData.initPage()
        }
      } catch (error) {
        return
      }
    }
  }
}
</script>
