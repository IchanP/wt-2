import Image from 'next/image'
import RoundedRowDiv from '../../RoundedRowDiv'
import React from 'react'
import { buildMappedTags } from '@/app/utils'
import SideBarTags from '../SideBarTags'
import ParagraphOneLiner from '../../ParagraphOneLiner'

/**
 * Displays a sidebar with information about the anime.
 *
 * @param {React.PropsWithChildren} root0 - The default react props object.
 * @param {CombinedIAnimeData} root0.animeData - The object containing the anime data to display.
 * @returns {React.JSX.Element} The anime sidebar component.
 */
const AnimeSidebar = ({ animeData }: {animeData: CombinedIAnimeData}) => {
  const iAnimeData = animeData.anime as IAnime
  const externalAnimeData = animeData.externalData as ExternalAnime | null

  const colorTags: MappedTag[] = buildMappedTags(iAnimeData.tags)

  return (
        <div className="space-y-2 flex flex-col h-full justify-items-start items-center w-3/4 rounded-md">
            <div className="p-2 w-full bg-slate-700 shadow-[8px_5px_5px_3px_rgba(0.1,0.1,0.1,0.1)]">
                <Image
                src={iAnimeData.picture}
                width={300}
                height={400}
                alt={iAnimeData.title}
                />
            </div>
            <RoundedRowDiv maxHeight=''>
               {iAnimeData.animeSeason.year && <ParagraphOneLiner text={`Year: ${iAnimeData.animeSeason.year}`}/> }
               {(iAnimeData.animeSeason.season && iAnimeData.animeSeason.season !== 'UNDEFINED') && <ParagraphOneLiner text={`Season: ${iAnimeData.animeSeason.season}`}/> }
                <ParagraphOneLiner text={`Type: ${iAnimeData.type}`} />
                <ParagraphOneLiner text={`Episodes: ${iAnimeData.episodes}`}/>
                {externalAnimeData?.duration && <ParagraphOneLiner text={`Duration: ${externalAnimeData.duration}`} />}

                {externalAnimeData?.studios &&
                <ParagraphOneLiner text={'Studios: '}>
                    {...externalAnimeData?.studios.map((studio) => (
                    <span key={studio.name}>{studio.name} </span>
                    ))}
                    </ParagraphOneLiner>}

            </RoundedRowDiv>
            <RoundedRowDiv maxHeight='max-h-48' isExpandable={true}>
                    {iAnimeData.synonyms.map((altTitle: string) => (<ParagraphOneLiner key={altTitle} text={altTitle}/>))}
            </RoundedRowDiv>
            <RoundedRowDiv maxHeight='max-h-48' isExpandable={true}>
                    <SideBarTags
                    colorTags={colorTags}
                    />
            </RoundedRowDiv>
        </div>
  )
}

export default AnimeSidebar
