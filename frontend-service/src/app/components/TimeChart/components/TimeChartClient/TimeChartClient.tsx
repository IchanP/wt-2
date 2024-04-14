'use client'

import { useState } from 'react'
import OptionTags from '../OptionTags/OptionTags'
import TimeChart from '../TimeChart/TimeChart'
import { PlotData } from 'plotly.js'
import { buildTimeChartTrace } from '@/app/utils/plotlyTypeBuilder'

/**
 * The client side logic component for the TimeChart component.
 *
 * @param {React.PropsWithChildren} root0 - The default react props object.
 * @param {Array<string>} root0.tags - The tags that are available to be selected.
 * @returns {React.JSX.Element} The TimeChartClient component.
 */
const TimeChartClient = ({ tags }: {tags: Array<string>}): React.JSX.Element => {
  const [excluded, setExcluded] = useState<Array<string>>([])
  const [data, setData] = useState<Partial<PlotData>[]>([])
  const yearRange: Span = { lowest: 1975, highest: new Date().getFullYear() }
  /**
   * Fetches the tag that was selected and sets it as an unselectable tag in the TimeChart component.
   *
   * @param {string} tag - The name of the tag that was selected.
   * @param {string} color - The color of the tag that was selected.
   */
  const setSelectedTag = async (tag: string, color: string | undefined) => {
    const response = await fetch('api/tags', {
      method: 'POST',
      body: JSON.stringify({ tag, range: yearRange })
    })
    if (!response.ok) {
      // TODO handle this
      throw new Error('Failed to fetch tag data')
    }
    const jsonData = await response.json()
    setExcluded([...excluded, tag])
    const newTrace = buildTimeChartTrace(jsonData.data, color as string)
    setData([...data, newTrace]) // Update the type of data and cast newTrace as Data[]
  }
  return (
        <>
        <OptionTags
            searchOptions={tags}
            onClickCallback={setSelectedTag}
            excluded={excluded}
        />
        <TimeChart
         data={data}
         yearRange={yearRange}
        />
        </>
  )
}

export default TimeChartClient
