import { Data, PlotData } from 'plotly.js'

/**
 * Builds a trace for a time chart.
 *
 * @param {TagData} data - The data to be displayed on the time chart.
 * @param {string} color - RGB color of the trace.
 * @returns {void} - Returns nothing.
 */
export function buildTimeChartTrace (data: TagData, color: string): Partial<PlotData> {
  const years = [] as number[]
  const totals = [] as number[]
  const sortedArray = data.data.sort((a, b) => parseInt(a.key) - parseInt(b.key))
  for (const bucket of sortedArray) {
    years.push(parseInt(bucket.key))
    totals.push(bucket.doc_count)
  }

  const trace: Data = {
    type: 'scatter',
    mode: 'lines',
    name: data.tag,
    x: [...years],
    y: [...totals],
    line: { color },
    showlegend: false
  }

  return trace
}
