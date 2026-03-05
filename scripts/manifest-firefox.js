import fs from 'node:fs'
import path from 'node:path'

const rootPath = process.cwd()
const distManifestPath = path.join(rootPath, 'dist', 'manifest.json')
const firefoxManifestPath = path.join(rootPath, 'manifest-firefox.json')

const distManifest = JSON.parse(fs.readFileSync(distManifestPath, 'utf8'))
// console.log('distManifest:', distManifest)
const manifestFirefox = JSON.parse(fs.readFileSync(firefoxManifestPath, 'utf8'))
// console.log('firefoxManifest:', firefoxManifest)

// Merge Firefox into Chrome
const merged = { ...distManifest, ...manifestFirefox }

// Update permissions
merged.permissions = merged.permissions.filter((p) => p !== 'sidePanel')

// Update web_accessible_resources
// merged.web_accessible_resources.forEach((r) => delete r.use_dynamic_url)

// Update sidebar_action
if ('sidebar_action' in merged) {
    if (!('default_icon' in merged['sidebar_action'])) {
        merged['sidebar_action']['default_icon'] = merged.icons
    }
}

// Delete Chrome keys
delete merged.side_panel

// console.log('merged:', merged)

fs.writeFileSync(distManifestPath, JSON.stringify(merged, undefined, 2))

console.log(`build-firefox.js - Updated for Firefox: ${distManifestPath}`)
