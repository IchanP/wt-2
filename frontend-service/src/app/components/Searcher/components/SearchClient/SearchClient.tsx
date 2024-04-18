'use client'

import LazyLoad from '@/app/components/LazyLoad'
import SearchForm from '@/app/components/Searcher/components/SearchForm'
import SimpleAnimeBlock from '@/app/components/SimpleAnimeBlock'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

/**
 * The search client handles the logic for the search page.
 *
 * @returns {React.JSX.Element} The search client component.
 */
const SearchClient = () => {
  const [notFound, setNotFound] = useState(false)
  const [foundAnime, setFoundAnime] = useState<IAnime[]>([])
  const router = useRouter()
  /**
   * Handles the form submission by calling API route to fetch data.
   *
   * @param {FormData} data - TODO
   */
  const handleSubmit = async (data: FormData) => {
    const searchQuery = data.get('inputField')
    const response = await fetch('api/anime/search', {
      method: 'POST',
      cache: 'no-cache',
      body: JSON.stringify({ title: searchQuery })
    })
    if (!response.ok) {
      setNotFound(true)
      setFoundAnime([])
      return
    }
    const searchData = await response.json()
    setNotFound(false)
    setFoundAnime(searchData.data)
  }

  /**
   * Routes to an individual anime page containing detailed information about the anime.
   *
   * @param {string} titleOfAnime - The title of the anime to route to.
   */
  const routeToAnimePage = (titleOfAnime: number) => {
    router.push('/anime/' + titleOfAnime)
  }

  return (
      <>
        <SearchForm
        handleSubmit={handleSubmit}
        placeHolderText="Search for an anime"
        />
        {notFound && <p className='mt-10 text-2xl font-bold'>No Results</p>}
        <div className="flex flex-row flex-wrap gap-10 mt-10 w-full">
            {foundAnime.map((anime) => (
              <>
              <LazyLoad key={anime.animeId} >
                  <SimpleAnimeBlock
                  key={anime.animeId}
                  anime={anime}
                  clickCallBack={routeToAnimePage}
                  />
               </LazyLoad>
              </>
            ))}
        </div>
      </>
  )
}

export default SearchClient
