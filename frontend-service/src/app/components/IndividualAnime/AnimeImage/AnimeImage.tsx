import Image from 'next/image'
/**
 * Displays an image and title of the anime provided.
 *
 * @param {React.PropsWithChildren} root0 - The default react props object.
 * @param {IAnime} root0.anime - The anime object containing the source image and title to display.
 * @returns {React.JSX.Element} The anime image component.
 */
const AnimeImage = ({ anime }: {anime: IAnime}) => {
  return (
        <div key={anime.animeId} className="relative flex flex-col items-center">
        <Image src={anime.picture} width={250} height={400} alt={anime.title} objectFit='contain' objectPosition='bottom' className="block w-64 h-auto" />
        <h1 className="absolute bottom-0 left-0 w-full text-center text-white bg-black bg-opacity-60 px-0 py-2 text-lg">
            {anime.title}
        </h1>
    </div>
  )
}

export default AnimeImage
