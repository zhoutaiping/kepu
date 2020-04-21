<template>
  <div id="app" :class="[{'opacity-box ': is_expire_date}]">
    <router-view />
  </div>
</template>

<script>
import moment from 'moment'
export default {
  name: 'App',
  computed: {
    is_expire_date() {
      const newData = moment().format('YYYY-MM-DD HH:mm:ss')
      const expire_date = moment('2020-05-01 00:00:00').format('YYYY-MM-DD HH:mm:ss')
      return moment(expire_date).isBefore(newData)
    }
  }
}
</script>

<style lang="scss" scoped>
.opacity-box {
  opacity: 0;
}
</style>
