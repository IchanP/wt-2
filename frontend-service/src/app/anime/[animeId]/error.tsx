'use client'

/**
 * Error page for the animeId page.
 * Is displayed when an unhandled occurs such as when the animeId is not found.
 *
 * @param {React.PropsWithChildren} root0 - The default react props object.
 * @param {Error} root0.error - The error that occurred.
 * @returns {React.JSX.Element} The error page.
 */
export default function Error ({ error }: { error: Error & { digest?: string }}) {
  console.log('Error:', error.message)
  return (
    <div className="mt-20 flex flex-col items-center justify-center flex-wrap">
      <h2 className='text-8xl'>Oops!</h2>
    <br></br>
    <p className='text-lg'>{error.message === 'Something went wrong while fetching this anime...' || 'Something went wrong on our end!'}</p>
    </div>
  )
}
