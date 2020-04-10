export default {
  data() {
    return {
      visible: false
    }
  },

  methods: {
    beforeOpen() {},

    handleClose() {
      this.visible = false
    },

    handleOpen(form) {
      this.beforeOpen(form)
      // if (form) this.mode = 'Edit'
      this.visible = true
    }
  }
}
