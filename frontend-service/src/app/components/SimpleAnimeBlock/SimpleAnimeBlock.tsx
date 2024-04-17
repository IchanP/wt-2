import { useEffect, useState } from 'react'

/**
 * Displays a very simple overview of the contents of an anime.
 *
 * @param {React.PropsWithChildren} root0 - The default react props object.
 * @param {IAnime} root0.anime - The anime title to be displayed.
 * @returns {React.JSX.Element} The simple anime block component.
 */
const SimpleAnimeBlock = ({ anime }: {anime: IAnime}): React.JSX.Element => {
  const [backgroundColor, setBackgroundColor] = useState<string>('bg-gray-400') // Default background color
  useEffect(() => {
  /**
   * Dynamically sets the background color of the anime block based on the type of anime.
   *
   * @param {AnimeType} type - The type of the anime.
   * @returns {string} - The background color of the anime block.
   */
    const decideBackgroundColor = (type: AnimeType) => {
      switch (type) {
        case 'TV':
          return 'bg-orange-950'
        case 'MOVIE':
          return 'bg-teal-950'
        case 'OVA':
          return 'bg-lime-800'
        case 'SPECIAL':
          return 'bg-sky-950'
        case 'ONA':
          return 'bg-violet-800'
        default:
          return 'bg-gray-400'
      }
    }
    setBackgroundColor(decideBackgroundColor(anime.type))
  }, [anime])

  return (
        <div className={backgroundColor + ' w-64 p-6 pt-3'}>
            <div className='h-20 min-w-20'>
               <p className="text-sm whitespace-pre-wrap">{anime.title}</p>
            </div>
                <div className="div pt-2">
                    <p className="text-xs">Year: {anime.animeSeason.year}</p>
                    <p className="text-xs">Episodes: {anime.episodes}</p>
                    <p className="text-xs">Type: {anime.type}</p>
                </div>
            </div>
  )
}

export default SimpleAnimeBlock
