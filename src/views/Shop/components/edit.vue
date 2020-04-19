<style lang="scss" scoped>
.form-input {
  width: 400px;
}
</style>
<template>
  <div>
    <el-dialog
      title="编辑"
      :visible.sync="open"
      width="600px"
      :before-close="handleClose"
    >
      <el-form
        ref="form"
        :model="form"
        :rules="rules"
        size="mini"
        label-width="100px"
      >
        <el-form-item label="店铺名称" prop="ApplyProjectName">
          <el-input v-model="form.ApplyProjectName" placeholder="" class="form-input" />
        </el-form-item>
        <el-form-item label="店铺Logo" prop="ApplyLogo">
          <!-- <template v-if="form.ApplyLogo">
            <div class="form-input">
              <img :src="form.ApplyLogo" width="60" height="60">
              <div style="float:right">
                <a-popconfirm
                  title="是否确认删除?"
                  ok-text="是"
                  cancel-text="否"
                  @confirm="form.ApplyLogo = ''"
                >
                  <a style="margin:0 20px;"><i class="el-icon-delete" /></a>
                </a-popconfirm>
              </div>
            </div>
          </template> -->
          <template>
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
                <el-button v-show="form.ApplyLogo === ''" slot="trigger" size="mini" icon="el-icon-upload2">选择图片</el-button>
                <template v-if="form.ApplyLogo">
                  <img slot="trigger" :src="form.ApplyLogo" width="60" height="60" class="upload-demo">
                  <a-popconfirm
                    title="是否确认删除?"
                    ok-text="是"
                    cancel-text="否"
                    @confirm="form.ApplyLogo = ''"
                  >
                    <a style="margin:0 20px;"><i class="el-icon-delete" /></a>
                  </a-popconfirm>
                </template>
              </el-upload>
            </div>
          </template>
        </el-form-item>
        <el-form-item label="店铺有效期" prop="ValidityTime">
          <el-date-picker
            v-model="form.ValidityTime"
            type="datetime"
            format="yyyy-MM-dd HH:mm:ss"
            value-format="yyyy-MM-ddTHH:mm:ss"
            placeholder="选择日期时间"
            class="form-input"
          />
        </el-form-item>
        <el-form-item label="手机号" prop="ApplyPhone">
          <el-input v-model="form.ApplyPhone" placeholder="" class="form-input" />
        </el-form-item>
        <el-form-item label="微信号" prop="ApplyWxCode">
          <el-input v-model="form.ApplyWxCode" placeholder="" class="form-input" />
        </el-form-item>
        <el-form-item label="店铺简介" prop="ApplyProjectDesc">
          <el-input
            v-model="form.ApplyProjectDesc"
            type="textarea"
            :rows="2"
            placeholder=""
            class="form-input"
          />
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button size="mini" @click="handleClose">取 消</el-button>
        <el-button type="primary" size="mini" @click="handleSubmit">保 存</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
export default {
  data() {
    return {
      open: false,
      keyList: [],
      form: {
        ApplyLogo: '',
        ValidityTime: '',
        ApplyProjectName: '',
        ApplyPhone: '',
        ApplyWxCode: '',
        ApplyProjectDesc: '',
        UserId: ''
      },
      rules: {
        ApplyLogo: [],
        ValidityTime: [{ required: true, message: '请选择时间' }],
        ApplyProjectName: [{ required: true, message: '请输入项目名称' }],
        ApplyPhone: [{ required: true, message: '请输入手机号' }],
        ApplyWxCode: [{ required: true, message: '请输入微信号' }],
        ApplyProjectDesc: []
      }
    }
  },
  methods: {
    handleOpen(data) {
      this.open = true
      if (this.$refs.form) this.$refs.form.resetFields()
      const rowData = JSON.parse(JSON.stringify(data))
      this.form = Object.assign({}, {
        ApplyLogo: rowData.ApplyLogo,
        ValidityTime: rowData.ValidityTime,
        ApplyProjectName: rowData.ApplyProjectName,
        ApplyPhone: rowData.ApplyPhone,
        ApplyWxCode: rowData.ApplyWxCode,
        ApplyProjectDesc: rowData.ApplyProjectDesc,
        UserId: rowData.UserId
      })
    },

    handlePreview(file) {
    },
    async logoUpload(file, fileList) {
      const params = new FormData()
      params.append('ApplyLogo', file.raw)
      await this.UploadImage(params, 'ApplyLogo')
    },

    UploadImage(params, key) {
      this.$store.dispatch('system/UploadImage', params).then(res => {
        if (res) {
          this.form[key] = res
          this.Message('ACTION_SUCCESS')
        }
      }).catch(e => {})
    },

    handleClose() {
      this.open = false
    },
    handleSubmit() {
      this.$refs.form.validate(async(valid) => {
        if (valid) {
          await this.Fetch.post('/ProjectApplyapi/SetMemberValidityTime', { ...this.form }).then(res => {
            this.Message('ACTION_SUCCESS')
            this.$emit('success')
            this.submitLoading = false
            this.open = false
          }).catch(e => {
            this.$refs.form.clearValidate()
            this.submitLoading = false
          })
        } else {
          this.submitLoading = false
        }
      })
    }
  }
}
</script>
