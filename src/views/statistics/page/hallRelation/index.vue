<style lang="scss" scoped>
.mt {
  margin: 10px 0 0;
}
.mt >>> .el-card__header{
  padding: 10px 10px !important;
}
.chartV2 {
  min-height: 600px;
}
</style>
<template>
  <PageHeader title="关系图">
    <DmAlert class="mt">
      <i class="el-icon-info color--primary" style="margin: 0 5px 0 0;" />所示为店铺网络发展的实时动态图，为方便大家查看会根据店铺粉丝数量做自动展示调整，具体规则如下：
      <div>
        1、粉丝小于10000，单节点最多展示30个分支，带来粉丝大于6则显示昵称
      </div>
      <div>
        2、粉丝小于15000，单节点最多展示20个分支，带来粉丝大于10则显示昵称
      </div>
      <div>
        3、粉丝小于20000，单节点最多展示10个分支，带来粉丝大于20则显示昵称
      </div>
      <div>
        4、粉丝大于20000，单节点最多展示3个分支，带来粉丝大于30则显示昵称
      </div>
    </DmAlert>
    <el-card v-loading="loading" :body-style="{ padding: '10px' }" class="mt">
      <div slot="header" class="clearfix">
        <i class="el-icon-info color--primary" style="margin: 0 10px;">   天使长/小天使</i>
        <i class="el-icon-info color--red" style="margin: 0 10px;">   一级粉丝</i>
        <i class="el-icon-info color--purple" style="margin: 0 20px 0 10px;">   二级粉丝</i>
        <el-button type="text" @click="init"><i class="el-icon-refresh" /></el-button>
      </div>
      <div ref="chartV2" class="chartV2" />
    </el-card>
  </PageHeader>
</template>
<script>
import { mapGetters } from 'vuex'
import echarts from 'echarts'
require('echarts/theme/macarons') // echarts theme
import resize from './mixins/resize'
import dataTool from 'echarts/dist/extension/dataTool.js'
export default {
  mixins: [resize],
  data() {
    return {
      params: {
        showSize: 30, showNameSize: 6
      },
      loading: false,
      chartV2: null
    }
  },
  computed: {
    ...mapGetters([
      'hall_key'
    ])
  },
  watch: {
    hall_key(val) {
      this.init()
    }
  },
  mounted() {
    this.$nextTick(async() => {
      await this.init()
    })
  },
  methods: {
    async init(params = {}) {
      params = {
        hallId: this.hall_key,
        ...this.params
      }
      if (this.hallId === '') return
      this.loading = true
      try {
        const data = await this.FetchJava.get('/netpage/getHallNetV2', params)
        this.chartV2 = data
        var graph = dataTool.gexf.parse(this.chartV2)
        if (!(graph && graph.nodes && graph.nodes)) return
        const dome = this.$refs.chartV2
        const chart = echarts.init(dome, 'macarons')
        graph && graph.nodes && graph.nodes.forEach(function(node) {
          node.itemStyle = {
            color: node.itemStyle.normal.color ? node.itemStyle.normal.color : '#A46AFF'
          }
          node.symbolSize = node.symbolSize ? node.symbolSize : 10
          node.value = node.symbolSize
          node.x = node.y = null
          node.draggable = true
        })

        const option = {
          animation: false,
          animationDuration: 10000,
          animationEasingUpdate: 'cubicOut',
          series: [
            {
              type: 'graph',
              layout: 'force',
              data: graph.nodes,
              links: graph.links,
              roam: true,
              label: {
                normal: {
                  fontSize: '10',
                  show: true,
                  position: 'right'
                }
              },
              force: {
                gravity: 0.03,
                repulsion: 200
              }

            }
          ]
        }
        chart.setOption(option)
        setTimeout(() => {
          this.loading = false
        }, 500)
        return data
      } catch (error) {
        this.loading = false
        return
      }
    }
  }
}
</script>
