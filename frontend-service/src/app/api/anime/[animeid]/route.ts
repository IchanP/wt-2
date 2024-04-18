import { NextRequest, NextResponse } from 'next/server'
interface AnimeIdParams {
  params: {
    animeid: string
  }
}

/**
 * Fetches one anime by its id from the backend API.
 *
 * @param {NextRequest} request - The request object.
 * @param {object} root0 - The parameters object containing the dynamic route parameters.
 * @param {AnimeIdParams} root0.params - The dynamic route parameters, holds the id of the anime to fetch.
 * @returns {NextResponse} - Returns a response object containing the data about the anime.
 */
export async function GET (request: NextRequest, { params }: AnimeIdParams): Promise<NextResponse> {
  // TODO error handling
  const animeId = params.animeid
  const response = await fetch(`${process.env.BACKEND_URL}/api/anime/${animeId}`, {
    cache: 'no-cache'
  })
  if (!response.ok) {
    // TODO throw error
  }
  const data = await response.json()
  return NextResponse.json({ data: data.data })
}
