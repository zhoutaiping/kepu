import { mapState, mapActions } from 'vuex'

export default {
  computed: mapState({
    clientLabel: state => state.client.label,
    clientSelect: state => state.client.select,
    clientLoadingExplorer: state => state.client.loadingExplorer
  }),

  methods: {
    ...mapActions({
      'clientFetchExplorer': 'client/fetchExplorer'
    })
  }
}
