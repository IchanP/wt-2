'use client'
import { PlotData } from 'plotly.js'

/**
 * A test button for development.
 *
 * @param {React.PropsWithChildren} root0 - The props.
 * @param {string} root0.endPoint - The endpoint to test.
 * @param {StateFunction<Partial<PlotData>>} root0.data - The data state passed from the chart.
 * @returns {JSX.Element} The test button
 */
const TestButton = ({ text, endPoint, data }: { text: string, endPoint: string, data: StateFunction<Partial<PlotData>>}): JSX.Element => {
  /**
   * Handles the click event.
   */
  const handleClick = async () => {
    // TODO The logic done here should be done on the serverside of nextjs
    console.log(endPoint)
    const response = await fetch(endPoint)
    const json = await response.json()
    const newData: Partial<PlotData>[] = [
      { type: 'bar', x: [], y: [] }
    ]
    for (let i = 0; i < json.data.length; i++) {
      // Typescript complains about y and x being possibly undefined
      if (newData[0].y !== undefined && newData[0].x !== undefined) {
        newData[0].y[i] = json.data[i].doc_count
        newData[0].x[i] = json.data[i].key
      }
    }
    data(newData)
  }

  return (
        <div>
            <button className="p-6 mt-5 bg-white text-black" onClick={() => handleClick()}>{text}</button>
        </div>
  )
}

export default TestButton
