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
      <div style="mini-height:200px;">
        <div style="margin:0 0 10px;">
          <span>消息标签：</span>
          <el-select v-model="CircleLabeId" clearable placeholder="标签" class="input-box" size="small" @change="changeValue">
            <el-option v-for="_ in CircleLabel" :key="_.Id" :label="_.LabelName" :value="_.Id" />
          </el-select>
        </div>
        <template v-if="List.length" style="min-height:200px">
          <div v-for="(_, _index) in List" :key="_index" v-loading="loading">
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
                        style="padding:6px;"
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
                  {{ _.CreateTimeString }}
                </div>
                <div
                  v-if="_.CircleCommentList && _.CircleCommentList.length > 0"
                  class="bg-text"
                >
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
      this.ArticleCategoryId = data.ArticleCategoryId
      this.GetCircleAllPages('', data.ArticleCategoryId)
    },
    changeValue() {
      this.pagination.page = 1
      this.GetCircleAllPages(this.CircleLabeId, this.ArticleCategoryId)
    },
    async GetCircleAllPages(CircleLabeId, ArticleCategoryId) {
      this.loading = true
      const params = {
        CircleLabeId: CircleLabeId,
        ArticleCategoryId: ArticleCategoryId,
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
