import { fetchAndThrow } from '@/app/utils'
import { NextRequest, NextResponse } from 'next/server'

export const dynamic = 'force-dynamic'

/**
 * Handle requests to the genre API.
 * Fetches the anime of the specified genre for the passed year range.
 *
 * @param {NextRequest} request - The request object.
 * @returns {Promise<NextResponse>} The response object.
 */
export async function GET (request: NextRequest): Promise<NextResponse> {
  try {
    const earliest = request.nextUrl.searchParams.get('earliest')
    const latest = request.nextUrl.searchParams.get('latest')
    const genre = request.nextUrl.searchParams.get('tags')
    const data = await fetchAndThrow(`${process.env.BACKEND_URL}/api/anime/genre?tags=${genre}&earliest=${earliest}&latest=${latest}`)
    return NextResponse.json({ data })
  } catch (e: unknown) {
    return new NextResponse(JSON.stringify({
      error: 'Not found',
      message: 'No results were found with the provided query.'
    }), {
      status: 404
    })
  }
}
