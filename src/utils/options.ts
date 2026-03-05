import { showToast } from '@/composables/useToast.ts'

export const defaultOptions = {
  authToken: '',
  contextMenu: true,
  showUpdate: false,
}

export type Options = typeof defaultOptions & { [key: string]: unknown }

export async function getOptions(): Promise<Options> {
  let { options } = await chrome.storage.sync.get(['options'])
  options = options || {}
  return options as Options
}

// NOTE: Below is ported from VanillaJS

/**
 * Save Options Callback
 * @function saveOptions
 * @param {UIEvent} event
 */
export async function saveOptions(event: Event) {
  console.debug('saveOptions:', event)
  // const { options } = await chrome.storage.sync.get(['options'])
  const options = await getOptions()
  const target = event.target as HTMLInputElement
  let key = target.id
  let value
  if (target.type === 'radio') {
    key = target.name
    // const radios = document.getElementsByName(key)
    const radios = document.getElementsByName(key) as unknown as HTMLInputElement[]
    for (const input of radios) {
      if (input.checked) {
        value = input.id
        break
      }
    }
  } else if (target.type === 'checkbox') {
    value = target.checked
  } else if (target.type === 'number') {
    const number = Number.parseFloat(target.value)
    let min = Number.parseFloat(target.min)
    let max = Number.parseFloat(target.max)
    if (!Number.isNaN(number) && number >= min && number <= max) {
      target.value = number.toString()
      value = number
    } else {
      target.value = String(options[target.id])
      return
    }
  } else {
    value = target.value
  }
  if (value !== undefined) {
    options[key] = value
    console.log(`Set %c${key}:`, 'color: Khaki', value)
    await chrome.storage.sync.set({ options })
  } else {
    console.warn(`No Value for key: ${key}`)
  }
}

export async function updateOptions() {
  const options = await getOptions()
  console.debug('updateOptions:', options)
  for (let [key, value] of Object.entries(options)) {
    if (value === undefined) {
      console.warn('Value undefined for key:', key)
      continue
    }
    // Option Key should be `radioXXX` and values should be the option IDs
    if (key.startsWith('radio')) {
      key = String(value) //NOSONAR
      value = true //NOSONAR
    }
    // console.debug(`${key}: ${value}`)
    const el = document.getElementById(key) as HTMLInputElement
    if (!el) {
      continue
    }
    if (el.tagName !== 'INPUT') {
      el.textContent = String(value)
    } else if (typeof value === 'boolean') {
      el.checked = value
    } else {
      el.value = String(value)
    }
    // if (el.dataset.related) {
    //   hideShowElement(`#${el.dataset.related}`, value)
    // }
  }
}

// function hideShowElement(selector: string, show: boolean, speed = 'fast') {
//   const element = $(`${selector}`)
//   // const element = document.querySelector(selector) as HTMLElement
//   // console.debug('hideShowElement:', show, element)
//   if (show) {
//     element.show(speed)
//   } else {
//     element.hide(speed)
//   }
// }

export async function copySupport(event: Event) {
  console.debug('copySupport:', event)
  event.preventDefault()
  const manifest = chrome.runtime.getManifest()
  const permissions = await chrome.permissions.getAll()
  const { options } = await getOptions()
  // delete options.authToken

  const local = await chrome.storage.local.get()

  const result = [
    `${manifest.name} - ${manifest.version}`,
    navigator.userAgent,
    `permissions.origins: ${JSON.stringify(permissions.origins)}`,
    `options: ${JSON.stringify(options)}`,
    `local: ${JSON.stringify(local)}`,
  ]
  const commands = await chrome.commands?.getAll()
  if (commands) {
    result.push(`commands: ${JSON.stringify(commands)}`)
  }
  await navigator.clipboard.writeText(result.join('\n'))
  showToast('Support Information Copied.')
}
