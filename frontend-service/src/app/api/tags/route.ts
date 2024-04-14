import { NextRequest, NextResponse } from 'next/server'

export const dynamic = 'force-dynamic'

/**
 * Fetches all of the tags from the backend API.
 *
 * @returns {Promise<NextResponse>} - Returns a response object.
 */
export async function GET (): Promise<NextResponse> {
  // TODO make it cacheable
  // TODO error handling
  const response = await fetch(process.env.BACKEND_URL + '/tags', { cache: 'no-cache' })
  const data = await response.json()
  return NextResponse.json({ data: data.data })
}

/**
 * Handles the POST request to the tags API.
 *
 * @param {NextRequest} req - The request object containing the tag to be fetched.
 * @returns {Promise<NextResponse>} - Returns a response object.
 */
export async function POST (req: NextRequest): Promise<NextResponse> {
  // TODO error handling check whether tag equals data.tag and throw error if not
  const body = await req.json()
  const tag = body.tag
  const yearRange = body.range as Span
  const response = await fetch(process.env.BACKEND_URL + '/tag' + `?tagname=${tag}&earliest=${yearRange.lowest}&latest=${yearRange.highest}`, {
    method: 'GET'
  })
  const data = await response.json()
  return NextResponse.json({ data: data.data })
}
