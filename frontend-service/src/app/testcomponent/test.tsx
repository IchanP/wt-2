'use client'

/**
 * A test button for development.
 *
 * @param {React.PropsWithChildren} root0 - The props.
 * @param {string} root0.endPoint - The endpoint to test.
 * @returns {JSX.Element} The test button
 */
const TestButton = ({ endPoint }: { endPoint: string}): JSX.Element => {
  /**
   * Handles the click event.
   */
  const handleClick = async () => {
    await fetch(endPoint)
  }
  return (
        <div>
            <button className="p-6 mt-5 bg-white text-black" onClick={() => handleClick()}>Test Button</button>
        </div>
  )
}

export default TestButton
