import SearchClient from '../components/Searcher/components/SearchClient'

/**
 * The search page allows for the user to search for anime based on titles and displays the results.
 *
 * @returns {React.JSXElement} The search page component.
 */
const SearchPage = () => {
  return (
        <div className="flex flex-col items-center justify-between mt-10 w-full">
            <h1 className="text-2xl">Search For An Anime Title</h1>
            <br></br>
            <SearchClient />
        </div>
  )
}

export default SearchPage
