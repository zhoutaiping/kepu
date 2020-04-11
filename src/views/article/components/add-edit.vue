<style lang="scss" scoped>
.form-input {
  width: 400px;
}
.form-item {
  margin-bottom: 5px;
}
.upload-demo {
  display: inline-block;
  width: 550px;
}
</style>
<template>
  <div>
    <DmDialog
      ref="Dialog"
      :fetch-submit="fetchSubmit"
      :title="model === 'Create' ? '添加':'编辑'"
      width="700px"
      aside
    >
      <DmScroll>
        <el-form ref="form" :model="form" :rules="rules" label-width="90px" label-position="left">
          <el-form-item label="标题" prop="Title">
            <el-input v-model="form.Title" placeholder="请输入标题" class="form-input" />
          </el-form-item>
          <el-form-item v-show="false" label="文章分类" prop="ArticleCategoryId">
            <el-select v-model="form.ArticleCategoryId" placeholder="" class="form-input" @change="(val)=>{return form.Type = val}">
              <el-option v-for="item in ArticleCategoryList" :key="item.Id" :label="item.Name" :value="item.Id" />
            </el-select>
          </el-form-item>
          <el-form-item v-show="false" label="文章分类" prop="LabelList">
            <el-select v-model="form.LabelList" multiple placeholder="" class="form-input">
              <el-option v-for="item in ArticleLabelList" :key="item.ArticleLableId" :label="item.ArticleLableName" :value="item.ArticleLableId" />
            </el-select>
          </el-form-item>
          <el-form-item label="文章Logo" prop="ArticleLogo">
            <template v-if="form.ArticleLogo">
              <div class="form-input">
                <img :src="form.ArticleLogo" width="60" height="60">
                <div style="float:right">
                  <a :href="form.ArticleLogo" download target="_blank"><i class="el-icon-download" /></a>
                  <a-popconfirm
                    title="是否确认删除?"
                    ok-text="是"
                    cancel-text="否"
                    @confirm="form.ArticleLogo = ''"
                  >
                    <a style="margin:0 20px;"><i class="el-icon-delete" /></a>
                  </a-popconfirm>
                </div>
              </div>
            </template>
            <template v-else>
              <div>
                <el-upload
                  ref="upload"
                  :action="''"
                  :on-preview="handlePreview"
                  :on-change="logoUpload"
                  :file-list="keyList"
                  :show-file-list="false"
                  :auto-upload="false"
                  class="upload-demo"
                >
                  <el-button slot="trigger" size="mini" icon="el-icon-upload2">选择图片</el-button>
                </el-upload>
              </div>
              <span>
                <i class="el-icon-info color--primary" />
                缩略图请上传 大小小于100k 图片尺寸：宽220px*高180px
              </span>
            </template>
          </el-form-item>
          <el-form-item label="分享图片" prop="ArticleShareImage">
            <template v-if="form.ArticleShareImage">
              <div class="form-input">
                <img :src="form.ArticleShareImage" width="60" height="60">
                <div style="float:right">
                  <a :href="form.ArticleShareImage" download target="_blank"><i class="el-icon-download" /></a>
                  <a-popconfirm
                    title="是否确认删除?"
                    ok-text="是"
                    cancel-text="否"
                    @confirm="form.ArticleShareImage = ''"
                  >
                    <a style="margin:0 20px;"><i class="el-icon-delete" /></a>
                  </a-popconfirm>
                </div>
              </div>
            </template>
            <template v-else>
              <div class="form-input">
                <el-upload
                  ref="upload"
                  :action="''"
                  :on-preview="handlePreview"
                  :on-change="shareUpload"
                  :file-list="keyList"
                  :show-file-list="false"
                  :auto-upload="false"
                  class="upload-demo"
                >
                  <el-button slot="trigger" size="mini" icon="el-icon-upload2">选择图片</el-button>
                </el-upload>
              </div>
              <span>
                <i class="el-icon-info color--primary" />
                分享图请上传 大小小于200k 图片尺寸：宽380px*高420px
              </span>
            </template>
          </el-form-item>
          <el-form-item label="添加文章内容" label-width="120" prop="ArticleContentList" class="form-item" />
          <a-button v-for="item in ContentType" :key="item.value" type="primary" style="margin:5px 5px 5px 0;" @click="add(item.value)">{{ item.label }}</a-button>
          <DmTable :loading="tabloading">
            <el-table :data="form.ArticleContentList">
              <el-table-column label="上传内容">
                <template slot-scope="scope">
                  <div v-if="Number(scope.row.ContentType) === 1">
                    <el-input
                      v-model="scope.row.Content"
                      type="textarea"
                      :rows="2"
                      placeholder="文章内容"
                      class="upload-demo"
                    />
                    <div style="float:right;line-height:25px;">
                      <a-popconfirm
                        title="是否确认删除?"
                        ok-text="是"
                        cancel-text="否"
                        @confirm="form.ArticleContentList.splice(scope.$index, 1)"
                      >
                        <a style="margin:0 20px;"><i class="el-icon-delete" /></a>
                      </a-popconfirm>
                    </div>
                  </div>
                  <div v-else-if="Number(scope.row.ContentType) === 2">
                    <template v-if="scope.row.Content">
                      <img :src="scope.row.Content" width="48" height="48">
                      <div style="float:right;line-height:48px;">
                        <a :href="scope.row.Content" download target="_blank"><i class="el-icon-download" /></a>
                        <a-popconfirm
                          title="是否确认删除?"
                          ok-text="是"
                          cancel-text="否"
                          @confirm="scope.row.Content = ''"
                        >
                          <a style="margin:0 20px;"><i class="el-icon-delete" /></a>
                        </a-popconfirm>
                      </div>
                    </template>
                    <template v-else>
                      <div>
                        <el-upload
                          :ref="'img_upload_'+ scope.$index"
                          :action="''"
                          :on-preview="handlePreview"
                          :on-change="(e) => {
                            return ContentUpload(e, scope.row)
                          }"
                          :file-list="keyList"
                          :show-file-list="false"
                          :auto-upload="false"
                          class="upload-demo"
                        >
                          <el-button slot="trigger" size="mini" icon="el-icon-upload2">选择图片</el-button>
                        </el-upload>
                        <div style="float:right;line-height:25px;">
                          <a-popconfirm
                            title="是否确认删除?"
                            ok-text="是"
                            cancel-text="否"
                            @confirm="form.ArticleContentList.splice(scope.$index, 1)"
                          >
                            <a style="margin:0 20px;"><i class="el-icon-delete" /></a>
                          </a-popconfirm>
                        </div>
                      </div>
                    </template>
                  </div>
                  <div v-else>
                    <template v-if="scope.row.Content">
                      <div>
                        <svg-icon icon-class="shipin" style="width:48;height:48;" />
                        <span style="width: 500px;overflow: hidden;white-space: nowrap;text-overflow: ellipsis; display: inline-block;line-height: 40px;">{{ scope.row.Content }}</span>
                        <div style="float:right;line-height:48px;">
                          <a :href="scope.row.Content" download target="_blank"><i class="el-icon-download" /></a>
                          <a-popconfirm
                            title="是否确认删除?"
                            ok-text="是"
                            cancel-text="否"
                            @confirm="scope.row.Content = ''"
                          >
                            <a style="margin:0 20px;"><i class="el-icon-delete" /></a>
                          </a-popconfirm>
                        </div>
                      </div>
                    </template>
                    <template v-else>
                      <div>
                        <el-upload
                          :ref="'movie_upload_'+ scope.$index"
                          :action="''"
                          :on-preview="handlePreview"
                          :on-change="(e) => {
                            return movieUpload(e, scope.row)
                          }"
                          :file-list="keyList"
                          :show-file-list="false"
                          :auto-upload="false"
                          class="upload-demo"
                        >
                          <el-button slot="trigger" size="mini" icon="el-icon-upload2">选择视频</el-button>
                        </el-upload>
                        <div style="float:right;line-height:25px;">
                          <a-popconfirm
                            title="是否确认删除?"
                            ok-text="是"
                            cancel-text="否"
                            @confirm="form.ArticleContentList.splice(scope.$index, 1)"
                          >
                            <a style="margin:0 20px;"><i class="el-icon-delete" /></a>
                          </a-popconfirm>
                        </div>
                      </div>
                    </template>
                  </div>
                </template>
              </el-table-column>
            </el-table>
          </DmTable>
        </el-form>
      </DmScroll>
    </DmDialog>
  </div>
