import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import { Html } from 'next/document'
import Head from 'next/head'
import Link from 'next/link'

export default function App({
	Component,
	pageProps,
	router,
}: AppProps): JSX.Element {
	return (
		<>
			<Head>
				<title>MyTop</title>
				<meta
					property="og:url"
					content={process.env.NEXT_PUBLIC_DOMAIN + router.asPath}
				/>
				<meta property="og:locale" content="ru_RU" />
			</Head>
			<Component {...pageProps} />
		</>
	)
}
