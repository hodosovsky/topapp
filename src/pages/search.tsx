import { P } from '@/components'

import { withLayout } from '@/Layout/Layout'
import { GetStaticPaths, GetStaticProps } from 'next'
import axios from 'axios'
import { MenuItem } from '../../interfaces/menu.interface'
import { API } from '../../helpers/api'
import { ProductModel } from '../../interfaces/product.interface'
import { TopPageComponent } from '@/page-components'
import { TopPageModel } from '../../interfaces/page.interface'
import { firstLevelMenu } from '../../helpers/helpers'
import { useSearchParams } from 'next/navigation'

function Search({ products, page }: HomeProps): JSX.Element {
	return (
		<TopPageComponent firstCategory={1} page={page} products={products} />
	)
}

export default withLayout(Search)

export const getStaticProps: GetStaticProps<HomeProps> = async () => {
	const firstCategory = 0
	let res: string = ''

	try {
		const { data: menu } = await axios.post<MenuItem[]>(API.topPage.find, {
			firstCategory,
		})

		menu.forEach(el => {
			el.pages.forEach(p => {
				if (p.alias.toLocaleLowerCase().includes('photoshop'))
					res = p.alias
			})
		})

		const { data: page } = await axios.get<TopPageModel>(
			`${API.topPage.byAlias}${res}`
		)

		const { data: products } = await axios.post<ProductModel[]>(
			API.product.find,
			{
				category: page.category,
				limit: 10,
			}
		)

		return {
			props: {
				menu,
				page,
				firstCategory,
				products,
			},
		}
	} catch (error) {
		return {
			notFound: true,
		}
	}
}

interface HomeProps extends Record<string, unknown> {
	menu: MenuItem[]
	products: ProductModel[]
	firstCategory: number
	page: TopPageModel
}
