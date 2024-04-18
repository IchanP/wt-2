'use client'
 
import { useEffect } from 'react'
 
export default function Error({error }: { error: Error & { digest?: string }}) {
    console.log('Error:', error.message)
  return (
    <div className="mt-20 flex flex-col items-center justify-center flex-wrap">
      <h2 className='text-8xl'>Oops!</h2>
    <br></br>
    <p className='text-lg'>{error.message === 'Something went wrong while fetching this anime...' || 'Something went wrong on our end!'}</p>
    </div>
  )
}