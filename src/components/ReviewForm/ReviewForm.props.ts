import { DetailedHTMLProps, HTMLAttributes, ReactNode } from 'react'
import { ReviewModel } from '../../../interfaces/product.interface'

export interface ReviewFormProps
	extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
	productId: string
}
