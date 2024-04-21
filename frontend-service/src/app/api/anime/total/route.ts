import { buildTimeChartTrace } from '@/app/utils/plotlyTypeBuilder'
import { NextRequest, NextResponse } from 'next/server'

export const dynamic = 'force-dynamic'

/**
 * Fetches the number of total anime by year.
 *
 * @param {NextRequest} req - The request object containing the range of years.
 * @returns {Promise<NextResponse>} - Returns a response object containing the trace in the body.
 */
export async function POST (req: NextRequest): Promise<NextResponse> {
  try {
    const body = await req.json()
    const yearRange = body.range
    const response = await fetch(process.env.BACKEND_URL + '/api/anime/count' + `?earliest=${yearRange.lowest}&latest=${yearRange.highest}`, {
      method: 'GET',
      cache: 'force-cache'
    })
    if (!response.ok) {
      throw new Error()
    }
    const data = await response.json()
    const blackColor = 'rgb(0, 0, 0)'
    const totalTrace = buildTimeChartTrace(data.data, blackColor)
    totalTrace.showlegend = true
    return NextResponse.json({ trace: totalTrace })
  } catch (e: unknown) {
    return new NextResponse(JSON.stringify({
      error: 'Internal Server Error',
      message: 'An error occurred while processing the request.'
    }), {
      status: 500
    })
  }
}
