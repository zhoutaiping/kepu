export default {
  data() {
    return {
      tabKey: 0,
      check: [],
      filtet_column: []
    }
  },
  mounted() {
    if (this.pannel_name) {
      this.check = JSON.parse(localStorage.getItem(this.pannel_name)) || []
    }
    this.initColumn(this.check.length > 0 ? 'set' : 'init', this.check)
    this.init()
  },
  methods: {
    initColumn(type, data) {
      if (type === 'init') {
        this.check = []
        this.column.forEach(item => {
          this.check.push(item.prop)
        })
        this.filtet_column = this.column
      } else if (type === 'set') {
        this.check = data
        const show =
          this.column.filter(item => this.check.indexOf(item.prop) > -1) || []
        this.filtet_column = show
        if (this.pannel_name) {
          localStorage.setItem(this.pannel_name, JSON.stringify(this.check))
        }
      }
      this.tabKey -= -1
    },
    setColumn() {
      if (this.$refs.autoColumn) {
        this.$refs.autoColumn.init(this.column, this.check)
      }
    }
  }
}
