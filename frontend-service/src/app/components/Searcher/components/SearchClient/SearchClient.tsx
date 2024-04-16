'use client'

import SearchForm from '@/app/components/Searcher/components/SearchForm'

/**
 * The search client handles the logic for the search page.
 *
 * @returns {React.JSX.Element} The search client component.
 */
const SearchClient = () => {
  /**
   * Handles the form submission by calling API route to fetch data.
   *
   * @param {FormData} data - TODO
   */
  const handleSubmit = async (data: FormData) => {
    console.log(data)
    const searchQuery = data.get('inputField')
    const response = await fetch('api/search', {
      method: 'POST',
      cache: 'no-cache',
      body: JSON.stringify({ title: searchQuery })
    })
  }
  return (
        <>
        <SearchForm
        handleSubmit={handleSubmit}
        placeHolderText="Search for an anime" />
        </>
  )
}

export default SearchClient
