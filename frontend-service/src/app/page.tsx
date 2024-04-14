import BarChart from './components/BarChart'
import TimeChartFetcher from './components/TimeChart/components/TimeChartFetcher/TimeChartFetcher'
/**
 * The main page of the application.
 *
 * @returns {JSX.Element} The main page of the application
 */
export default function Home (): JSX.Element {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="z-10 max-w-5xl w-full items-center justify-between font-mono text-sm">
        <div className="flex flex-col items-center justify-between">
          <h1 className="text-4xl font-bold">Anime Data Visualization [Name Pending]</h1>
          <p className="text-2s">Visualization of over 33,000 anime from 1907 to {new Date().getFullYear()}</p>
        <div className="flex flex-col items-center justify-between">
        <TimeChartFetcher />
        <br/>
        <BarChart />
        </div>
      </div>
      </div>
    </main>
  )
}
