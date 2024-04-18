import Image from 'next/image'
import RoundedRowDiv from '../../RoundedRowDiv'
import React from 'react'
import { buildMappedTags } from '@/app/utils'
import SideBarTags from '../SideBarTags'

/**
 * Displays a sidebar with information about the anime.
 *
 * @param {React.PropsWithChildren} root0 - The default react props object.
 * @param {CombinedIAnimeData} root0.animeData - The object containing the anime data to display.
 * @returns {React.JSX.Element} The anime sidebar component.
 */
const AnimeSidebar = ({ animeData }: {animeData: CombinedIAnimeData}) => {
  const colorTags: MappedTag[] = buildMappedTags(animeData.anime.tags)
  const iAnimeData = animeData.anime as IAnime
  return (
        <div className="space-y-2 flex flex-col h-full justify-items-start items-center w-3/4 rounded-md">
            <div className="p-2 w-full bg-slate-700 shadow-[8px_5px_5px_3px_rgba(0.1,0.1,0.1,0.1)]">
                <Image
                src={animeData.anime.picture}
                width={300}
                height={400}
                alt={animeData.anime.title}
                />
            </div>
            <RoundedRowDiv maxHeight=''>
               {iAnimeData.animeSeason.year && <p className='text-lg w-full'>Year: {iAnimeData.animeSeason.year}</p> }
               {(iAnimeData.animeSeason.season && iAnimeData.animeSeason.season !== 'UNDEFINED') && <p className='text-lg w-full'>Season: {iAnimeData.animeSeason.season}</p> }
                <p className='text-lg w-full'>Episodes: {iAnimeData.episodes}</p>
                {animeData?.externalData?.studios &&
                <p className='text-lg w-full'>Studios:
                    {animeData.externalData.studios.map((studio) => (
                        <span key={studio.name}>  {studio.name} </span>
                    ))}
                </p>}
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
