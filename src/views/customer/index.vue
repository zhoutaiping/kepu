<template>
  <blank-layout :app-menu="tabs">
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
            title: '列表'
          },
          {
            key: '2',
            title: '用户'
          },
          {
            key: '3',
            title: '配置'
          }
        ],
        active: () => {
          switch (this.$route.path) {
            case '/customer/list':
              return '1'
            case '/customer/list-user':
              return '2'
            case '/customer/list-config':
              return '3'
            default:
              return '1'
          }
        },
        callback: (key) => {
          switch (key) {
            case '1':
              this.$router.push('/customer/list')
              break
            case '2':
              this.$router.push('/customer/list-user')
              break
            case '3':
              this.$router.push('/customer/list-config')
              break
            default:
              this.$router.push('/workplace')
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
