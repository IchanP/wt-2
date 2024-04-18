import { convertMinutesToHoursAndMinutes, fetchAndThrow } from '../index'
import { NoValidSourcesError } from '../Errors/NoValidSourcesError'
import { constructJikanUrl, kitsuBaseUrl } from './baseUrls'
interface ProductionHateoasLinks {
    attributes: {
        role: string
    },
    relationships: {
        producer: {
            links: {
                related: string
            }
        }
    }
}

/**
 * Fetches anime information from one of the possible external APIs.
 * Currently only supports kitsu.io and myanimelist.net.
 *
 * @param {string[]} options - The options from where data can be fetched. Should be an array of URLs.
 * @returns {Promise<ExternalAnime>} The fetched anime data.
 */
export async function fetchAnimeExternally (options: string[]) {
  try {
    let fetchedExternalAnime
    if (options.some((option) => option.includes('myanimelist'))) {
      const malUrl = options.find((option) => option.includes('myanimelist')) as string
      fetchedExternalAnime = fetchFromJikan(malUrl)
    } else if (options.some((option) => option.includes('kitsu'))) {
      const kitsuUrl = options.find((option) => option.includes('kitsu')) as string
      fetchedExternalAnime = fetchFromKitsu(kitsuUrl)
    }
    return fetchedExternalAnime
  } catch (e: unknown) {
    const err = new NoValidSourcesError('This anime is not available from MAL or Kitsu')
    throw err
  }
}

/**
 * Fetches anime data from the Jikan API.
 *
 * @param {string} source - The source URL, should be a MAL URL containing the ID of the show.
 * @returns {Promise<ExternalAnime>} The anime data.
 */
async function fetchFromJikan (source: string) {
  const malId = source.split('/').pop()

  const jikanUrl = constructJikanUrl(malId as string)

  const jsonData = await fetchAndThrow(jikanUrl)
  return createExternalAnime(jsonData.data)
}

/**
 * Fetches anime data from the Kitsu API.
 *
 * @param {string} source - The source URL from where the data will be fetched.
 * @returns {Promise<ExternalAnime>} The fetched anime data.
 */
async function fetchFromKitsu (source: string): Promise<ExternalAnime> {
  const kitsuId = source.split('/').pop()
  const kitsuUrl = kitsuBaseUrl + kitsuId

  const jsonData = await fetchAndThrow(kitsuUrl)
  const episodeLength = jsonData.data.attributes.episodeLength

  const productionLink = jsonData.data.relationships.animeProductions.links.related
  const kitsuAnime: ExternalAnime = jsonData.data.attributes

  await fetchKitsuStudio(productionLink, kitsuAnime)
  kitsuAnime.duration = convertMinutesToHoursAndMinutes(episodeLength)
  return createExternalAnime(kitsuAnime)
}

/**
 * Creates an external anime object from the fetched response.
 *
 * @param {ExternalAnime} externalAnime The fetched anime data to be converted.
 * @returns {ExternalAnime} The converted anime data.
 */
function createExternalAnime (externalAnime: ExternalAnime): ExternalAnime {
  return {
    synopsis: externalAnime.synopsis,
    studios: externalAnime.studios,
    duration: externalAnime.duration
  }
}

/**
 * The external anime object.
 *
 * @param {ProductionHateoasLinks[]} productionData - Hateoas data and links from the kitsu API.
 * @returns {string | undefined} The studio link, or undefined if no studio link is found.
 */
function findStudioLink (productionData: ProductionHateoasLinks[]): string | undefined {
  for (const element of productionData) {
    if (element.attributes.role === 'studio') {
      return element.relationships.producer.links.related
    }
  }
  return undefined
}

/**
 * Handles the HATEOAS navigation for fetching studio data from the Kitsu API.
 *
 * @param {string} url - The initial URL to fetch the anime production relationships from.
 * @param {ExternalAnime} kitsuAnimeData - The anime data object to append the studio data to.
 * @returns {Promise<void>} The fetched studio data.
 */
async function fetchKitsuStudio (url: string, kitsuAnimeData: ExternalAnime) {
  const productionData = await fetchAndThrow(url)
  const studioLink = findStudioLink(productionData.data)
  const studioName = 'Unknown studio'
  const studio: Studio = { name: studioName, url: studioLink }
  if (studioLink) {
    const studioData = await fetchAndThrow(studioLink as string)
    studio.name = studioData.data.attributes.name
  }
  kitsuAnimeData.studios = [studio]
}
