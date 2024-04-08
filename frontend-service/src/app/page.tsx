import TestButton from './testcomponent/test'
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
          <p className="text-2s">Visualization of over 33,000 anime from x to {new Date().getFullYear()}</p>
        <div className="flex flex-col items-center justify-between">
        <TestButton />
        </div>
      </div>
      </div>
    </main>
  )
}
