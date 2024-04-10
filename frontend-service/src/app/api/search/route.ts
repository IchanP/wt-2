import { NextRequest, NextResponse } from 'next/server'

/**
 * Handle requests to the search API.
 *
 * @param {NextRequest} req - The request object.
 * @returns {Promise<NextResponse>} The response object.
 */
export async function GET (req: NextRequest) {
  // TODO move this crap out and also change the url name also add a search query and stuff
  const x = await fetch(process.env.BACKEND_URL + '/search' as string, {
    // TODO may add cache?
    cache: 'no-cache'
  })
  const y = await x.json()
  console.log(y)
  return NextResponse.json({ message: 'Hello from the search API!' })
}
