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
export function isHostAllowed (host: string): boolean {
  const hostName = new URL(host).hostname
  for (const hosts of allowedHosts) {
    if (hostName === hosts.hostname) {
      return true
    }
  }
  return false
}

/**
 * Converts minutes to hours and minutes.
 *
 * @param {number} minutes - The minutes to convert.
 * @returns {string} - The minutes converted to hours and minutes in "1 hr 25 min" format or "25 min" format if less than one hour.
 */
export function convertMinutesToHoursAndMinutes (minutes: number): string {
  const hours = Math.floor(minutes / 60)
  const remainingMinutes = minutes % 60
  if (hours === 0) {
    return `${remainingMinutes} min`
  }
  return `${hours} hr ${remainingMinutes} min`
}

/**
 * Fetches data externally and throws an error if the response is not ok.
 *
 * @param {string} url - The URL from where the data will be fetched.
 * @returns {Promise<JSON>} The fetched JSON data.
 */
export async function fetchAndThrow (url: string): Promise<JSON> {
  const response = await fetch(url, {
    // TODO change this to cache
    cache: 'no-cache'
  })
  if (!response.ok) {
    console.log(response)
    throw new Error('Failed to fetch anime data')
  }
  return response.json()
}

/**
 * Creates an array of MappedTags from an array of strings.
 *
 * @param {string[]} data - The array of strings to be converted to MappedTags.
 * @returns {MappedTag[]} - The created array of MappedTags.
 */
export function buildMappedTags (data: Array<string>): Array<MappedTag> {
  return data.map((tag: string) => ({ name: tag, color: generateRandomColor() }))
}

/**
 *
 * @param arr1
 * @param arr2
 * @param arr3
 */
export function getLargestArray (arr1, arr2, arr3) {
  if (arr1.length >= arr2.length && arr1.length >= arr3.length) {
    return arr1
  } else if (arr2.length >= arr1.length && arr2.length >= arr3.length) {
    return arr2
  } else {
    return arr3
  }
}
