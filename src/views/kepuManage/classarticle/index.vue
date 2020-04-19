<style scoped>
.input-box {
  width: 180px;
}
.mt {
  margin-top: 10px;
}
</style>
<template>
  <PageHeader title="班级文章管理">
    <DmToolbar class="mt">
      <el-select v-model="bindParams.ArticleCategoryId" clearable placeholder="Key码类型" class="input-box" size="small" @change="initPage">
        <el-option v-for="_ in key_list" :key="_.Id" :label="_.Name" :value="_.Id" />
      </el-select>
      <a-button type="primary" @click="$refs.addEdit.handleOpen()">添 加</a-button>
    </DmToolbar>
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
              <div v-if="item.prop === 'ArticleLogo'">
                <img
                  :src="scope.row.ArticleLogo"
                  height="40"
                  width="40"
                >
              </div>
              <div v-else-if="item.prop === 'Status'">
                <span v-if="Number(scope.row.Status) ===0" class="success-text">上架</span>
                <span v-else-if="Number(scope.row.Status) ===1" class="error-text">下架</span>
              </div>
              <div v-else>
                {{ formartValue(scope.row, item.prop) }}
              </div>
            </template>
          </el-table-column>
          <el-table-column label="操作" width="250">
            <template slot-scope="scope">
              <a class="success-text" @click="$refs.infoDialog.handleOpen(scope.row)">预 览</a>
              <el-divider direction="vertical" />
              <a class="success-text" @click="$refs.addEdit.handleOpen(scope.row, 'Edit')">编 辑</a>
              <el-divider direction="vertical" />
              <template>
                <a v-show="Number(scope.row.Status) ===1" class="success-text" @click="EditStatus(scope.row, 1)">上 架</a>
              </template>
              <template>
                <a v-show="Number(scope.row.Status) ===0" class="success-text" @click="EditStatus(scope.row, 2)">下 架</a>
              </template>
            </template>
          </el-table-column>
        </el-table>
      </DmTable>
    </DmData>
    <add-edit ref="addEdit" @success="initPage" />
    <InfoPage ref="infoDialog" />
  </PageHeader>
</template>
<script>
import { mapGetters } from 'vuex'
import consoleData from '@/mixins/consoleData'
import AddEdit from './components/add-edit'
import InfoPage from './components/info'
export default {
  components: { AddEdit, InfoPage },
  mixins: [consoleData],
  data() {
    return {
      API_INDEX: '/articleApi/GetArticlePayPages',
      API_METHOD: 'post',
      bindParams: {
        ArticleCategoryId: ''
      },
      column: [
        { label: '文章Logo', prop: 'ArticleLogo' },
        { label: '标题', prop: 'Title', width: 300 },
        { label: '打开次数', prop: 'ArticleOpenCount' },
        { label: '分享次数', prop: 'ArticleShareCount' },
        { label: '作者', prop: 'CreateUserName' },
        { label: '状态', prop: 'Status' }
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
        this.$store.dispatch('system/GetFilterBoxList', this.hall_key),
        this.$store.dispatch('system/GetArticleCategoryList', this.hall_key),
        this.$store.dispatch('system/GetArticleLabelList', this.hall_key)
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
    await Promise.all([
      this.$store.dispatch('system/GetFilterBoxList', this.hall_key),
      this.$store.dispatch('system/GetArticleCategoryList', this.hall_key),
      this.$store.dispatch('system/GetArticleLabelList', this.hall_key)
    ])
    setTimeout(() => {
      if (this.key_list.length) {
        this.bindParams.ArticleCategoryId = this.key_list[0].Id || ''
      }
      this.initPage()
    }, 500)
  },
  methods: {
    initPage() {
      this.$refs.DmData.initPage()
    },
    EditStatus(data, type) {
      const api = type === 1 ? '/articleApi/ShelfArticle' : '/articleApi/DeleteArticle'
      this.Fetch.post(api, { id: data.Id }).then(res => {
        this.Message('ACTION_SUCCESS')
        this.initPage()
      }).catch(e => {})
    },
    formartValue(data, prop) {
      let str = ''
      switch (prop) {
        default:
          str = data[prop]
          break
      }
      return str
    }
  }
}
</script>
