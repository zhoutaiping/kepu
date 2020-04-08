import Message from 'ant-design-vue/lib/message'

function message(name, err) {
  let type = 'success'
  // const title = '提示'
  let message = ''

  switch (name) {
    case 'ACTION_SUCCESS':
      message = '操作成功'
      break

    case 'ACTION_ERROR':
      message = '操作失败'
      type = 'error'
      break

    case 'DELETE_SUCCESS':
      message = '删除成功'
      break

    case 'DELETE_ERROR':
      message = '删除失败'
      type = 'error'
      break

    case 'CREATE_SUCCESS':
      message = '创建成功'
      break

    case 'CREATE_ERROR':
      message = '创建失败'
      type = 'error'
      break

    case 'ADD_SUCCESS':
      message = '添加成功'
      break

    case 'ADD_ERROR':
      message = '添加失败'
      type = 'error'
      break

    case 'EDIT_SUCCESS':
      message = '编辑成功'
      break

    case 'EDIT_ERROR':
      message = '编辑失败'
      type = 'error'
      break
  }

  if (err && err.message) {
    message = `${message}: ${err.message}`
  }

  Message[type](message)
}

export default message
