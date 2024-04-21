'use client'

import LazyLoad from '@/app/components/LazyLoad'
import SearchForm from '@/app/components/Searcher/components/SearchForm'
import SimpleAnimeBlock from '@/app/components/SimpleAnimeBlock'
import { sortAnimeByKeyword } from '@/app/utils/sortanime'
import Link from 'next/link'
import { useState } from 'react'

/**
 * The search client handles the logic for the search page.
 *
 * @returns {React.JSX.Element} The search client component.
 */
const SearchClient = () => {
  const [notFound, setNotFound] = useState(false)
  const [foundAnime, setFoundAnime] = useState<IAnime[]>([])
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
      body: JSON.stringify({ keyword: searchQuery, searchFields: ['title', 'synonyms'] })
    })
    if (!response.ok) {
      setNotFound(true)
      setFoundAnime([])
      return
    }
    const searchData = await response.json()
    const sortedAnime = sortAnimeByKeyword(searchQuery as string, searchData.data)
    setNotFound(false)
    setFoundAnime(sortedAnime)
  }

  return (
      <>
        <SearchForm
        handleSubmit={handleSubmit}
        placeHolderText="Search for an anime"
        />
        {notFound && <p className='mt-10 text-2xl font-bold'>No Results</p>}
        <div className="flex justify-center flex-row flex-wrap gap-10 mt-10 w-full">
            {foundAnime.map((anime) => (
              <>
              <LazyLoad key={anime.animeId} >
                <Link href={`/anime/${anime.animeId}`}>
                    <SimpleAnimeBlock
                    key={anime.animeId}
                    anime={anime}
                    />
                  </Link>
               </LazyLoad>
              </>
            ))}
        </div>
      </>
  )
}

export default SearchClient
