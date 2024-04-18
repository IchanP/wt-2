import { isHostAllowed } from '@/app/utils'
import Image from 'next/image'
import { useEffect, useState } from 'react'

/**
 * Displays a very simple overview of the contents of an anime.
 *
 * @param {React.PropsWithChildren} root0 - The default react props object.
 * @param {IAnime} root0.anime - The anime title to be displayed.
 * @returns {React.JSX.Element} The simple anime block component.
 */
const SimpleAnimeBlock = ({ anime, clickCallBack }: {anime: IAnime, clickCallBack: (animeId: number) => void }): React.JSX.Element => {
  const [backgroundColor, setBackgroundColor] = useState<string>('bg-gray-400')
  const fallBackImage = 'https://raw.githubusercontent.com/manami-project/anime-offline-database/master/pics/no_pic.png'
  const [imgSrc, setImgSrc] = useState<string>()

  useEffect(() => {
  /**
   * Dynamically sets the background color of the anime block based on the type of anime.
   *
   * @param {AnimeType} type - The type of the anime.
   * @returns {string} - The background color of the anime block.
   */
    const decideBackgroundColor = (type: AnimeType): string => {
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

    /**
     * Verifies that the application has whitelisted the host.
     * Sets a default image if the host is not whitelisted.
     */
    const verifyHost = () => {
      if (isHostAllowed(anime.picture)) {
        setImgSrc(anime.picture)
      } else {
        setImgSrc(fallBackImage)
      }
    }
    setBackgroundColor(decideBackgroundColor(anime.type))
    verifyHost()
  }, [anime])

  /**
   * Sets the image source to a fallback image if the image fails to load.
   */
  const onImgError = () => {
    // TODO this may trigger on rate limiting, fix this in the future
    setImgSrc(fallBackImage)
  }

  return (
        <div onClick={() => clickCallBack(anime.animeId)} className={backgroundColor + ' w-64 p-6 pt-3 cursor-pointer hover:bg-opacity-80 transition duration-300 ease-in-out'}>
            <Image
            src={imgSrc as string}
            width={225}
            height={332}
            alt={anime.title + ' key visual.'}
            onError={onImgError}
            />
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
