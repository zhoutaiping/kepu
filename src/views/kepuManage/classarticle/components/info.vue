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
  max-width: 380px;
}
.title {
  display: flex;
  align-items: center;
  height: 60px;
  background: #ffffff;
  border-radius: 6px;
  font-size: 16px;
  color: #2c2c2c;
  letter-spacing: 0;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
  padding: 0 0 0 20px;
}
.info-dialog {
  .el-dialo {
    &__body {
      background: #f3f3f3;
    }
  }
}
.mt {
  margin-top: 10px;
  border: 1px solid #d5d5d5;
  border-radius: 6px;
  border-radius: 6px;
  padding: 5px;
  color: #2c2c2c;
  font-size: 12px;
}
.item-box {
  display: flex;
  margin: 20px 0 0;
  .center {
    display: inline-block;
    margin-left: 20px;
    background: #FFFFFF;
    border: 1px solid #d5d5d5;
    flex: 1;
    color: #2c2c2c;
    min-height: 48px;
    align-items: center;
  }
}
.tracking-bubble-box {
    position: relative;
    float: left;
    width: 210px;
    margin-left: 10px;
    border: 1px solid #F1F1F1;
    box-sizing: border-box;
    border-radius: 4px;
    flex-grow: 1;
    -webkit-flex-grow: 1;

}
.bubble-angle {
    position: absolute;
    width: 10px;
    height: 10px;
    background-color: #F9F9F9;
    border: 1px solid #F1F1F1;
    left: -7px;
    transform: rotate(45deg);
    filter: progid:DXImageTransform.Microsoft.Matrix(sizingMethod='auto expand', M11=0.866025404, M12=0.8, M21=-0.8, M22=0.866025404) ;
    top: 15px;
}
.bubble-content {
    position: relative;
    z-index: 95;
    background-color: #FFFFFF;
    border-radius: 4px;
    padding: 10px;
}

</style>
<template>
  <div>
    <DmDialog
      ref="Dialog"
      :title="title"
      :footer="false"
      width="414px"
      class="info-dialog"
    >
      <DmScroll>
        <div>
          <div class="title">
            <THImg />
            <div style="display:inline-block;margin-left:20px;font-size: 18px;">
              {{ form.Title }}
            </div>
          </div>
          <div class="mt">
            <p style="text-align:center;font-size:14px;margin-bottom:5px;">
              课前小贴士
            </p>
            点击语音进度条，即可收听课程；<br>
            如果点击语音没有声音，说明网络情况不是很理想，请耐心等候，或者再次点击语言进度条；
          </div>
          <div v-for="item in form.ArticleContentList" :key="item.Id">
            <template v-if="item.ContentType === 1 && item.Content !== ''">
              <div class="item-box">
                <THImg />
                <div class="center tracking-bubble-box">
                  <div class="bubble-angle" />
                  <div class="bubble-content">
                    {{ form.Title }}
                  </div>
                </div>
              </div>
            </template>
            <template v-if="item.ContentType === 2 && item.Content !== ''">
              <img class="content-img" :src="item.Content">
            </template>
            <template v-if="item.ContentType === 3 && item.Content !== ''">
              <video
                class="content-img"
                :src="item.Content"
                controls=""
              />
            </template>
            <template v-if="item.ContentType === 4 && item.Content !== ''">
              <div class="item-box">
                <THImg />
                <div class="center tracking-bubble-box">
                  <div class="bubble-angle" />
                  <div class="bubble-content">
                    <a :href="item.Content">{{ item.Content }}</a>
                  </div>
                </div>
              </div>
            </template>
            <template v-if="item.ContentType === 5 && item.Content !== ''">
              <aplayer
                :autoplay="false"
                :music="{
                  title: '科普',
                  artist: '小天使',
                  src: item.Content,
                  autoplay:false,
                  pic: 'https://static.getfitvip.com/kepulogo.png'
                }"
              />
            </template>
          </div>
        </div>
      </DmScroll>
    </DmDialog>
  </div>
</template>
<script>
import THImg from '@/views/kepuManage/th'
import Aplayer from 'vue-aplayer'
export default {
  components: { THImg, Aplayer },
  data() {
    return {
      form: {},
      title: '预览'
    }
  },
  methods: {
    handleOpen(data) {
      this.$refs.Dialog.handleOpen()
      this.GetArticleDetail(data)
    },

    async GetArticleDetail(data) {
      await this.Fetch.post('/articleApi/GetArticleDetail', { Id: data.Id })
        .then(res => {
          const data = JSON.parse(JSON.stringify(res))
          this.form = Object.assign({}, data)
        })
        .catch(e => {})
    }
  }
}
</script>
