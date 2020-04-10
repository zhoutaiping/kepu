<style scoped>

</style>
<template>
  <PageHeader title="文章管理">
    <a-button type="primary" style="margin:10px 0 0;" @click="$refs.addEdit.handleOpen()">添 加</a-button>
    <a-button v-if="false" type="primary" style="margin:10px 0 0;" @click="$refs.tagDialog.handleOpen()">添加文字标签</a-button>
    <a-button v-if="false" type="primary" style="margin:10px 0 0;" @click="$refs.typeDialog.handleOpen()">添加文字分类</a-button>
    <a-button type="primary" style="margin:10px 0 0;" @click="initPage">刷 新</a-button>
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
              <div v-if="item.prop === 'ArticleLogo'">
                <img
                  :src="scope.row.ArticleLogo"
                  height="60"
                  width="60"
                >
              </div>
              <div v-else-if="item.prop === 'Status'">
                <span v-if="Number(scope.row.Status) ===0" class="success-text">已上架</span>
                <span v-else-if="Number(scope.row.Status) ===1" class="error-text">已下线</span>
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
              <template v-if="false">
                <a class="success-text" @click="EditStatus(scope.row, 1)">上 架</a>
              </template>
              <template>
                <a class="success-text" @click="EditStatus(scope.row, 2)">下 架</a>
              </template>
            </template>
          </el-table-column>
        </el-table>
      </DmTable>
    </DmData>
    <add-edit ref="addEdit" @success="initPage" />
    <InfoPage ref="infoDialog" />
    <TagDialog ref="tagDialog" @success="initPage" />
    <TypeDialog ref="typeDialog" @success="initPage" />
  </PageHeader>
</template>
<script>
import { mapGetters } from 'vuex'
import consoleData from '@/mixins/consoleData'
import TagDialog from './components/tag'
import TypeDialog from './components/type'
import AddEdit from './components/add-edit'
import InfoPage from './components/info'
export default {
  components: { AddEdit, TagDialog, TypeDialog, InfoPage },
  mixins: [consoleData],
  data() {
    return {
      API_INDEX: '/articleApi/GetArticlePageList',
      API_METHOD: 'post',
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
      'hall_key'
    ])
  },
  watch: {
    async hall_key(val) {
      this.initPage()
      await Promise.all([
        this.$store.dispatch('system/GetArticleCategoryList'),
        this.$store.dispatch('system/GetArticleLabelList')
      ])
    }
  },
  async created() {
    await Promise.all([
      this.$store.dispatch('system/GetArticleCategoryList'),
      this.$store.dispatch('system/GetArticleLabelList')
    ])
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
