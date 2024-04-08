'use client'

/**
 * A test button for development.
 *
 * @returns {JSX.Element} The test button
 */
const TestButton = () => {
  /**
   * Handles the click event.
   */
  const handleClick = async () => {
    await fetch('/api/search')
  }
  return (
        <div>
            <button className="p-6 mt-5 bg-white text-black" onClick={() => handleClick()}>Test Button</button>
        </div>
  )
}

export default TestButton
