import install from './install'
import directive from './directive'

export interface Size {
  width: number
  height: number
  offsetWidth: number
  offsetHeight: number
}

export default {
  install,
  directive,
}
