import { P } from '@/components'
import { withLayout } from '@/Layout/Layout'
import { GetStaticPaths, GetStaticProps, GetStaticPropsContext } from 'next'
import axios from 'axios'
import { MenuItem } from '../../../interfaces/menu.interface'
import { firstLevelMenu } from '../../../helpers/helpers'
import { ParsedUrlQuery } from 'querystring'
import { API } from '../../../helpers/api'

function Type({ firstCategory }: TypeProps): JSX.Element {
	return (
		<>
			<P size="l">Type: {firstCategory}</P>
		</>
	)
}

export default withLayout(Type)

export const getStaticPaths: GetStaticPaths = async () => {
	return {
		paths: firstLevelMenu.map(m => '/' + m.route),
		fallback: true,
	}
}

export const getStaticProps: GetStaticProps<TypeProps> = async ({
	params,
}: GetStaticPropsContext<ParsedUrlQuery>) => {
	if (!params) {
		return {
			notFound: true,
		}
	}

	const firstCatgoryItem = firstLevelMenu.find(m => m.route === params.type)

	if (!firstCatgoryItem) {
		return {
			notFound: true,
		}
	}

	const { data: menu } = await axios.post<MenuItem[]>(API.topPage.find, {
		firstCategory: firstCatgoryItem.id,
	})

	return {
		props: {
			menu,
			firstCategory: firstCatgoryItem.id,
		},
	}
}

interface TypeProps extends Record<string, unknown> {
	menu: MenuItem[]
	firstCategory: number
}
