<template>
  <div id="app" :class="[{'opacity-box ': is_expire}]">
    <router-view />
  </div>
</template>

<script>
import { is_expire_date } from '@/utils'
export default {
  name: 'App',
  computed: {
    is_expire() {
      return is_expire_date()
    }
  }
}
</script>

<style lang="scss" scoped>
.opacity-box {
  opacity: 0;
}
</style>
