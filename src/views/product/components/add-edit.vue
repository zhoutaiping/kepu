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
      @submit="handleSubmit"
    >
      <el-form :model="form" :rules="rules" label-position="left" label-width="90px" size="small">
        <el-form-item label="商品名称">
          <el-input v-model="form.Name" placeholder="" class="input-box" />
        </el-form-item>
        <el-form-item label="商品规格">
          <el-input v-model="form.Rule" placeholder="" class="input-box" />
        </el-form-item>
        <el-form-item label="重量(斤)">
          <el-input-number v-model="form.Catty" controls-position="right" :min="1" label="重量" class="input-box input-number" />
        </el-form-item>
        <el-form-item label="售价">
          <el-input-number v-model="form.MediaPrcie" controls-position="right" label="" class="input-box input-number" />
        </el-form-item>
        <el-form-item label="市场价">
          <el-input-number v-model="form.ReferencePrice" controls-position="right" label="" class="input-box input-number" />
        </el-form-item>
        <el-form-item label="详情">
          <el-input
            v-model="form.Content"
            type="textarea"
            :rows="2"
            placeholder="详情"
            class="input-box"
          />
        </el-form-item>
        <el-form-item label="商品缩略图">
          <template v-if="form.logo">
            <div class="input-box img-box">
              <img :src="form.logo" width="48" height="48">
              <div style="float:right">
                <a :href="form.logo" download target="_blank"><i class="el-icon-download" /></a>
                <el-button type="text" style="margin:0 20px;" @click="form.logo = ''"><i class="el-icon-delete" /></el-button>
              </div>
            </div>
          </template>
          <template v-else>
            //
          </template>
        </el-form-item>
        <el-form-item label="转发封面">
          <template v-if="form.shareImage">
            <div class="input-box img-box">
              <img :src="form.shareImage" width="48" height="48">
              <div style="float:right">
                <a :href="form.shareImage" download target="_blank"><i class="el-icon-download" /></a>
                <el-button type="text" style="margin:0 20px;" @click="form.shareImage = ''"><i class="el-icon-delete" /></el-button>
              </div>
            </div>
          </template>
          <template v-else>
            //
          </template>
        </el-form-item>
        <el-form-item label="商品图片">
          <div v-for="(item, index) in form.hallGoodsImageList" :key="index" class="input-box img-box">
            <img :src="item.ImageUrl" width="48" height="48">
            <div style="float:right">
              <a :href="item.ImageUrl" download target="_blank"><i class="el-icon-download" /></a>
              <el-button type="text" style="margin:0 20px;"><i class="el-icon-delete" /></el-button>
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
      rules: {},
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

    async fetchSubmit() {
      const form = {
        ...this.form,
        hallId: this.hall_key
      }
      try {
        if (this.mode === 'Create') {
          await this.Fetch('/HallGoodsapi/AddHallGoods', form)
        } else {
          await this.Fetch('/HallGoodsapi/UpdateHallGood', form)
        }
      } catch (e) {
        throw new Error()
      }
    },
    async handleSubmit(form) {
      this.Message('ACTION_SUCCESS')
      this.$emit('success')
      this.handleClose()
    }
  }
}
</script>
