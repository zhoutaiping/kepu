import DmAlert from './DmAlert'
import DmData from './DmData'
import DmTable from './DmTable'
import DmToolbar from './DmToolbar'
import PageHeader from './PageHeader'
import DmDialogDrawer from './DmDialogDrawer'
import InputSearch from './InputSearch'
import DmDialog from './DmDialog'
DmData.install = Vue => {
  Vue.component(DmAlert.name, DmAlert)
  Vue.component(DmData.name, DmData)
  Vue.component(DmTable.name, DmTable)
  Vue.component(DmToolbar.name, DmToolbar)
  Vue.component(PageHeader.name, PageHeader)
  Vue.component(DmDialogDrawer.name, DmDialogDrawer)
  Vue.component(InputSearch.name, InputSearch)
  Vue.component(DmDialog.name, DmDialog)
}

export default DmData
