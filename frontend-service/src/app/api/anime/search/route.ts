import { NotFoundError } from '@/app/utils/Errors/NotFoundError'
import { NextRequest, NextResponse } from 'next/server'

export const dynamic = 'force-dynamic'

/**
 * Handle requests to the search API.
 *
 * @param {NextRequest} req - The request object which contains body data.
 * @returns {Promise<NextResponse>} The response object.
 */
export async function POST (req: NextRequest): Promise<NextResponse> {
  try {
    const body = await req.json()
    const keyword = body.keyword
    const fields = body.searchFields.join('+')
    const data = await fetch(process.env.BACKEND_URL + `/api/anime/search?keyword=${keyword}&searchFields=${fields}` as string, {
      cache: 'force-cache'
    })
    if (!data.ok) {
      throw new Error('Failed to fetch from backend.')
    }
    const parsedData = await data.json()
    const anime = parsedData.data
    if (!anime || anime.length === 0) {
      throw new NotFoundError('No results found with the provided query.')
    }

    return NextResponse.json({ data: parsedData.data })
  } catch (err : unknown) {
    if (err instanceof NotFoundError) {
      return new NextResponse(JSON.stringify({
        error: 'Not found',
        message: 'No results were found with the provided query.'
      }), {
        status: 404
      })
    } else {
      return new NextResponse(JSON.stringify({
        error: 'Internal Server Error',
        message: 'An error occurred while processing the request.'
      }), {
        status: 500
      })
    }
  }
}
