import { NextResponse } from 'next/server'

export const dynamic = 'force-dynamic'

/**
 * Handle requests to the search API.
 *
 * @returns {Promise<NextResponse>} The response object.
 */
export async function GET () {
  // TODO move this crap out and also change the url name also add a search query and stuff
  // TODO grab search queries from request
  const data = await fetch(process.env.BACKEND_URL + '/search?keyword=Oshi&searchFields=title+synonyms' as string, {
    // TODO may add cache?
    cache: 'no-cache'
  })
  const parsedData = await data.json()
  return NextResponse.json({ data: parsedData.data })
}
