'use client'

import ColoredTag from '../../ColoredTag'

/**
 * Client side component for rendering the tags in the sidebar and handling the callback for when a tag is clicked.
 *
 * @param {React.PropsWithChildren} root0 - The default react props object.
 * @param {MappedTag[]} root0.colorTags - The color tags to display.
 * @returns {React.JSX.Element} The sidebar tags component.
 */
const SideBarTags = ({ colorTags }: {colorTags: MappedTag[]}) => {
  // TODO
  /**
   * The callback function for when a tag is clicked.
   *
   * @param {MappedTag} tag - The values of the tag that was clicked.
   */
  const clickCallback = async (tag: MappedTag) => {
    console.log('Tag clicked')
  }
  // TODO make a limit for the number of tags to display
  return (
        <>
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
