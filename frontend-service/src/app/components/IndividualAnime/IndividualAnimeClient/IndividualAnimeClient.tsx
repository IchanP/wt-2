import AnimeSidebar from '../AnimeSidebar'

/**
 * Client component for rendering individual anime pages.
 *
 * @param {React.PropsWithChildren} root0 - The default react props object.
 * @param {IAnime | CombinedIAnimeData} root0.animeData - The object containing the anime data to display.
 * @returns {React.JSX.Element} The individual anime client component.
 */
const IndividualAnimeClient = ({ animeData }: {animeData: CombinedIAnimeData}) => {
  return (
<>
<div className="mt-5 w-full">
    <div className="flex flex-col justify-center items-center w-full bg-slate-900 text-center p-5">
        <h1 className="font-sans text-5xl">{animeData.anime.title}</h1>
    </div>
    <div className="bg-neutral-800 min-h-screen w-full flex flex-row">
        <div className="basis-1/4 bg-slate-900 flex justify-center items-start text-white">
            <AnimeSidebar
              animeData={animeData}
             />
        </div>
        <div className="basis-3/4 bg-gray-800 flex justify-center items-center text-white">
        </div>
    </div>
</div>

</>
  )
}

export default IndividualAnimeClient
