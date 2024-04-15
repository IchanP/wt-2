'use client'

import { useState } from 'react'
import TestButton from '../testcomponent/test'
import { PlotData } from 'plotly.js'
import dynamic from 'next/dynamic'
const Plot = dynamic(() => { return import('react-plotly.js') }, { ssr: false })

/**
 * The bar chart component.
 *
 * @returns {JSX.Element} The bar chart component.
 */
const BarChart = (): JSX.Element => {
  const [data, setData] = useState<Partial<PlotData>[]>([{ type: 'bar', x: [1, 2, 3], y: [2, 6, 3] }])
  return (
    <>
    <Plot
      data={data}
      layout={{ width: 800, height: 500, title: 'A Fancy Plot' }}
    />
    <TestButton
    text="Bar Chart"
    endPoint="api/search"
    data={setData as StateFunction<Partial<PlotData>>}
    />
    </>
  )
}

export default BarChart
