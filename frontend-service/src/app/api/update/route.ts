import { NextResponse } from 'next/server'

export const dynamic = 'force-dynamic'

/**
 * Handles requests to the update API.
 *
 * @returns {NextResponse} - Returns a response object.
 */
export async function GET () {
  const x = await fetch(process.env.BACKEND_URL + '/search/update' as string, {
    cache: 'force-cache'
  })
  const y = await x.json()
  console.log(y)
  return NextResponse.json({ message: 'Hello from the update API!' })
}
