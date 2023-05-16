import { ButtonHTMLAttributes, DetailedHTMLProps, ReactNode } from 'react'

export interface ButtonProps
	extends Omit<
		DetailedHTMLProps<
			ButtonHTMLAttributes<HTMLButtonElement>,
			HTMLButtonElement
		>,
		'onAnimationStart' | 'onDragStart' | 'onDragEnd' | 'onDrag' | 'ref'
	> {
	children: ReactNode
	appearence: 'primary' | 'ghost'
	arrow?: 'right' | 'down' | 'none'
}
