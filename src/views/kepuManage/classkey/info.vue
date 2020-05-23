<style lang="scss" scoped>
.el-dialo__body {
  background: #f3f3f3;
  padding: 6px;
}
.blur-text {
  color:#0096fe;
}
.bg-text {
  background-color: #f5f5f5;
  padding: 5px;
  border-radius: 4px;
}
.content-img {
  margin: 20px 0;
  max-width: 320px;
  border-radius: 3px;
}
.divider-box {
  margin: 5px 0 !important;
}
.el-radio-button__inner {
  border: 1px solid #DCDFE6;
}
.type-box {
  background-color: #f5f5f5;
  text-align: center;
  min-width: 80px;
  height: 30px;
  margin: 5px 5px 0px 0;
  display: inline-block;
  line-height: 30px;
  color: #3a3a3a;
}

.click-bg {
  background-color: #fff8df;
  color:#ab7b35;
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
      <div v-loading="loading" style="mini-height:200px;">
        <div style="margin:0 0 10px;">
          <a v-for="_ in CircleLabel" :key="_.Id" href="#" :class="['type-box',{'click-bg': isCheck(_.Id)}]" @click="changeValue(_.Id)"># {{ _.LabelName }}</a>
          <a href="#" class="type-box" @click="changeValue('')">全 部</a>
        </div>
        <template v-if="List.length" style="min-height:200px">
          <div v-for="(_, _index) in List" :key="_index">
            <el-row>
              <el-col :span="3">
                <el-avatar
                  shape="square"
                  :size="'medium'"
                  :src="_.UserLogo"
                  class=""
                />
              </el-col>
              <el-col :span="21">
                <h3 class="blur-text">{{ _.UserName }}</h3>
                <div>
                  {{ _.Content }}
                </div>
                <div v-if="_.CircleImageList && _.CircleImageList.length > 0">
                  <el-row>
                    <el-col
                      v-for="(item, item_index) in _.CircleImageList"
                      :key="item_index"
                      :span="8"
                    >
                      <span
                        v-if="_.CircleContentType === 1"
                      >
                        {{ item.ImageUrl }}
                      </span>
                      <img
                        v-if="_.CircleContentType === 2"
                        width="115"
                        height="120"
                        :src="item.ImageUrl"
                        style="padding:6px;border-radius: 10px;"
                      >
                      <video
                        v-if="_.CircleContentType === 3"
                        class="content-img"
                        :src="item.ImageUrl"
                        controls=""
                      />
                    </el-col>
                  </el-row>
                </div>
                <div>
                  <span v-for="i in _.CircleLabelHistoryList" :key="i.Id" style="margin-right:10px;color:#ab7b35;"># {{ i.LabelName }}</span>
                </div>
                <div>
                  {{ _.CreateTimeString }}
                </div>
                <div
                  v-if="_.CircleCommentList && _.CircleCommentList.length > 0"
                  class="bg-text"
                >
                  <div v-show="_.CircleLikedList.length > 0">
                    <span
                      v-for="(i, i_index) in _.CircleLikedList"
                      :key="i_index"
                      class="blur-text"
                    >
                      {{ i.NickName }}
                    </span>
                    <el-divider class="divider-box" />
                  </div>
                  <div
                    v-for="(i, i_index) in _.CircleCommentList"
                    :key="i_index"
                  >
                    <span class="blur-text">{{ i.NickName }}：</span>
                    <template v-if="i.RefererNickName">
                      <span>回复 </span>
                      <span class="blur-text">{{ i.RefererNickName }}</span>
                    </template>
                    <span>{{ i.Content }}</span>
                  </div>
                </div>
              </el-col>
            </el-row>
            <el-divider />
          </div>
        </template>
        <el-pagination
          layout="prev, pager, next"
          background
          hide-on-single-page
          :current-page="pagination.page"
          :page-size="pagination.per_page"
          :total="pagination.total"
          @current-change="currentChange"
        />
      </div>
    </DmDialog>
  </div>
</template>
<script>
import { mapGetters } from 'vuex'
export default {
  data() {
    return {
      form: {},
      title: '详情',
      ArticleCategoryId: '',
      CircleLabeId: '',
      UseUserId: '',
      loading: true,
      List: [],
      pagination: {}
    }
  },
  computed: {
    ...mapGetters([
      'CircleLabel'
    ])
  },
  methods: {
    isCheck(id) {
      return id === this.CircleLabeId
    },
    handleOpen(data) {
      this.$refs.Dialog.handleOpen()
      this.List = []
      this.pagination = Object.assign(
        {},
        {
          total: 0,
          page: 1,
          per_page: 5
        }
      )
      this.CircleLabeId = ''
      this.UseUserId = data.UseUserId
      this.ArticleCategoryId = data.ArticleCategoryId
      this.GetCircleAllPages('', data.ArticleCategoryId)
    },
    changeValue(id) {
      this.CircleLabeId = id
      this.pagination.page = 1
      this.GetCircleAllPages(this.CircleLabeId, this.ArticleCategoryId)
    },
    async GetCircleAllPages(CircleLabeId, ArticleCategoryId) {
      this.loading = true
      const params = {
        CircleLabeId: CircleLabeId,
        ArticleCategoryId: ArticleCategoryId,
        UseUserId: this.UseUserId,
        Pages: this.pagination.page,
        PageSize: this.pagination.per_page
      }
      try {
        const res = await this.Fetch.post(
          '/PopularScienceapi/GetCircleAllPages',
          params
        )
        this.List = res.List || []
        this.pagination.total = res.Count || 0
        this.loading = false
      } catch (error) {
        this.List = []
        this.loading = false
        return true
      }
    },
    currentChange(value) {
      this.pagination.page = value
      this.GetCircleAllPages(this.CircleLabeId, this.ArticleCategoryId)
    }
  }
}
</script>
