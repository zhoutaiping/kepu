<template>
  <DmDialog
    ref="Dialog"
    :fetch-submit="fetchSubmit"
    :modal="false"
    :title="'修改密码'"
    width="400px"
    style="z-index:2020"
  >
    <el-form ref="form" :model="form" :rules="rules" label-position="left" label-width="90px">
      <el-form-item label="旧密码" prop="Password">
        <el-input v-model="form.Password" type="password" placeholder="" />
      </el-form-item>
      <el-form-item label="新密码" prop="NewPassword">
        <el-input v-model="form.NewPassword" type="password" placeholder="" />
      </el-form-item>
      <el-form-item label="确认密码" prop="NewPasswords">
        <el-input v-model="form.NewPasswords" type="password" placeholder="" />
      </el-form-item>
    </el-form>
  </DmDialog>
</template>
<script>
export default {
  data() {
    return {
      open: false,
      form: {},
      rules: {
        Password: [{ required: true, message: '请输入密码' }],
        NewPassword: [{ required: true, message: '请输入密码' }],
        NewPasswords: [{ required: true, message: '请输入密码' }]
      }
    }
  },
  methods: {
    handleOpen(data) {
      this.$refs.Dialog.handleOpen()
      if (this.$refs.form) this.$refs.form.resetFields()
      this.form = {
        Password: '',
        NewPassword: '',
        NewPasswords: ''
      }
    },
    fetchSubmit() {
      this.$refs.form.validate(async(valid) => {
        if (valid) {
          if (this.form.NewPasswords !== this.form.NewPassword) {
            this.message.warning('密码不一致！')
            this.$refs.Dialog.afterValidate()
            return
          }
          await this.Fetch.post('/cmsApi/UpdatePassword', { ...this.form }).then(res => {
            this.Message('ACTION_SUCCESS')
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
