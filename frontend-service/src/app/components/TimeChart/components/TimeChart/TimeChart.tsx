'use client'
import dynamic from 'next/dynamic'
import { useRouter } from 'next/navigation'
import { Data, PlotData, PlotMouseEvent } from 'plotly.js'
const Plot = dynamic(() => { return import('react-plotly.js') }, { ssr: false })

interface PlotEventData {
  fullData: {
    x: string,
    y: number
    name: string
  }
}

/**
 * A time chart component using plotly.
 *
 * @param {React.PropsWithChildren} root0 - The default react props object.
 * @param {Partial<PlotData>[]} root0.data - The data to be displayed on the time chart.
 * @returns {React.JSX.Element} The time chart component.
 */
const TimeChart = ({ data, yearRange }: {data: Partial<PlotData>[], yearRange: Span}): React.JSX.Element => {
  const router = useRouter()
  /**
   * Handles the click event on a point in the time chart.
   * Redirects the user to a page displaying anime with the selected tag and year combo for the point clicked.
   *
   * @param {PlotEventData} data - The data of the point clicked.
   */
  const onPointClick = (data: PlotEventData) => {
    const tagName = data.fullData.name
    const year = data.x
    router.push('/search?tags=' + tagName + '&year=' + year)
  }
  return (
        <>
          <div className="mt-2">
            <Plot
            data={data as unknown as Data[]}
            onClick={(e: Readonly<PlotMouseEvent>) => onPointClick(e.points[0] as unknown as PlotEventData)}
            layout={{
              width: 1500,
              title: `Popularity chart of tags since ${yearRange.lowest} to ${yearRange.highest}`,
              xaxis: { range: [yearRange.lowest, yearRange.highest], dtick: 1 },
              modebar: { orientation: 'v' },
              legend: { orientation: 'h' }
            }}
            config={{ displayModeBar: true }}
            />
          </div>
        </>
  )
}

export default TimeChart
