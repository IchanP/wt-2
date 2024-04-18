interface URLParam {
    title: string;
}
/**
 * An individual anime page that displays detailed information about the anime.
 *
 * @param {React.PropsWithChildren} root0 - The default react props object.
 * @param {URLParam} root0.params - The paramaters as defined by the Next.js router, following /anime in this case.
 * @param {string} root0.params.title - The passed paramater, the title of the anime.
 * @returns {React.JSX.Element} The anime page component.
 */
const AnimePage = ({ params }: {params: URLParam}): React.JSX.Element => {
  const title = decodeURIComponent(params.title)
  /**
   * Fetches anime data from jikan API.
   */
  const fetchAnimeData = async () => {
		
  }
  return (
       <>
        <h1>{title}</h1>
      </>
  )
}

export default AnimePage
