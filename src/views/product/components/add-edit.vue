<style lang="scss" scoped>
.input-box {
  width: 300px;
}
.img-box {
  border: 1px solid $--border-color-light;
  margin-bottom: 5px;
}
</style>
<template>
  <div>
    <DmDialog
      ref="Dialog"
      :fetch-submit="fetchSubmit"
      :title="model === 'Create' ? '添加':'编辑'"
      width="600px"
      aside
    >
      <el-form ref="form" :model="form" :rules="rules" label-position="left" label-width="90px" size="small">
        <el-form-item label="商品名称" prop="Name">
          <el-input v-model="form.Name" placeholder="" class="input-box" />
        </el-form-item>
        <el-form-item label="商品规格" prop="Rule">
          <el-input v-model="form.Rule" placeholder="" class="input-box" />
        </el-form-item>
        <el-form-item label="重量(斤)" prop="Catty">
          <el-input-number v-model="form.Catty" controls-position="right" :min="1" label="重量" class="input-box input-number" />
        </el-form-item>
        <el-form-item label="售价" prop="MediaPrcie">
          <el-input-number v-model="form.MediaPrcie" controls-position="right" label="" class="input-box input-number" />
        </el-form-item>
        <el-form-item label="市场价" prop="ReferencePrice">
          <el-input-number v-model="form.ReferencePrice" controls-position="right" label="" class="input-box input-number" />
        </el-form-item>
        <el-form-item label="详情" prop="Content">
          <el-input
            v-model="form.Content"
            type="textarea"
            :rows="2"
            placeholder="详情"
            class="input-box"
          />
        </el-form-item>
        <el-form-item label="商品缩略图" prop="logo">
          <template v-if="form.logo">
            <div class="input-box img-box">
              <img :src="form.logo" width="60" height="60">
              <div style="float:right">
                <a :href="form.logo" download target="_blank"><i class="el-icon-download" /></a>
                <a-popconfirm
                  title="是否确认删除?"
                  ok-text="是"
                  cancel-text="否"
                  @confirm="form.logo = ''"
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
              商品缩略图请上传 大小小于100k 图片为正方形
            </span>
          </template>
        </el-form-item>
        <el-form-item label="转发封面" prop="shareImage">
          <template v-if="form.shareImage">
            <div class="input-box img-box">
              <img :src="form.shareImage" width="60" height="60">
              <div style="float:right">
                <a :href="form.shareImage" download target="_blank"><i class="el-icon-download" /></a>
                <a-popconfirm
                  title="是否确认删除?"
                  ok-text="是"
                  cancel-text="否"
                  @confirm="form.shareImage = ''"
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
              转发封面请上传 大小小于100k 图片为正方形
            </span>
          </template>
        </el-form-item>
        <el-form-item label="商品图片" prop="hallGoodsImageList">
          <div style="margin: 0 0 10px;">
            <el-upload
              ref="upload"
              :action="''"
              :on-preview="handlePreview"
              :on-change="GoodUpload"
              :file-list="keyList"
              :show-file-list="false"
              :auto-upload="false"
              class="upload-demo"
            >
              <el-button slot="trigger" size="mini" icon="el-icon-upload2">选择图片</el-button>
            </el-upload>
          </div>
          <div v-for="(item, index) in form.hallGoodsImageList" :key="index" class="input-box img-box">
            <img :src="item.ImageUrl" width="60" height="60">
            <div style="float:right">
              <a :href="item.ImageUrl" download target="_blank"><i class="el-icon-download" /></a>
              <a-popconfirm
                title="是否确认删除?"
                ok-text="是"
                cancel-text="否"
                @confirm="remove(index)"
              >
                <a style="margin:0 20px;"><i class="el-icon-delete" /></a>
              </a-popconfirm>
            </div>
          </div>
        </el-form-item>
      </el-form>
    </DmDialog>
  </div>
</template>
<script>
import { mapGetters } from 'vuex'
export default {
  data() {
    return {
      url: '',
      keyList: [],
      defalut: {
        Id: '',
        Name: '',
        Rule: '',
        Catty: '',
        MediaPrcie: '',
        ReferencePrice: '',
        GoodsType: 0,
        Content: '',
        logoImageUpload: null,
        shareImageUpload: null,
        upload: null,
        logo: '',
        shareImage: '',
        hallGoodsImageList: [], // [{ImageUrl:""}]
        hallId: ''
      },
      form: {},
      rules: {
        Name: [{ required: true, message: '请输入商品名称' }],
        Rule: [{ required: true, message: '请输入商品规格' }],
        Catty: [],
        MediaPrcie: [{ required: true, message: '请输入售价' }],
        ReferencePrice: [],
        GoodsType: [],
        Content: [],
        logo: [],
        shareImage: [],
        hallGoodsImageList: []
      },
      model: ''
    }
  },
  computed: {
    ...mapGetters([
      'hall_key'
    ])
  },
  methods: {
    handleOpen(data, model = 'Create') {
      this.$refs.Dialog.handleOpen()
      this.model = model
      if (this.$refs.form) this.$refs.form.resetFields()
      this.defalut.hallId = this.hall_key
      this.form = Object.assign({}, JSON.parse(JSON.stringify(this.defalut)))
      if (model !== 'Create' && data) {
        const rowData = JSON.parse(JSON.stringify(data))
        rowData.logo = data.Logo
        rowData.shareImage = data.ShareImage
        rowData.hallGoodsImageList = data.HallGoodsImageList
        delete rowData.Logo
        delete rowData.ShareImage
        delete rowData.HallGoodsImageList
        this.form = Object.assign({}, rowData)
      }
    },
    remove(index) {
      this.form.hallGoodsImageList.splice(index, 1)
    },
    handlePreview(file) {
    },
    async logoUpload(file, fileList) {
      const params = new FormData()
      params.append('logo', file.raw)
      await this.UploadImage(params, 'logo')
    },
    async shareUpload(file, fileList) {
      const params = new FormData()
      params.append('share', file.raw)
      await this.UploadImage(params, 'shareImage')
    },
    async GoodUpload(file, fileList) {
      const params = new FormData()
      params.append('share', file.raw)
      await this.UploadImage(params, 'hallGoodsImageList')
    },

    UploadImage(params, key) {
      this.$store.dispatch('system/UploadImage', params).then(res => {
        if (key === 'hallGoodsImageList') {
          if (res) {
            this.form.hallGoodsImageList.push({
              ImageUrl: res
            })
            this.Message('ACTION_SUCCESS')
          }
        } else {
          if (res) {
            this.form[key] = res
            this.Message('ACTION_SUCCESS')
          }
        }
      }).catch(e => {})
    },

    async fetchSubmit() {
      const form = {
        ...this.form,
        hallId: this.hall_key
      }
      let api = ''
      if (this.model === 'Create') {
        api = '/HallGoodsapi/AddHallGoods'
      } else {
        api = '/HallGoodsapi/UpdateHallGoods'
      }
      this.$refs.form.validate(async(valid) => {
        if (valid) {
          await this.Fetch.post(api, form).then(res => {
            this.Message('ACTION_SUCCESS')
            this.$emit('success')
            this.$refs.Dialog.handleClose()
          }).catch(e => {
            this.$refs.Dialog.afterValidate()
          })
        } else {
          this.$refs.Dialog.afterValidate()
        }
      })
    }
  }
}
</script>
