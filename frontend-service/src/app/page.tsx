import TimeChartFetcher from './components/TimeChart/components/TimeChartFetcher/TimeChartFetcher'
/**
 * The main page of the application.
 *
 * @returns {JSX.Element} The main page of the application
 */
export default function Home (): JSX.Element {
  return (
      <div className="flex flex-col items-center justify-between mt-10">
        <TimeChartFetcher />
      </div>
  )
}
