import { buildMappedTags } from '@/app/utils'
import TimeChartClient from '../TimeChartClient/TimeChartClient'
import { yearRange } from '../constants'
import { PlotData } from 'plotly.js'
export const dynamic = 'force-dynamic'

/**
 * Fetches data and handles certain logic for the time chart.
 *
 * @returns {React.JSX.Element} The time chart component.
 */
const TimeChartFetcher = async (): Promise<React.JSX.Element> => {
  /**
   * Fetches all of the tags from the backend API for searchability.
   *
   * @returns  {Promise<Array<string>>} - Returns the tags in an array of strings.
   */
  const fetchTags = async (): Promise<Array<MappedTag>> => {
    const response = await fetch(`${process.env.OWN_BASE_URL}/api/anime/tags`, {
      cache: 'no-cache'
    })
    if (!response.ok) {
      // Unrecoverable error so we just throw an error and let the error boundary handle it
      throw new Error('Internal Server Error')
    }
    const data = await response.json()
    const coloredTags: MappedTag[] = buildMappedTags(data.data)
    return coloredTags.sort((a, b) => a.name.localeCompare(b.name))
  }

  /**
   * Fetches the total amount of anime from the backend API.
   *
   * @returns {Promise<MappedTag>} - Returns the total amount of anime as a trace.
   */
  const fetchTotal = async (): Promise<Partial<PlotData>> => {
    const response = await fetch(`${process.env.OWN_BASE_URL}/api/anime/total`, {
      method: 'POST',
      cache: 'no-cache',
      body: JSON.stringify({ range: yearRange })
    })
    if (!response.ok) {
      // Unrecoverable error so we just throw an error and let the error boundary handle it
      throw new Error('Internal Server Error')
    }
    const data = await response.json()
    return data.trace
  }

  const totalAnime = await fetchTotal()
  const allTags = await fetchTags()
  return (
    <>
    <TimeChartClient
      tags={allTags}
      total={totalAnime}
    />
  </>
  )
}

export default TimeChartFetcher
