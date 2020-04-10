<style lang="scss" scoped>

</style>
<template>
  <div>
    <el-dialog
      title="编辑"
      :visible.sync="open"
      width="450px"
      :before-close="handleClose"
    >
      <el-form
        ref="form"
        :model="form"
        :rules="rules"
        label-width="100px"
      >
        <el-form-item
          label="店铺有效期"
          prop="validityTime"
        >
          <el-date-picker
            v-model="form.validityTime"
            type="datetime"
            format="yyyy-MM-dd HH:mm:ss"
            value-format="yyyy-MM-ddTHH:mm:ss"
            placeholder="选择日期时间"
            class="form-input"
          />
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="handleClose">取 消</el-button>
        <el-button type="primary" @click="handleSubmit">保 存</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
export default {
  data() {
    return {
      open: false,
      form: {
        validityTime: '',
        userId: ''
      },
      rules: {
        validityTime: [{ required: true, message: '请选择时间' }]
      }
    }
  },
  methods: {
    handleOpen(data) {
      this.open = true
      if (this.$refs.form) this.$refs.form.resetFields()
      const rowData = JSON.parse(JSON.stringify(data))
      this.form = Object.assign({}, {
        validityTime: rowData.ValidityTime,
        userId: rowData.UserId
      })
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
