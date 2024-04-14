'use client'

interface SearchProps {
    searchOptions: Array<string>;
    excluded: Array<string>;
    onClickCallback: (option: string, color?: string) => void;
}

// { searchOptions, excluded }: {searchOptions: Array<string>, excluded: Array<string>}
/**
 * A search bar component which displays and filters from results based on passed props.
 *
 * @param {React.PropsWithChildren} root0 - The default react props object.
 * @param {Array<string>} root0.searchOptions - All of the available search options.
 * @param {Function} root0.onClickCallback - The callback function for when a search option is clicked.
 * @returns {React.JSX.Element} The search bar component.
 */
const OptionTags = ({ searchOptions, onClickCallback, excluded }: SearchProps): React.JSX.Element => {
  /**
   * Generates a random color for the buttons.
   *
   * @returns {string} The random color as a RGB string.
   */
  function generateRandomColor () {
    const r = Math.floor(Math.random() * 256)
    const g = Math.floor(Math.random() * 256)
    const b = Math.floor(Math.random() * 256)
    return `rgb(${r},${g},${b})`
  }
  return (
        <>
        <div className="flex flex-wrap">
            {searchOptions.filter((option) => !excluded.includes(option)).map((option) => (
                <button key={option} className="m-1 p-1 rounded" style={{ backgroundColor: generateRandomColor() }}
                onClick={(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
                  const target = e.target as HTMLButtonElement
                  onClickCallback(option, target.style.backgroundColor)
                }}>{option}</button>
            ))}
        </div>
        </>
  )
}

export default OptionTags
