<style lang="scss" scoped>
.infoView {
    height: auto;
    color: #5c5c5c;
    font-size: 14px;
    white-space: pre-wrap;
    margin-top: 50px;
}
.content-img {
  margin: 20px 0;
}
.title {
    color: #000;
    font-size: 18px;
}
</style>
<template>
  <div>
    <DmDialog
      ref="Dialog"
      :title="'预览'"
      :footer="false"
      width="500px"
      aside
    >
      <DmScroll>
        <div class="title">
          {{ form.Title }}
        </div>
        <div v-for="item in form.ArticleContentList" :key="item.Id">
          <template v-if="item.ContentType === 1 && item.Content !==''">
            <div class="infoView">
              {{ item.Content }}
            </div>
          </template>
          <template v-if="item.ContentType === 2 && item.Content !==''">
            <img class="content-img" :src="item.Content">
          </template>
          <template v-if="item.ContentType === 3 && item.Content !==''">
            <video class="content-img" :src="item.Content" controls="" />
          </template>
        </div>
      </DmScroll>
    </DmDialog>
  </div>
</template>
<script>
export default {
  data() {
    return {
      form: {}
    }
  },
  methods: {
    handleOpen(data) {
      this.$refs.Dialog.handleOpen()
      this.GetArticleDetail(data)
    },
    async GetArticleDetail(data) {
      await this.Fetch.post('/articleApi/GetArticleDetail', { Id: data.Id }).then(res => {
        const data = JSON.parse(JSON.stringify(res))
        this.form = Object.assign({}, data)
      }).catch(e => {})
    }

  }
}
</script>
