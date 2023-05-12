import cn from 'classnames'
import { TagProps } from './Tag.props'
import styles from './Tag.module.css'

export const Tag = ({
	size = 's',
	children,
	color = 'ghost',
	href,
	className,
	...props
}: TagProps): JSX.Element => {
	return (
		<div
			className={cn(styles.tag, className, {
				[styles[size]]: size,
				[styles[color]]: color,
			})}
			{...props}
		>
			{href ? <a href={href}>{children}</a> : <> {children}</>}
		</div>
	)
}
