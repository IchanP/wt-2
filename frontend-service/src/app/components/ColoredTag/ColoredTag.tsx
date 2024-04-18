/**
 * Renders a button with a colored background based on the tags color field.
 * 
 * @param {MappedTag} tag - The tag to be displayed.
 */
const ColoredTag = ({tag, onClickCallback}: {tag: MappedTag, onClickCallback: (tag: MappedTag) => void}) => {
  return (
        <>
        <button key={tag.name} className="m-1 p-1 rounded" style={{ backgroundColor: tag.color }}
                onClick={() => onClickCallback(tag)}>{tag.name}</button>
                </>
  )
}

export default ColoredTag
