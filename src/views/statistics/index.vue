<template>
  <blank-layout :app-menu="tabs" title="统计管理">
    <router-view />
  </blank-layout>
</template>
<script>
export default {
  data() {
    return {
      tabs: {
        items: [
          {
            key: '1',
            title: '文章统计'
          },
          {
            key: '2',
            title: '关系图'
          }
        ],
        active: () => {
          switch (this.$route.path) {
            case '/statistics/article':
              return '1'
            case '/statistics/hallRelation':
              return '2'
            default:
              return '1'
          }
        },
        callback: (key) => {
          switch (key) {
            case '1':
              this.$router.push('/statistics/article')
              break
            case '2':
              this.$router.push('/statistics/hallRelation')
              break
          }
        }
      }
    }
  },
  computed: {

  },
  methods: {

  }
}
</script>
