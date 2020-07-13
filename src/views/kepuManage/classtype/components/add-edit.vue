<style lang="scss" scoped>
.input-box {
  width: 300px;
}
.img-box {
  border: 1px solid $--border-color-light;
  margin-bottom: 5px;
}
.item-box {
  margin-bottom: 5px;
}
</style>
<template>
  <div>
    <DmDialog
      ref="Dialog"
      :close-on-click-modal="false"
      :fetch-submit="fetchSubmit"
      :title="model === 'Create' ? '添加':'编辑'"
      width="600px"
      aside
    >
      <DmScroll>
        <el-form ref="form" :model="form" :rules="rules" label-position="left" label-width="90px" size="small">
          <el-form-item label="商品名称" prop="Name">
            <el-input v-model="form.Name" placeholder="" class="input-box" />
          </el-form-item>
          <el-form-item label="商品规格" prop="Rule">
            <el-input v-model="form.Rule" placeholder="" class="input-box" />
          </el-form-item>
          <el-form-item label="媒体售价" prop="MediaPrcie">
            <el-input-number v-model="form.MediaPrcie" controls-position="right" label="" class="input-box input-number" />
          </el-form-item>
          <el-form-item label="Key码数量" prop="KeyCodeCount">
            <el-input-number v-model="form.KeyCodeCount" :disabled="model !== 'Create'" controls-position="right" :min="0" label="Key码数量" class="input-box input-number" />
          </el-form-item>
          <el-form-item label="热门指数" prop="IsHot">
            <el-input-number v-model="form.IsHot" controls-position="right" :min="0" label="热门指数" class="input-box input-number" />
          </el-form-item>
          <el-form-item label="排序" prop="Sort">
            <el-input-number v-model="form.Sort" controls-position="right" :min="1" label="排序" class="input-box input-number" />
          </el-form-item>
          <el-form-item label="详情" prop="Content" class="item-box">
            <el-input
              v-model="form.Content"
              type="textarea"
              :rows="2"
              placeholder="详情"
              class="input-box"
            />
          </el-form-item>
          <el-form-item label="商品Logo" prop="Logo">
            <template v-if="form.Logo">
              <div class="input-box img-box">
                <img :src="form.Logo" width="60" height="60">
                <div style="float:right">
                  <a :href="form.Logo" download target="_blank"><i class="el-icon-download" /></a>
                  <a-popconfirm
                    title="是否确认删除?"
                    ok-text="是"
                    cancel-text="否"
                    @confirm="form.Logo = ''"
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
                商品Logo请上传 大小小于100k 图片为正方形
              </span>
            </template>
          </el-form-item>
          <el-form-item v-show="HallGoodsImageList.length< 10" label="商品图片" prop="HallGoodsImageList" class="item-box">
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
              <span>
                <i class="el-icon-info color--primary" />
                商品图片不超过10张
              </span>
            </div>
          </el-form-item>
          <DmTable v-show="HallGoodsImageList.length>0">
            <el-table :data="form.HallGoodsImageList">
              <el-table-column label="序号" type="index" width="55" />
              <el-table-column label="图片">
                <template slot-scope="scope">
                  <img :src="scope.row.ImageUrl" width="40" height="40">
                  <div style="float:right">
                    <a :href="scope.row.ImageUrl" download target="_blank"><i class="el-icon-download" /></a>
                    <a-popconfirm
                      title="是否确认删除?"
                      ok-text="是"
                      cancel-text="否"
                      @confirm="remove(scope.$index)"
                    >
                      <a style="margin:0 20px;"><i class="el-icon-delete" /></a>
                    </a-popconfirm>
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
    const validateNumber = (rule, value, callback) => {
      if (Number.isInteger(Number(value))) {
        callback()
      } else {
        callback(new Error('请输入正整数'))
      }
    }
    return {
      url: '',
      keyList: [],
      form: {
        Id: '',
        Name: '',
        Rule: '',
        MediaPrcie: '',
        Content: '',
        Logo: '',
        KeyCodeCount: 0,
        Sort: 1,
        IsHot: 0,
        HallGoodsImageList: [], // [{ImageUrl:""}]
        hallId: ''
      },
      Type: [],
      rules: {
        Name: [{ required: true, message: '请输入商品名称' }],
        Rule: [{ required: true, message: '请输入商品规格' }],
        MediaPrcie: [{ required: true, message: '请输入售价' }],
        GoodsType: [],
        Content: [],
        Logo: [{ required: true, message: '请上传图片' }],
        IsHot: [{ required: true, message: '' }],
        Sort: [
          { required: true, validator: validateNumber }
        ],
        KeyCodeCount: [{ required: true, validator: validateNumber }],
        HallGoodsImageList: []
      },
      model: ''
    }
  },
  computed: {
    ...mapGetters([
      'hall_key'
    ]),
    HallGoodsImageList() {
      let list = []
      list = this.form.HallGoodsImageList.map((i, _index) => {
        return { ImageUrl: i.ImageUrl, ImageSort: _index + 1 }
      })
      return list
    }
  },
  methods: {
    handleOpen(data, model = 'Create') {
      this.$nextTick(e => {
        this.$refs.Dialog.handleOpen()
        this.model = model
        if (this.$refs.form) this.$refs.form.resetFields()
        this.form.hallId = this.hall_key
        if (model !== 'Create' && data) {
          this.getDetail(data)
        }
      })
    },

    async getDetail(rowData) {
      const data = await this.Fetch.post('/PopularScienceapi/GetDetail', { ID: rowData.Id })
      this.form = Object.assign({}, JSON.parse(JSON.stringify(data)))
    },

    remove(index) {
      this.form.HallGoodsImageList.splice(index, 1)
    },
    handlePreview(file) {
    },
    async logoUpload(file, fileList) {
      const params = new FormData()
      params.append('Logo', file.raw)
      await this.UploadImage(params, 'Logo')
    },

    async GoodUpload(file, fileList) {
      const params = new FormData()
      params.append('share', file.raw)
      await this.UploadImage(params, 'HallGoodsImageList')
    },

    UploadImage(params, key) {
      this.$store.dispatch('system/UploadImage', params).then(res => {
        if (key === 'HallGoodsImageList') {
          if (res) {
            this.form.HallGoodsImageList.push({
              ImageUrl: res
            })
            this.Message('ACTION_SUCCESS')
            console.log(this.HallGoodsImageList)
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
      form.HallGoodsImageList = this.HallGoodsImageList
      let api = ''
      if (this.model === 'Create') {
        api = '/PopularScienceapi/Add'
      } else {
        api = '/PopularScienceapi/Update'
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
