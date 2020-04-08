<template>
  <div>
    <div style="margin:0 0 10px;">
      <el-button size="mini" type="primary">刷新</el-button>
      <el-button size="mini" type="primary">重置</el-button>
    </div>
    <el-table :data="list" border>
      <!-- <el-table-column type="selection" /> -->
      <el-table-column v-for="(item, index) in column" :key="index" :label="item.label">
        <template slot-scope="scope">
          {{ formartValue(scope.row, item.prop) }}
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>
<script>
export default {
  data() {
    return {
      list: [
        { id: 111, name: 'text', age: 22, desc: '33' }
      ],
      column: [
        { label: 'ID', prop: 'id' },
        { label: 'Name', prop: 'name' },
        { label: 'Age', prop: 'age' },
        { label: 'Desc', prop: 'desc' }
      ]
    }
  },
  methods: {
    formartValue(data, prop) {
      let row_text = data[prop]
      switch (prop) {
        case '222':
          row_text = '222'
          break

        default:
          break
      }
      return row_text
    }
  }
}
</script>
