/**
 * Renders a paragraph of synopsis text, formatted for easy reading.
 *
 * @param {React.PropsWithChildren} root0 - The default react props object.
 * @param {string} root0.text - The text to be displayed in the paragraph.
 * @param {string} root0.title - The title of the paragraph
 * @param {React.ReactNode} root0.children - The children to be displayed in the paragraph.
 * @returns {React.JSX.Element} The synopsis field component.
 */
const ParagraphBox = ({ text, title, children = null }: {text: string, title: string, children?: React.ReactNode}): React.JSX.Element => {
  return (
        <div className="flex flex-column justify-center items-center w-full flex-wrap">
            <h1 className="pl-7 pb-2 pt-6 text-3xl border-b-4 w-full border-slate-700">{title}</h1>
            <div className="text-left flex justify-items-start mt-8">
                <p className="tracking-wider font-sans pl-10 text-lg">{text}</p>
                {children}
            </div>
        </div>
  )
}

export default ParagraphBox
