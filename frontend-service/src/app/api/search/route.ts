import { NextRequest, NextResponse } from 'next/server'

export const dynamic = 'force-dynamic'

/**
 * Handle requests to the search API.
 *
 * @param {NextRequest} req - The request object which contains body data.
 * @returns {Promise<NextResponse>} The response object.
 */
export async function POST (req: NextRequest): Promise<NextResponse> {
  // TODO error handling
  const body = await req.json()
  // TODO maybe make it more general purpose so require that the searchFields are passed in the body
  const data = await fetch(process.env.BACKEND_URL + `/api/anime/search?keyword=${body.title}&searchFields=title+synonyms` as string, {
    // TODO may add cache?
    cache: 'no-cache'
  })
  const parsedData = await data.json()
  console.log(parsedData)
  // return NextResponse.json({ data: parsedData.data }) */
  return NextResponse.json({ data: 'xdd' })
}
