'use server'
/**
 * A simple error component handler which displays a 404 if something goes wrong.
 *1
 * @returns {React.JSX.Element} The error component.
 */
const ErrorComponentHandler = async (): Promise<React.JSX.Element> => {
  return (
        <>
        <h1 className="text-5xl">404 REACT ERROR COMPONENT</h1>
        </>
  )
}

export default ErrorComponentHandler
