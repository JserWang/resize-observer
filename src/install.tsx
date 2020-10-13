import { App } from '@vue/runtime-core'
import directive from './directive'

type PluginInstallFunction = {
  (app: App): void
  installed?: boolean
}

const install: PluginInstallFunction = (app: App) => {
  if (install.installed) {
    return
  }

  install.installed = true

  app.directive('resize', directive)
}

export default install