</template>
<script>
import { mapGetters } from 'vuex'
export default {
  data() {
    return {
      model: 'Create',
      open: false,
      submitLoading: false,
      tabloading: false,
      keyList: [],
      API_ADD: '/Articleapi/AddArticle',
      API_Detail: '/Articleapi/GetArticleDetail',
      API_Update: '/Articleapi/UpdateArticle',
      defalut: {
        Id: '',

        Title: '', // 标题
        ArticleLogo: '', // logimg
        ArticleShareImage: '', // 分享 img
        ArticleType: 1,
        LabelList: [], // 文章标签列表
        TemplateId: '', // 模板ID
        ArticleDescribe: '',
        ArticleCategoryId: '', // 类型ID
        details: '',
        keys: '',
        ArticleContentList: []
      },
      form: {},
      rules: {
        Title: [{ required: true, message: '请输入标题名称' }],
        ArticleCategoryId: [{ required: true, message: '请选择文章分类' }],
        LabelList: [],
        details: [],
        ArticleLogo: [],
        ArticleShareImage: [],
        ArticleContentList: []
      },
      ContentType: [
        { label: '添加图片', value: 2 },
        { label: '添加视频', value: 3 },
        { label: '添加文章', value: 1 }
      ]
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
      this.model = type
      if (this.$refs.form) this.$refs.form.resetFields()
      this.form = Object.assign({}, JSON.parse(JSON.stringify(this.defalut)))
      if (type !== 'Create') {
        this.GetArticleDetail(data)
      } else {
        this.form.ArticleCategoryId = '2'
        this.form.LabelList = ['22222']
      }
    },
    async GetArticleDetail(data) {
      await this.Fetch.post('/articleApi/GetArticleDetail', { Id: data.Id }).then(res => {
        const data = JSON.parse(JSON.stringify(res))
        data.LabelList = data.LabelList.map(i => { return i.ArticleLableId })
        this.form = Object.assign({}, data)
      }).catch(e => {})
    },

    add(val) {
      this.form.ArticleContentList.push({
        ContentType: val,
        Content: ''
      })
    },

    handlePreview(file) {
    },

    async logoUpload(file, fileList) {
      const params = new FormData()
      params.append('ArticleLogo', file.raw)
      await this.UploadImage(params, 'ArticleLogo')
    },
    async shareUpload(file, fileList) {
      const params = new FormData()
      params.append('ArticleShareImage', file.raw)
      await this.UploadImage(params, 'ArticleShareImage')
    },
    async ContentUpload(file, data) {
      const params = new FormData()
      params.append('Content', file.raw)
      this.tabloading = true
      await this.$store.dispatch('system/UploadImage', params).then(res => {
        if (res) {
          data.Content = res
          this.Message('ACTION_SUCCESS')
        }
        setTimeout(() => {
          this.tabloading = false
        }, 500)
      }).catch(e => { this.tabloading = false })
    },
    async movieUpload(file, data) {
      const params = new FormData()
      params.append('video', file.raw)
      this.tabloading = true
      await this.$store.dispatch('system/UploadVideo', params).then(res => {
        console.log(res)
        if (res) {
          data.Content = res
          this.Message('ACTION_SUCCESS')
        }
        setTimeout(() => {
          this.tabloading = false
        }, 500)
      }).catch(e => { this.tabloading = false })
    },
    UploadImage(params, key) {
      this.$store.dispatch('system/UploadImage', params).then(res => {
        if (res) {
          this.form[key] = res
          this.Message('ACTION_SUCCESS')
        }
      }).catch(e => {})
    },

    fetchSubmit() {
      let api = ''
      if (this.model === 'Create') {
        api = this.API_ADD
      } else if (this.model === 'Edit') {
        api = this.API_Update
      }
      this.$refs.form.validate(async(valid) => {
        if (valid) {
          await this.Fetch.post(api, { ...this.form, hallId: this.hall_key }).then(res => {
            this.Message('ACTION_SUCCESS')
            this.$emit('success')
            this.$refs.Dialog.handleClose()
            this.$refs.Dialog.afterValidate()
          }).catch(e => { this.$refs.Dialog.afterValidate() })
        } else {
          this.$refs.Dialog.afterValidate()
        }
      })
    }

  }
}
</script>
