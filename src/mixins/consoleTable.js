import { deepClone } from '../utils'

export default {
  data() {
    return {
      list: []
    }
  },

  methods: {
    handleCheckRow(index) {
      let op = true
      this.rowKey.forEach(key => {
        const keyIndex = `${key}-${index}`
        if (this.$refs[keyIndex] && this.$refs[keyIndex].validate) {
          console.log(keyIndex)
          if (!this.$refs[keyIndex].validate()) {
            op = false
          }
        }
      })
      return op
    },

    handleRowClearValidate(index) {
      this.rowKey.forEach(key => {
        const keyIndex = `${key}-${index}`
        if (this.$refs[keyIndex] && this.$refs[keyIndex].clearValidate) {
          this.$refs[keyIndex].clearValidate()
        }
      })
    },

    async handleCheckList() {
      const list = this.list
      for (let i = 0; i < list.length; i++) {
        const ret = await this.handleCheckRow(i)
        if (!ret) throw new Error()
      }
    },

    async handleRowAdd() {
      if (this.list.length > 0 && !this.handleCheckRow(this.list.length - 1)) return
      this.list.push(deepClone(this.row))
    },

    handleRowDelete(index) {
      this.list.splice(index, 1)
    },

    handleTableReset(index) {
      this.list[index] = deepClone(this.row)
    },

    handleRowUp(index) {
      if (index === 0) return
      const item = this.list.splice(index, 1)[0]
      this.list.splice(index - 1, 0, item)
    },

    handleRowDown(index) {
      const item = this.list.splice(index, 1)[0]
      this.list.splice(index + 1, 0, item)
    },

    handleRowTop(index) {
      const item = this.list.splice(index, 1)[0]
      if (index === 0) return
      this.list.splice(index - 1, 0, item)
    },

    handleRowButton(index) {
      const item = this.list.splice(index, 1)[0]
      this.list.splice(index + 1, 0, item)
    }
  }
}
