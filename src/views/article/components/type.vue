<style lang="scss" scoped>
.form-input {
  width: 300px;
}
</style>
<template>
  <div>
    <el-dialog
      title="添加文章分类"
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
          prop="name"
        >
          <el-input
            v-model="form.name"
            prefix-icon="el-icon-collection-tag"
            placeholder="分类名称"
            clearable
            class="form-input"
          />
          <a-button :loading="submitLoading" type="primary" @click="handleSubmit">添 加</a-button>
        </el-form-item>
        <el-form-item label-width="0">
          <DmTable>
            <el-table :data="ArticleCategoryList">
              <el-table-column type="index" label="序号" width="55" />
              <el-table-column label="分类名称" prop="Name" />
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
        description: '',
        name: ''
      },
      form: {},
      rules: {
        description: [],
        name: [{ message: '请输入分类名称' }]
      }
    }
  },
  computed: {
    ...mapGetters([
      'ArticleCategoryList',
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
      this.$store.dispatch('system/GetArticleCategoryList')
      this.open = false
    },
    handleSubmit() {
      const params = {
        hallId: this.hall_key,
        name: this.name,
        description: this.name
      }
      this.$refs.form.validate(async(valid) => {
        if (valid) {
          await this.Fetch.post('/Systemapi/AddArticleCategory', params).then(res => {
            this.Message('ACTION_SUCCESS')
            this.submitLoading = false
            this.$store.dispatch('system/GetArticleCategoryList')
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
