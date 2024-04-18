import { allowedHosts } from '../../../config/allowedhosts.mjs'
/**
 * Generates a random color for the buttons.
 *
 * @returns {string} The random color as a RGB string.
 */
export function generateRandomColor () {
  const r = Math.floor(Math.random() * 256)
  const g = Math.floor(Math.random() * 256)
  const b = Math.floor(Math.random() * 256)
  return `rgb(${r},${g},${b})`
}

/**
 * Checks if the host is allowed to access the service.
 *
 * @param {string} host - The host to check if it is allowed.
 * @returns {boolean} - Returns true if the host is allowed, false otherwise.
 */
export function isHostAllowed (host: string, title: string): boolean {
  const hostName = new URL(host).hostname
  for (const hosts of allowedHosts) {
    if (hostName === hosts.hostname) {
      return true
    }
  }
  console.log('isHostAllowed: ', title, ' not allowed: ', hostName)
  return false
}
