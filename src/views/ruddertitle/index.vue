<style lang="scss" scoped>
.mt {
  margin-top:20px;
}
</style>
<template>
  <div>
    <SystemPage class="mt" @rudderRank="rudderRank" />
    <!-- <HallPage ref="hallPage" class="mt" /> -->
    <RudderRankAnother ref="fudderRankAnother" @sucess="success" />
  </div>
</template>
<script>
import SystemPage from './stytem/index'
import RudderRankAnother from './components/rudder-rank-another'
export default {
  components: { SystemPage, RudderRankAnother },
  methods: {
    success(page = '') {
      if (page !== '' && this.$refs[page]) this.$refs[page].initPage()
    },
    rudderRank(data) {
      this.$refs.fudderRankAnother.handleOpen(data)
    }
  }
}
</script>
