<style lang="scss" scoped>
.form-input {
  width: 300px;
}
</style>
<template>
  <div>
    <el-dialog
      title="添加文章标签"
      :visible.sync="open"
      width="650px"
      :before-close="handleClose"
    >
      <el-form
        ref="form"
        :model="form"
        :rules="rules"
        label-width="0px"
      >
        <el-form-item
          label=""
          prop="LabelName"
        >
          <el-input
            v-model="form.LabelName"
            prefix-icon="el-icon-collection-tag"
            placeholder="标签名称"
            clearable
            class="form-input"
          />
          <a-button :loading="submitLoading" type="primary" @click="handleSubmit">添 加</a-button>
        </el-form-item>
        <el-form-item label-width="0">
          <DmTable>
            <el-table :data="ArticleLabelList">
              <el-table-column type="index" label="序号" width="55" />
              <el-table-column label="标签名称" prop="ArticleLableName" />
              <el-table-column v-if="false" label="操作" width="100">
                <template slot-scope="scope">
                  <a-popconfirm
                    title="是否确认删除?"
                    ok-text="是"
                    cancel-text="否"
                    @confirm="deleteRow(scope.row)"
                  >
                    <a class="success-text">删 除</a>
                  </a-popconfirm>
                </template>
              </el-table-column>
            </el-table>
          </DmTable>
        </el-form-item>
      </el-form>
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
      defalut: {
        LabelType: 1,
        LabelName: ''
      },
      form: {},
      rules: {
        LabelName: [{ message: '请输入标签名称' }]
      }
    }
  },
  computed: {
    ...mapGetters([
      'ArticleLabelList', // 标签
      'hall_key'
    ])
  },
  methods: {
    handleOpen(data) {
      this.open = true
      if (this.$refs.form) this.$refs.form.resetFields()
      this.form = Object.assign({}, JSON.parse(JSON.stringify(this.defalut)))
    },
    handleClose() {
      this.$store.dispatch('system/GetArticleLabelList')
      this.open = false
    },
    async deleteRow(data) {
      const params = { id: data.ArticleLableId }
      if (!params.id) {
        return
      } else {
        await this.Fetch.post('/Systemapi/DeleteArticleLabel', params).then(res => {
          this.Message('ACTION_SUCCESS')
          this.$store.dispatch('system/GetArticleLabelList')
        }).catch(e => {})
      }
    },
    handleSubmit() {
      const params = { hallId: this.hall_key, ...this.form }
      this.$refs.form.validate(async(valid) => {
        if (valid) {
          await this.Fetch.post('/Systemapi/AddArticleLabel', params).then(res => {
            this.Message('ACTION_SUCCESS')
            this.submitLoading = false
            this.$store.dispatch('system/GetArticleLabelList')
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
