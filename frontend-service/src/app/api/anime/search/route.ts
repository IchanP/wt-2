import { sortAnimeByKeyword } from '@/app/utils/sortanime'
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
  const title = body.title
  // TODO maybe make it more general purpose so require that the searchFields are passed in the body
  const data = await fetch(process.env.BACKEND_URL + `/api/anime/search?keyword=${title}&searchFields=title+synonyms` as string, {
    // TODO may add cache?
    cache: 'no-cache'
  })
  const parsedData = await data.json()
  const anime = parsedData.data
  if (!anime || anime.length === 0) {
    return new NextResponse(JSON.stringify({
      error: 'Not found',
      message: 'No results were found with the provided title.'
    }), {
      status: 404
    })
  }
  const sortedAnime = sortAnimeByKeyword(title, parsedData.data)
  return NextResponse.json({ data: sortedAnime })
}
