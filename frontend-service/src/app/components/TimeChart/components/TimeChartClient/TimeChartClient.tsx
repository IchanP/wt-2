'use client'

import { useState } from 'react'
import OptionTags from '../OptionTags/OptionTags'
import TimeChart from '../TimeChart/TimeChart'
import { PlotData } from 'plotly.js'

/**
 * The client side logic component for the TimeChart component.
 *
 * @param {React.PropsWithChildren} root0 - The default react props object.
 * @param {Array<string>} root0.tags - The tags that are available to be selected.
 * @returns {React.JSX.Element} The TimeChartClient component.
 */
const TimeChartClient = ({ tags }: {tags: Array<MappedTag>}): React.JSX.Element => {
  const [excluded, setExcluded] = useState<Array<MappedTag>>([])
  const [data, setData] = useState<Partial<PlotData>[]>([])
  const yearRange: Span = { lowest: 1975, highest: new Date().getFullYear() }
  /**
   * Fetches the tag that was selected and sets it as an unselectable tag in the TimeChart component.
   *
   * @param {MappedTag} tag - The tag that triggered the event.
   */
  const setSelectedTag = async (tag: MappedTag) => {
    const response = await fetch('api/tags', {
      method: 'POST',
      body: JSON.stringify({ tag: tag.tag, range: yearRange, tagColor: tag.color })
    })
    if (!response.ok) {
      // TODO handle this
      throw new Error('Failed to fetch tag data')
    }
    const jsonData = await response.json()
    setExcluded([...excluded, tag])
    setData([...data, jsonData.trace])
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
        <OptionTags
          searchOptions={excluded}
          onClickCallback={() => console.log('clicked')}
          excluded={[]}
        />
        </>
  )
}

export default TimeChartClient
