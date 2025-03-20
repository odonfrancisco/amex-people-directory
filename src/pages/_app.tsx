import '@/src/styles/globals.css'
import { Geist, Geist_Mono } from 'next/font/google'
import { AppProps } from 'next/app'
import Head from 'next/head'

import SideNav from '@/src/components/SideNav'
import { PeopleProvider } from '@/src/context/PeopleContext'

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
})

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
})

export default function RootLayout({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>Amex People Directory</title>
        <meta name="description" content="Created by Francisco Odon" />
        <link rel="icon" href="/favicon.ico" sizes="any" />
      </Head>

      <div className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <div className="flex h-screen flex-col md:flex-row md:overflow-hidden">
          <div className="sm:w-full flex-none md:w-64">
            <SideNav />
          </div>
          <div className="flex flex-grow max-w-full overflow-y-scroll">
            <div className="w-full p-6 md:overflow-y-auto md:p-12">
              <PeopleProvider>
                <Component {...pageProps} />
              </PeopleProvider>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
