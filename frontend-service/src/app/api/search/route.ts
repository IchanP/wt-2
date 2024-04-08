import { NextRequest, NextResponse } from 'next/server'

/**
 * Handle requests to the search API.
 *
 * @param {NextRequest} req - The request object.
 * @returns {Promise<NextResponse>} The response object.
 */
export async function GET (req: NextRequest) {
  // TODO move this crap out and also change the url name also add a search query and stuff
  console.log(process.env.BACKEND_URL)
  await fetch(process.env.BACKEND_URL as string)
  return NextResponse.json({ message: 'Hello from the search API!' })
}
