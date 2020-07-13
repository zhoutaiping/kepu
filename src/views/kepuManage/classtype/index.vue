<style lang="scss" scoped>
.input-box {
  width: 200px;
}
.mt {
  margin-top: 10px;
}
</style>
<template>
  <PageHeader title="班级类型管理">
    <DmToolbar class="mt">
      <a-button type="primary" style="margin:10px 0 0;" @click="$refs.addEdit.handleOpen(null, 'Create')">添 加</a-button>
      <a-button type="primary" style="margin:10px 0 0;" @click="initPage">刷 新</a-button>
    </DmToolbar>
    <DmData ref="DmData" style="margin:10px 0 0;" :group="false" @init="fetchList({hallId:hall_key})">
      <DmTable :loading="loading">
        <el-table :data="list">
          <el-table-column type="index" label="序号" width="55" />
          <el-table-column v-for="(item, index) in column" :key="index" :label="item.label" :width="item.width">
            <template slot-scope="scope">
              <div v-if="item.prop === 'Logo'">
                <img :src="scope.row.Logo" height="60" width="60">
              </div>
              <div v-else-if="item.prop === 'IsDelete'">
                <span v-if="Number(scope.row.IsDelete) ===0" class="success-text">上线</span>
                <span v-else-if="Number(scope.row.IsDelete) ===1" class="error-text">下线</span>
              </div>
              <div v-else>
                {{ formartValue(scope.row, item.prop) }}
              </div>
            </template>
          </el-table-column>
          <el-table-column label="操作" width="120">
            <template slot-scope="scope">
              <a class="success-text" @click="$refs.addEdit.handleOpen(scope.row,'Edit')">编 辑</a>
              <el-divider direction="vertical" />
              <template v-if="Number(scope.row.IsDelete)===1">
                <a v-loading="" class="success-text" @click="EditStatus(scope.row, 0)">上 线</a>
              </template>
              <template v-if="Number(scope.row.IsDelete)===0">
                <a class="success-text" @click="EditStatus(scope.row, 1)">下 线</a>
              </template>
            </template>
          </el-table-column>
        </el-table>
      </DmTable>
    </DmData>
    <add-edit ref="addEdit" @success="initPage" />
  </PageHeader>
</template>
<script>
import { mapGetters } from 'vuex'
import consoleData from '@/mixins/consoleData'
import AddEdit from './components/add-edit'
export default {
  components: { AddEdit },
  mixins: [consoleData],
  data() {
    return {
      API_INDEX: '/PopularScienceapi/GetList',
      API_METHOD: 'post',
      column: [
        { label: '商品Logo', prop: 'Logo' },
        { label: '商品名称', prop: 'Name' },
        { label: '规格', prop: 'Rule' },
        { label: '媒体售价', prop: 'Price' },
        { label: 'Key码数量', prop: 'KeyCodeCount' },
        { label: '状态', prop: 'IsDelete' },
        { label: '热门指数', prop: 'IsHot' },
        { label: '排序', prop: 'Sort' }
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

      let api = '/PopularScienceapi/Up'
      if (type === 1) api = '/PopularScienceapi/Del'
      this.Fetch.post(api, {
        Id: data.Id
      }).then(res => {
        this.Message('ACTION_SUCCESS')
        this.initPage()
      }).catch(e => {})
    },
    formartValue(data, prop) {
      let str = ''
      switch (prop) {
        case 'isDelete':
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
