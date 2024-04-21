'use client'

import { useState } from 'react'

/**
 * Error page for the animeId page.
 * Is displayed when an unhandled occurs such as when the animeId is not found.
 *
 * @param {React.PropsWithChildren} root0 - The default react props object.
 * @param {Error} root0.error - The error that occurred.
 * @returns {React.JSX.Element} The error page.
 */
export default function Error ({ error }: { error: Error & { digest?: string }}) {
  const [errorMessage] = useState(error.message === 'Internal Server Error')
  return (
    <div className="mt-20 flex flex-col items-center justify-center flex-wrap">
      <h2 className='text-8xl'>Oops!</h2>
    <br></br>
    <p className='text-lg'>{errorMessage ? error.message : 'Something unexpected Happened'}</p>
    {errorMessage && <h3 className="text-md">Status: 500</h3>}
    </div>
  )
}
