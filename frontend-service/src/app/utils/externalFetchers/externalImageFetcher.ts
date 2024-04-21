import { fetchAndThrow } from '..'
import { FailFetchError } from '../Errors/FailFetchError'
import { aniListGraphQlUrl, constructJikanUrl, kitsuBaseUrl } from './baseUrls'

/**
 * Fetches a medium sized image from the Anilist API.
 *
 * @param {string} url - The URL to fetch the image from.
 * @returns {Promise<ImageDisplay>} - The URL of the medium sized image.
 */
export async function fetchAnilistImage (url: string) {
  const id = Number(url.split('/').pop())
  const query = constructQuery()
  const variables = { id }
  const body = JSON.stringify({ query, variables })
  const aniListResponse = await fetchAndHandleResponse(body)
  return { title: aniListResponse.data.Media.title.english || aniListResponse.data.Media.title.romaji, image: aniListResponse.data.Media.coverImage.medium || aniListResponse.data.Media.coverImage.large || aniListResponse.data.Media.coverImage.extraLarge }
}

/**
 * Fetches and handles the response from the Anilist API.
 *
 * @param {BodyInit} body - The request body containing the query and variables.
 * @returns {Promise<JSON>} - The JSON response from the Anilist API.
 */
async function fetchAndHandleResponse (body: BodyInit) {
  const response = await fetch(aniListGraphQlUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json'
    },
    body
  })
  if (!response.ok) {
    throw new FailFetchError('Failed to fetch image from Anilist API')
  }
  return response.json()
}

/**
 * Constructs a query to fetch a medium sized image from the Anilist API.
 *
 * @returns {string} - returns a constructed query.
 */
function constructQuery () {
  return `query ($id: Int) { # Define which variables will be used in the query (id)
        Media (id: $id, type: ANIME) {
          title {
            romaji
          },
         coverImage {
             extraLarge
             medium
             large
         }
        }
      }
      `
}

/**
 * Fetches a medium sized image from the Kitsu API.
 *
 * @param {string} url - A url to extract the ID from.
 * @returns {Promise<ImageDisplay>} The URL of the medium sized image.
 */
export async function fetchKitsuImage (url: string) {
  const id = url.split('/').pop()
  const kitsuResponse = await fetchAndThrow(kitsuBaseUrl + id) as unknown as { data: { attributes: { canonicalTitle: string, posterImage: { medium: string } } } }
  return { title: kitsuResponse.data.attributes.canonicalTitle, image: kitsuResponse.data.attributes.posterImage.medium }
}

/**
 * Fetches a medium sized image from the Jikan API.
 *
 * @param {string} url - A url to extract the ID from.
 * @returns {Promise<ImageDisplay>} The URL of the medium sized image.
 */
export async function fetchJikanImage (url: string): Promise<ImageDisplay> {
  const id = url.split('/').pop()
  const jikanUrl = constructJikanUrl(id as string)
  const jikanResponse = await fetchAndThrow(jikanUrl) as unknown as { data: { title: string, images: { webp: { large_image_url: string} } } }
  return { title: jikanResponse.data.title, image: jikanResponse.data.images.webp.large_image_url }
}
