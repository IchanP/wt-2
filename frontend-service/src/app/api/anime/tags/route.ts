import { buildTimeChartTrace } from '@/app/utils/plotlyTypeBuilder'
import { NextRequest, NextResponse } from 'next/server'

export const dynamic = 'force-dynamic'

/**
 * Fetches all of the tags from the backend API.
 *
 * @returns {Promise<NextResponse>} - Returns a response object.
 */
export async function GET (): Promise<NextResponse> {
  try {
    const response = await fetch(process.env.BACKEND_URL + '/api/anime/tags', { cache: 'force-cache' })
    if (!response.ok) {
      throw new Error()
    }
    const data = await response.json()
    return NextResponse.json({ data: data.data })
  } catch (e: unknown) {
    return new NextResponse(JSON.stringify({
      error: 'Internal Server Error',
      message: 'An error occurred while processing the request.'
    }), {
      status: 500
    })
  }
}

/**
 * Handles the POST request to the tags API.
 *
 * @param {NextRequest} req - The request object containing the tag to be fetched.
 * @returns {Promise<NextResponse>} - Returns a response object.
 */
export async function POST (req: NextRequest): Promise<NextResponse> {
  try {
    const body = await req.json()
    const tag = encodeURIComponent(body.tag)
    const tagColor = body.tagColor
    const yearRange = body.range as Span
    const response = await fetch(process.env.BACKEND_URL + '/api/anime/tag' + `?tagname=${tag}&earliest=${yearRange.lowest}&latest=${yearRange.highest}`, {
      method: 'GET',
      cache: 'force-cache'
    })
    if (!response.ok) {
      throw new Error()
    }
    const data = await response.json()
    const newTrace = buildTimeChartTrace(data.data, tagColor)
    return NextResponse.json({ trace: newTrace })
  } catch (e: unknown) {
    return new NextResponse(JSON.stringify({
      error: 'Internal Server Error',
      message: 'An error occurred while processing the request.'
    }), {
      status: 500
    })
  }
}
