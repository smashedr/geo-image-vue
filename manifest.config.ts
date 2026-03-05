import { defineManifest } from '@crxjs/vite-plugin'
import pkg from './package.json'

const icons = {
  16: 'public/images/logo16.png',
  32: 'public/images/logo32.png',
  48: 'public/images/logo48.png',
  96: 'public/images/logo96.png',
  128: 'public/images/logo128.png',
}

export default defineManifest({
  manifest_version: 3,
  name: 'GeoImage',
  version: pkg.version,
  description: pkg.description,
  homepage_url: 'https://github.com/cssnr/geo-image',
  icons: icons,
  background: {
    service_worker: 'src/background/index.ts',
    type: 'module',
  },
  action: {
    default_icon: icons,
    default_popup: 'src/popup/index.html',
  },
  options_ui: {
    page: 'src/options/index.html',
    open_in_tab: true,
  },
  permissions: ['contextMenus', 'sidePanel', 'storage'],
  host_permissions: ['*://*/*'],
  side_panel: {
    default_path: 'src/sidepanel/index.html',
  },
  commands: {
    openSidePanel: {
      description: 'Open Side Panel',
      suggested_key: { default: 'Alt+Shift+P' },
    },
    openExtPanel: {
      description: 'Open Extension Panel',
      suggested_key: { default: 'Alt+Shift+W' },
    },
    _execute_action: {
      description: 'Open Popup',
      suggested_key: { default: 'Alt+Shift+A' },
    },
    openOptions: {
      description: 'Open Options',
      suggested_key: { default: 'Alt+Shift+O' },
    },
  },
})
