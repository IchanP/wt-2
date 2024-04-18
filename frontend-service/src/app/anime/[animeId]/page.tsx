import { fetchAnimeExternally } from '@/app/utils/externalApiFetchers'

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
const AnimePage = async ({ params }: {params: URLParam}): React.JSX.Element => {
  const id = decodeURIComponent(params.animeId)
  /**
   * Fetches anime data from jikan API.
   */
  const fetchAnimeData = async () => {
    const response = await fetch(`${process.env.OWN_BASE_URL}/api/anime/${id}`, {
      cache: 'no-cache'
    })
    if (!response.ok) {
      // TODO throw error
    }
    const data = await response.json()
    const animeInfo = data.data as IAnime
    const externalAnimeData = await fetchAnimeExternally(animeInfo.sources)
    console.log(externalAnimeData)
    // TODO handle error if NoValidSourcesError is thrown
  }
  await fetchAnimeData()
  return (
       <>
        <h1>{id}</h1>
      </>
  )
}

export default AnimePage
