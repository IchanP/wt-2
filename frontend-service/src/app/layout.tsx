import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import Link from 'next/link'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Anime Search and Visualization',
  description: 'A visualization of over 33,000 anime from 1907 to 2021.'
}

/**
 * The root layout component.
 *
 * @param {React.PropsWithChildren} root0 - The props.
 * @param {React.ReactNode} root0.children - The children.
 * @returns {JSX.Element} The root layout component.
 */
export default function RootLayout ({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <header className="flex items-center justify-between p-4">
          <div className="flex items-center justify-between gap-5">
            <Link href="/" className="text-2xl font-bold">Tag Visualization</Link>
            <Link href="/search" className="text-2xl font-bold">Search Anime</Link>
          </div>
        </header>
        <main className="flex min-h-screen flex-col items-center justify-between p-24 pt-2">
          <div className="z-10 w-full items-center justify-between font-mono text-sm">
           <div className="flex flex-col w-full items-center justify-between">
              <h1 className="text-4xl font-bold">Anime Data Visualization [Name Pending]</h1>
              <p className="text-2s">Visualization of over 33,000 anime from 1907 to {new Date().getFullYear()}</p>
              <br />
              {children}
            </div>
          </div>
        </main>
      </body>
  </html>
  )
}
