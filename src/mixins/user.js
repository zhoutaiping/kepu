import { mapState, mapActions } from 'vuex'

export default {
  computed: mapState({
    // isLogin: state => state.user.isLogin,
    userInfo: state => state.user.info
  }),

  methods: {
    ...mapActions(['featchBasicConf'])
  }
}
