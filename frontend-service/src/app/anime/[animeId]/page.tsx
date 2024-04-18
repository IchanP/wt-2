import ErrorComponentHandler from '@/app/components/ErrorComponentHandler'
import { fetchAndThrow } from '@/app/utils'
import { FailFetchError } from '@/app/utils/Errors/FailFetchError'
import { NoValidSourcesError } from '@/app/utils/Errors/NoValidSourcesError'
import { fetchAnimeExternally } from '@/app/utils/externalApiFetchers'
import { ErrorBoundary } from 'next/dist/client/components/error-boundary'
import { useRouter } from 'next/navigation'

interface URLParam {
    animeId: string;
}
/**
 * An individual anime page that displays detailed information about the anime.
 *
 * @param {React.PropsWithChildren} root0 - The default react props object.
 * @param {URLParam} root0.params - The paramaters as defined by the Next.js router, following /anime in this case.
 * @param {string} root0.params.title - The passed paramater, the title of the anime.
 * @returns {React.JSX.Element} The anime page component.
 */
const AnimePage = async ({ params }: {params: URLParam}): Promise<React.JSX.Element> => {
  const id = decodeURIComponent(params.animeId)
  /**
   * Fetches anime data from external APIs and the internal database.
   * 
   * @returns {Promise<CombinedIAnimeData | IAnime>} - The anime data. If the external API fails, only the internal data is returned.
   */
  const fetchAnimeData = async (): Promise<CombinedIAnimeData | IAnime> => {
    let animeInfo: IAnime | undefined
    try {
      const data = await fetchAndThrow(`${process.env.OWN_BASE_URL}/api/anime/${id}`)
      animeInfo = data.data as IAnime
      const externalAnimeData = await fetchAnimeExternally(animeInfo.sources) as ExternalAnime
      return { anime: animeInfo, externalData: externalAnimeData }
    } catch (e: unknown) {
      if (e instanceof NoValidSourcesError && animeInfo) {
        return animeInfo as IAnime
      }
      throw new Error('Something went wrong while fetching this anime...')
    }
  }
  const animeData = await fetchAnimeData()
  return (

       <>
        <h1>{id}</h1>
      </>
  )
}

export default AnimePage
