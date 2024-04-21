import React from 'react'

/**
 * A uniformly styled paragraph, intended for one line of text.
 *
 * @param {React.PropsWithChildren} root0 - The default react props object.
 * @param {string} root0.text - The text to be displayed in the paragraph.
 * @returns {React.JSX.Element} The paragraph one liner component.
 */
const ParagraphOneLiner = ({ children = null, text }: {children?: React.ReactNode, text: string}): React.JSX.Element => {
  return (
        <p className='text-lg w-full'>{text} {children}</p>
  )
}

export default ParagraphOneLiner
