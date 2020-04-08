<style lang="scss" scoped>
.form-input {
  width: 400px;
}
</style>
<template>
  <div>
    <DmDialogDrawer
      ref="Dialog"
      :fetch-submit="fetchSubmit"
      :title="mode ==='Create'?'添加文章':'编辑'"
      width="600px"
    >
      <el-form ref="form" :model="form" :rules="rules" label-width="90px" label-position="left">
        <el-form-item label="标题" prop="Title">
          <el-input v-model="form.Title" placeholder="请输入标题" class="form-input" />
        </el-form-item>
        <el-form-item label="商品分类" prop="articleCategoryId">
          <el-select v-model="form.articleCategoryId" placeholder="" class="form-input">
            <el-option v-for="item in ArticleCategoryList" :key="item.Id" :label="item.Name" :value="item.Id" />
          </el-select>
        </el-form-item>
        <el-form-item label="商品分类" prop="labelList">
          <el-select v-model="form.labelList" multiple placeholder="" class="form-input">
            <el-option v-for="item in ArticleLabelList" :key="item.ArticleLableId" :label="item.ArticleLableName" :value="item.ArticleLableId" />
          </el-select>
        </el-form-item>
        <el-form-item label="文章Logo" prop="articleLogo">
          <span>
            缩略图请上传 大小小于100k 图片尺寸：宽220px*高180px
          </span>
        </el-form-item>
        <el-form-item label="分享图片" prop="articleShareImage">
          <span>
            分享图请上传 大小小于200k 图片尺寸：宽380px*高420px
          </span>
        </el-form-item>
      </el-form>
    </DmDialogDrawer>
  </div>
</template>
<script>
import { mapGetters } from 'vuex'
export default {
  data() {
    return {
      mode: 'Create',
      open: false,
      submitLoading: false,
      defalut: {
        'id': '',
        'hallId': '', // 店铺
        'title': '', // 标题
        'articleLogo': '', // logimg
        'articleShareImage': '', // 分享 img
        'articleType': 1,
        'templateId': '', // 模板ID
        'articleDescribe': '',
        'articleCategoryId': '', // 文章分类
        'details': '',
        'labelList': [], // 文章标签列表
        'articleContentList': [], // 文章 list
        'articleGroupBuyingList': [] // 文章内容列表
      },
      form: {},
      rules: {
        LabelName: [{ required: true, message: '请输入标题名称' }],
        articleCategoryId: [{ required: true, message: '请选择文章分类' }],
        labelList: [],
        details: [],
        articleLogo: [],
        articleShareImage: [],
        articleContentList: [],
        articleGroupBuyingList: []

      }
    }
  },
  computed: {
    ...mapGetters([
      'ArticleLabelList',
      'ArticleCategoryList',
      'hall_key'
    ])
  },
  methods: {
    handleOpen(data, type = 'Create') {
      this.$refs.Dialog.handleOpen()
      this.open = true
      if (this.$refs.form) this.$refs.form.resetFields()
      this.form = Object.assign({}, JSON.parse(JSON.stringify(this.defalut)))
      if (type !== 'Create') this.GetArticleDetail(data)
    },
    GetArticleDetail(data) {

    },

    fetchSubmit() {
    // const form = {}
      try {
      // if (this.mode === 'Create') {
      //   delete form.id
      //   await this.InvokeAllApi.post('/fd/V4/dispatch.template.rule.save', form)
      // } else {
      //   form.id = this.id
      //   await this.InvokeAllApi.post(`/fd/V4/dispatch.template.rule.save`, form)
      // }
        this.$refs.Dialog.handleClose()
      } catch (e) {
        throw new Error()
      }
      this.Message('ACTION_SUCCESS')
    }

  }
}
</script>
