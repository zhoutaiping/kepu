import consoleDialog from '../mixins/consoleDialog'
import { isDef } from './'

export default function(sfc) {
  sfc.mixins = sfc.mixins || []
  sfc.mixins.push(consoleDialog)

  sfc.methods = sfc.methods || {}
  sfc.methods.isDef = isDef

  return sfc
}
