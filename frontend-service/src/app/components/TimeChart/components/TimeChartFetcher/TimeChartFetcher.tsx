import TimeChartClient from '../TimeChartClient/TimeChartClient'

/**
 * Fetches data and handles certain logic for the time chart.
 *
 * @returns {React.JSX.Element} The time chart component.
 */
const TimeChartFetcher = async (): Promise<React.JSX.Element> => {
  // TODO maybe directly call backend here
  /**
   * Fetches all of the tags from the backend API for searchability.
   *
   * @returns  {Promise<Array<string>>} - Returns the tags in an array of strings.
   */
  const fetchTags = async (): Promise<Array<string>> => {
    const response = await fetch(`${process.env.OWN_BASE_URL}/api/tags`, {
      cache: 'no-cache'
    })
    const data = await response.json()
    return data.data
  }

  const allTags = await fetchTags()
  return (
    <>
    <TimeChartClient
      tags={allTags}
    />
  </>
  )
}

export default TimeChartFetcher
