import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import { Html } from 'next/document'
import Head from 'next/head'
import Link from 'next/link'

export default function App({ Component, pageProps }: AppProps): JSX.Element {
	return (
		<>
			<Head>
				<title>MyTop</title>
			</Head>
			<Component {...pageProps} />
		</>
	)
}
