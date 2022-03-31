import { AppProps } from "next/app"
import Head from "next/head"
import { Header } from "../components/Header"
import { SessionProvider as NextAuthProvider } from 'next-auth/react'

import '../styles/global.scss'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <NextAuthProvider session={pageProps.session}>
      <Head>
          <link rel="shortcut icon" href="/images/favicon.png" />
      </Head>
      <Header />
      <Component {...pageProps} />
    </NextAuthProvider>
  )
}

export default MyApp
