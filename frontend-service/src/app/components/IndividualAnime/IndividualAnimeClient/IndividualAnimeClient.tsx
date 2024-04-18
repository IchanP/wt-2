import AnimeSidebar from '../AnimeSidebar'
import ParagraphBox from '../ParagraphBox'
import RelatedAnimeMapper from '../RelatedAnimeMapper'

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
<div className="mt-5 min-h-screen w-full font-mono">
    <div className="flex flex-col justify-center items-center w-full bg-slate-900 text-center p-5">
        <h1 className="text-5xl">{animeData.anime.title}</h1>
    </div>
    <div className="bg-neutral-800 min-h-screen w-full flex flex-row ">
        <div className="basis-1/4 bg-slate-900 flex justify-center items-start text-white">
            <AnimeSidebar
              animeData={animeData}
             />
        </div>
        <div className=" basis-3/4 bg-gray-800 flex flex-col gap-24 items-start text-center text-white flex-wrap ">
           {animeData?.externalData?.synopsis && <ParagraphBox
              text={animeData.externalData.synopsis}
              title={'Synopsis'}
            /> }
            <ParagraphBox
            text={''}
            title={'Related Anime'}
            >
              <RelatedAnimeMapper
              relatedAnime={animeData.anime.relatedAnime}
              />
            </ParagraphBox>
        </div>
    </div>
</div>

</>
  )
}

export default IndividualAnimeClient
