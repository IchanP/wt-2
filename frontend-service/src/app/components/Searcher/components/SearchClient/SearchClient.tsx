'use client'

import LazyLoad from '@/app/components/LazyLoad'
import SearchForm from '@/app/components/Searcher/components/SearchForm'
import SimpleAnimeBlock from '@/app/components/SimpleAnimeBlock'
import { sortAnimeByKeyword } from '@/app/utils/sortanime'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

/**
 * The search client handles the logic for the search page.
 *
 * @param {React.PropsWithChildren} root0 - The default react props object.
 * @param {IAnime} root0.animeData - Optional prop containing the anime data to display.
 * @returns {React.JSX.Element} The search client component.
 */
const SearchClient = ({ animeData }: {animeData?: IAnime[]}) => {
  const router = useRouter()
  const [notFound, setNotFound] = useState(false)
  const [foundAnime, setFoundAnime] = useState<IAnime[]>(Array.isArray(animeData) ? animeData : [])
  /**
   * Handles the form submission by calling API route to fetch data.
   *
   * @param {FormData} data - TODO
   */
  const handleSubmit = async (data: FormData) => {
    const searchFields = 'title+synonyms'
    const searchQuery = data.get('inputField')
    const response = await fetch('api/anime/search', {
      method: 'POST',
      cache: 'no-cache',
      body: JSON.stringify({ keyword: searchQuery, searchFields: searchFields.split('+') })
    })
    if (!response.ok) {
      setNotFound(true)
      setFoundAnime([])
      return
    }
    const searchData = await response.json()
    const sortedAnime = sortAnimeByKeyword(searchQuery as string, searchData.data)
    router.push(`/search?keyword=${searchQuery}&searchFields=title+synonyms`)
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
              <LazyLoad key={anime.animeId} >
                <Link key={anime.animeId} href={`/anime/${anime.animeId}`}>
                    <SimpleAnimeBlock
                    key={anime.animeId}
                    anime={anime}
                    />
                  </Link>
               </LazyLoad>
            ))}
        </div>
      </>
  )
}

export default SearchClient
