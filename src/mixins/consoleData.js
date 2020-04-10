export default {
  data() {
    return {
      loading: false,
      multipleSelection: [],
      fetch: this.Fetch,
      bindParams: {},
      params: {},
      list: [],
      responseData: {}

    }
  },

  computed: {
    multipleActionDisable() {
      return this.multipleSelection.length === 0
    }
  },

  methods: {
    fetchInit(params = {}) {
      Object.assign(this.bindParams, params)
      if (this.$refs.DmData) this.$refs.DmData.initPage()
    },

    handleSearch() {
      this.$nextTick(() => {
        this.$refs.DmData.initPage()
      })
    },

    handleSelectionChange(val) {
      this.multipleSelection = val
    },

    formatResponse(response) {
      return response
    },

    formatParams(params) {
      const keys = Object.keys(JSON.parse(JSON.stringify(params)))
      const data = JSON.parse(JSON.stringify(params))
      keys.forEach(i => {
        if (data[i] === '') delete data[i]
      })
      return data
    },

    async fetchList(params = {}) {
      const { DmData } = this.$refs
      // Object.assign(this.bindParams, params)
      params = {
        ...params,
        ...DmData.getParams(),
        ...this.params,
        ...this.bindParams
      }
      const { API_METHOD = 'get' } = this
      params = this.formatParams(params)

      this.loading = true
      let total
      try {
        const response = await this.fetch[API_METHOD](this.API_INDEX, params)
        const data = this.formatResponse(response)
        const { list, List } = data
        total = Number(data.total) || Number(data.count) || Number(data.Count) || 0
        this.list = list || List
        this.responseData = response
      } finally {
        this.loading = false
      }
      DmData.init({ total })
    }
  }
}
