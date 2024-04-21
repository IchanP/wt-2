'use client'

import ColoredTag from '@/app/components/ColoredTag/ColoredTag'

interface SearchProps {
    searchOptions: Array<MappedTag>;
    excluded: Array<MappedTag>;
    onClickCallback: (option: MappedTag) => void;
}

/**
 * A search bar component which displays and filters from results based on passed props.
 *
 * @param {React.PropsWithChildren} root0 - The default react props object.
 * @param {Array<MappedTag>} root0.searchOptions - All of the available search options.
 * @param {Function} root0.onClickCallback - The callback function for when a search option is clicked.
 * @returns {React.JSX.Element} The search bar component.
 */
const OptionTags = ({ searchOptions, onClickCallback, excluded }: SearchProps): React.JSX.Element => {
  return (
        <>
        <div className="flex flex-wrap">
            {searchOptions.filter((option) => !excluded.includes(option)).map((option) => (
                <ColoredTag
                    key={option.name}
                    tag={option}
                    onClickCallback={onClickCallback}
                />
            ))}
        </div>
        </>
  )
}

export default OptionTags
