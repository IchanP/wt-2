'use client'

import { useRouter } from 'next/navigation'
import ColoredTag from '../../ColoredTag'

/**
 * Client side component for rendering the tags in the sidebar and handling the callback for when a tag is clicked.
 *
 * @param {React.PropsWithChildren} root0 - The default react props object.
 * @param {number} root0.animeYear - The year the anime aired. Used for deciding the year to query the genre data for when a tag is clicked.
 * @param {MappedTag[]} root0.colorTags - The color tags to display.
 * @returns {React.JSX.Element} The sidebar tags component.
 */
const SideBarTags = ({ animeYear, colorTags }: {animeYear: number, colorTags: MappedTag[]}) => {
  const router = useRouter()
  /**
   * The callback function for when a tag is clicked.
   *
   * @param {MappedTag} tag - The values of the tag that was clicked.
   */
  const clickCallback = async (tag: MappedTag) => {
    router.push(`/search?tags=${tag.name}&year=${animeYear}`)
  }
  return (
        <>
        <p ></p>
          {colorTags.map((tag) => (
            <ColoredTag
                key={tag.name}
                tag={tag}
                onClickCallback={clickCallback}
            />
          ))}
        </>
  )
}

export default SideBarTags
