'use client'
import dynamic from 'next/dynamic'
import { Data, PlotData } from 'plotly.js'
const Plot = dynamic(() => { return import('react-plotly.js') }, { ssr: false })

/**
 * A time chart component using plotly.
 *
 * @param {React.PropsWithChildren} root0 - The default react props object.
 * @param {Partial<PlotData>[]} root0.data - The data to be displayed on the time chart.
 * @returns {React.JSX.Element} The time chart component.
 */
const TimeChart = ({ data, yearRange }: {data: Partial<PlotData>[], yearRange: Span}): React.JSX.Element => {
  return (
        <>
        <Plot
        data={data as unknown as Data[]}
        layout={{ showlegend: false, width: 1500, title: 'A Time Chart', xaxis: { range: [yearRange.lowest, yearRange.highest], dtick: 1 }, modebar: { orientation: 'v' }, legend: { orientation: 'h' } }}
        config={{ displayModeBar: true }}
        />
        </>
  )
}

export default TimeChart
