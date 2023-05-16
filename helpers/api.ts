export const API = {
	topPage: {
		find: process.env.NEXT_PUBLIC_DOMAIN + '/api/top-page/find',
		byAlias: process.env.NEXT_PUBLIC_DOMAIN + '/api/top-page/byAlias/',
	},
	product: {
		find: process.env.NEXT_PUBLIC_DOMAIN + '/api/product/find/',
	},

	author: {
		search: process.env.NEXT_PUBLIC_DOMAIN + '/api-v2/author/textSearch',
	},

	review: {
		createDemo: process.env.NEXT_PUBLIC_DOMAIN + '/api/review/create-demo',
	},
}
