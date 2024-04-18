import { getLargestArray } from '@/app/utils'
import { fetchAnilistImage, fetchJikanImage, fetchKitsuImage } from '@/app/utils/externalFetchers/externalImageFetcher'

/**
 * Maps the related anime and displayes a horizontal list of related anime and their image.
 *
 * @param {React.PropsWithChildren} root0 - The default react props object.
 * @param {string[]} root0.relatedAnime - An array of URLs containing links to related anime.
 * @returns {React.JSX.Element} The related anime mapper component.
 */
const RelatedAnimeMapper = ({ relatedAnime }: {relatedAnime: string[]}) => {
  let hostName: string = ''
  const relatedAnimeImages: Array<ImageDisplay> = []
  /**
   * Filters the hosts from the related anime URLs.
   *
   * @param {string[]} hosts - The collection of hosts to filter.
   * @param {string} host - The host to filter by.
   * @returns {string[]} The filtered hosts.
   */
  const filterHosts = (hosts: string[], host: string) => {
    return hosts.filter((url) => url.includes(host))
  }
  /**
   * Fetches image URLs from the related anime URLs.
   *
   * @param {string[]} urls - The collection of URLs with an acceptable host to fetchf rom.
   * @param {string} hostName - The name of the host to fetch from.
   */
  const fetchImageUrls = async (urls: string[], hostName: string) => {
    console.log(hostName)
    for (const url of urls) {
      if (hostName === 'anilist.co') {
        relatedAnimeImages.push(await fetchAnilistImage(url))
      } else if (hostName === 'myanimelist.net') {
        // TODO Add an interval to prevent rate limiting
        relatedAnimeImages.push(await fetchJikanImage(url))
      } else if (hostName === 'kitsu.io') {
        relatedAnimeImages.push(await fetchKitsuImage(url))
      }
    }
  }

  const anilistUrls = filterHosts(relatedAnime, 'anilist.co')
  const malUrls = filterHosts(relatedAnime, 'myanimelist.net')
  const kitsuUrls = filterHosts(relatedAnime, 'kitsu.io')
  if (anilistUrls.length !== 0 && malUrls.length !== 0 && kitsuUrls.length !== 0) {
    const largestArray = getLargestArray(anilistUrls, malUrls, kitsuUrls)
    hostName = largestArray[0].split('/')[2]
    fetchImageUrls(largestArray, hostName)
  }
  return (
        <>
        </>
  )
}

export default RelatedAnimeMapper
