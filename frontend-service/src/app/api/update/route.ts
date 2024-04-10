import { NextRequest, NextResponse } from 'next/server'
/**
 *
 * @param req
 */
export async function GET (req: NextRequest) {
  const x = await fetch(process.env.BACKEND_URL + '/search/update' as string, {
    // TODO may add cache?
    cache: 'no-cache'
  })
  const y = await x.json()
  console.log(y)
  return NextResponse.json({ message: 'Hello from the update API!' })
}
