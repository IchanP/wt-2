import SearchClient from '../components/Searcher/components/SearchClient'
import { sortAnimeByKeyword } from '../utils/sortanime'
interface SearchPageParams {
  searchParams: {
    tags?: string,
    year?: string
    keyword?: string,
    searchFields?: string
  }
}

/**
 * The search page allows for the user to search for anime based on titles and displays the results.
 *
 * @param {SearchPageParams} params - The request object.
 * @returns {React.JSXElement} The search page component.
 */
const SearchPage = async (params: SearchPageParams) => {
  const animeData = []
  // TODO refactor this a bit it's ugly as hell...
  if (params.searchParams.tags && params.searchParams.year) {
    const genreResponse = await fetch(process.env.OWN_BASE_URL + `/api/anime/genre?tags=${params.searchParams.tags}&earliest=${params.searchParams.year}&latest=${params.searchParams.year}`, {
      method: 'GET',
      cache: 'no-cache'
    })
    if (genreResponse.ok) {
      const genreData = await genreResponse.json()
      const sortedAlphabetically = genreData.data.data.sort((a: IAnime, b: IAnime) => a.title.localeCompare(b.title))
      animeData.push(...sortedAlphabetically)
    }
  } else if (params.searchParams.keyword && params.searchParams.searchFields) {
    const searchResponse = await fetch(process.env.OWN_BASE_URL + '/api/anime/search', {
      method: 'POST',
      cache: 'no-cache',
      body: JSON.stringify({ keyword: params.searchParams.keyword, searchFields: params.searchParams.searchFields.split('+') })
    })
    if (searchResponse.ok) {
      const searchData = await searchResponse.json()
      const sortedAnime = sortAnimeByKeyword(params.searchParams.keyword as string, searchData.data)
      animeData.push(...sortedAnime)
    }
  }
  return (
        <div className="flex flex-col items-center justify-between mt-10 w-full">
            <h1 className="text-2xl">Search For An Anime Title</h1>
            <br></br>
            <SearchClient
            animeData={animeData}
            />
        </div>
  )
}

export default SearchPage
