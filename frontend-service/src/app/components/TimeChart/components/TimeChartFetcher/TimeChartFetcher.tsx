import { generateRandomColor } from '@/app/utils'
import TimeChartClient from '../TimeChartClient/TimeChartClient'
import { yearRange } from '../constants'
import { PlotData } from 'plotly.js'
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
    const response = await fetch(`${process.env.OWN_BASE_URL}/api/tags`, {
      cache: 'no-cache'
    })
    const data = await response.json()
    const coloredTags: MappedTag[] = data.data.map((tag: string) => ({ tag, color: generateRandomColor() }))
    return coloredTags.sort((a, b) => a.tag.localeCompare(b.tag))
  }

  /**
   * Fetches the total amount of anime from the backend API.
   *
   * @returns {Promise<MappedTag>} - Returns the total amount of anime as a trace.
   */
  const fetchTotal = async (): Promise<Partial<PlotData>> => {
    const response = await fetch(`${process.env.OWN_BASE_URL}/api/total`, {
      method: 'POST',
      cache: 'no-cache',
      body: JSON.stringify({ range: yearRange })
    })
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
