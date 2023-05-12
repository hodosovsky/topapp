import Head from 'next/head'
import Image from 'next/image'
import { Button, Htag, Input, P, Rating, Tag, Textarea } from '@/components'
import { useEffect, useState } from 'react'
import { withLayout } from '@/Layout/Layout'
import { GetStaticProps } from 'next'
import axios from 'axios'
import { MenuItem } from '../../interfaces/menu.interface'
import { API } from '../../helpers/api'

function Home({ menu, firstCategory }: HomeProps): JSX.Element {
	const [rating, setRating] = useState<number>(4)

	return (
		<>
			<Htag tag="h1">{rating}</Htag>
			<Button appearence="primary" arrow="right">
				Узнать подробнее
			</Button>
			<Button appearence="ghost" arrow="down">
				Читать отзыв
			</Button>
			<P>маленький</P>
			<P>средний</P>
			<P size="l">большой</P>
			<Tag>Ghost</Tag>
			<Tag size="m" color="red">
				Red
			</Tag>
			<Tag color="green">Green</Tag>
			<Tag color="primary">Primary</Tag>
			<Rating rating={rating} isEditable setRating={setRating} />
			<Input placeholder="Имя" />
			<Textarea placeholder="Текст отзыва" />
		</>
	)
}

export default withLayout(Home)

export const getStaticProps: GetStaticProps<HomeProps> = async () => {
	const firstCategory = 0
	const { data: menu } = await axios.post<MenuItem[]>(API.topPage.find, {
		firstCategory,
	})

	return {
		props: {
			menu,
			firstCategory,
		},
	}
}

interface HomeProps extends Record<string, unknown> {
	menu: MenuItem[]
	firstCategory: number
}
