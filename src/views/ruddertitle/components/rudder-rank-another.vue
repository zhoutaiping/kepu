<style lang="scss" scoped>
.form-input {
  width: 300px;
}
</style>
<template>
  <div>
    <el-dialog
      title="添加给其他分舵"
      :visible.sync="open"
      width="450px"
      :before-close="handleClose"
    >
      <el-form ref="form" :model="form" :rules="rules" label-width="60px">
        <el-form-item label="店铺" prop="hallId">
          <el-select v-model="form.hallId" placeholder="" class="form-input">
            <el-option v-for="(item,index) in hall_list" :key="index" :label="item.HallName" :value="item.Id" />
          </el-select>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button size="mini" @click="open = false">取 消</el-button>
        <el-button size="mini" type="primary" :loading="submitLoading" @click="handleSubmit">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
import { mapGetters } from 'vuex'
export default {
  data() {
    return {
      open: false,
      submitLoading: false,
      form: {},
      rules: {
        hallId: [{ required: true, message: '请选择店铺' }]
      }
    }
  },
  computed: {
    ...mapGetters([
      'hall_list',
      'hall_key'
    ])
  },
  methods: {
    handleOpen(data) {
      this.open = true
      if (this.$refs.form) this.$refs.form.resetFields()
      this.form = {
        hallId: '',
        rudderRankAnotherNameId: data.Id
      }
    },
    handleClose() {
      this.open = false
    },
    handleSubmit() {
      const params = { ...this.form }
      this.$refs.form.validate(async(valid) => {
        if (valid) {
          await this.Fetch.post('/Systemapi/RudderRankAnotherNamePages', params).then(res => {
            this.Message('ACTION_SUCCESS')
            this.open = false
            this.submitLoading = false
            this.$emit('sucess', 'hallPage')
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
