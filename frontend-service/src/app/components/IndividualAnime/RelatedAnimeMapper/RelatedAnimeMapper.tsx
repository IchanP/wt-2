import AnimeImage from '../AnimeImage'

/**
 * Maps the related anime and displayes a horizontal list of related anime and their image.
 *
 * @param {React.PropsWithChildren} root0 - The default react props object.
 * @param {string[]} root0.relatedAnime - An array of URLs containing links to related anime.
 * @returns {React.JSX.Element} The related anime mapper component.
 */
const RelatedAnimeMapper = async ({ relatedAnime }: {relatedAnime: string[]}) => {
  /**
   * Fetches all related anime from the list of URLs.
   *
   * @returns {Promise<IAnime[]>} - A promise containing the list of related anime.
   */
  const fetchAllRelatedAnime = async () => {
    const fetchedAnime: IAnime[] = []
    for (const anime of relatedAnime) {
      const response = await fetch(`${process.env.OWN_BASE_URL}/api/anime/search`, {
        method: 'POST',
        cache: 'no-cache',
        body: JSON.stringify({ keyword: anime, searchFields: ['sources'] })
      })
      if (response.ok) {
        const data = await response.json()
        fetchedAnime.push(...data.data)
      } else {
        continue
      }
    }
    return fetchedAnime
  }

  /**
   * Filters out duplicate anime from the list based on their unique animeId.
   *
   * @param {IAnime[]} animeList - The list of anime to filter.
   * @returns {IAnime[]} - An animelist with only unique anime.
   */
  const filterDuplicates = (animeList: IAnime[]) => {
    return animeList.reduce((acc: IAnime[], current) => {
      const isDuplicate = acc.some((item: IAnime) => item.animeId === current.animeId)
      if (!isDuplicate) {
        acc.push(current)
      }
      return acc
    }, [])
  }
  // TODO these are currently being fetched all at once causing slow loading times for certain pages
  // Do bulk fethcing or lazy fetching to improve performance
  const unfilteredAnime = await fetchAllRelatedAnime()
  const filteredAnime = filterDuplicates(unfilteredAnime)
  return (
        <>
        <div className="flex flex-row gap-x-28 gap-y-2 flex-start flex-wrap">
          {filteredAnime.map((anime) => (
            <AnimeImage key={anime.animeId} anime={anime} />
          ))}
        </div>
        </>
  )
}

export default RelatedAnimeMapper
