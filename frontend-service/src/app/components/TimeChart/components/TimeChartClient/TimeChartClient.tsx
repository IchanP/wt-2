'use client'

import { useState } from 'react'
import OptionTags from '../OptionTags'
import TimeChart from '../TimeChart'
import { PlotData } from 'plotly.js'
import { yearRange } from '../constants'

/**
 * The client side logic component for the TimeChart component.
 *
 * @param {React.PropsWithChildren} root0 - The default react props object.
 * @param {Array<string>} root0.tags - The tags that are available to be selected.
 * @param {Partial<PlotData>} root0.total - The total amount of anime.
 * @returns {React.JSX.Element} The TimeChartClient component.
 */
const TimeChartClient = ({ tags, total }: {tags: Array<MappedTag>, total: Partial<PlotData> }): React.JSX.Element => {
  const [excluded, setExcluded] = useState<Array<MappedTag>>([])
  const [data, setData] = useState<Partial<PlotData>[]>([total])
  const [showError, setShowError] = useState(false)
  const [errorTagName, setErrorTagName] = useState('')
  /**
   * Fetches the tag that was selected and sets it as an unselectable tag in the TimeChart component.
   *
   * @param {MappedTag} tag - The tag that will be fetched and displayed.
   */
  const setSelectedTag = async (tag: MappedTag) => {
    const response = await fetch('api/anime/tags', {
      method: 'POST',
      body: JSON.stringify({ tag: tag.name, range: yearRange, tagColor: tag.color })
    })
    if (!response.ok) {
      setShowError(true)
      setErrorTagName(tag.name)
      setTimeout(() => {
        setShowError(false)
      }, 4000)
      return
    }
    const jsonData = await response.json()
    setExcluded([...excluded, tag])
    setData([...data, jsonData.trace])
  }

  /**
   * Removes the selected tag from the graph.
   *
   * @param {MappedTag} tag - The tag that will be removed from the graph.
   */
  const removeSelectedTag = (tag: MappedTag) => {
    setExcluded(excluded.filter((excludedTag) => excludedTag.name !== tag.name))
    setData(data.filter((trace) => trace.name !== tag.name))
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
          onClickCallback={removeSelectedTag}
          excluded={[]}
        />
       { showError && <div className="flex flex-col bg-red-950 w-1/2 fixed bottom-0 text-center pt-5 pb-5 rounded-md">
          <p className="text-lg">Something went wrong while fetching {errorTagName} data</p>
        </div> }
        </>
  )
}

export default TimeChartClient
