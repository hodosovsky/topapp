import cn from 'classnames'
import { FooterProps } from './Footer.props '
import styles from './Footer.module.css'
import { P } from '@/components'

export const Footer = ({ className, ...props }: FooterProps): JSX.Element => {
	return (
		<footer className={cn(className, styles.footer)} {...props}>
			<P>OwlTop © 2020 - {new Date().getFullYear()} Все права защищены</P>

			<a href="#" target="_blank">
				Пользовательское соглашение
			</a>

			<a href="#" target="_blank">
				Политика конфиденциальности
			</a>
		</footer>
	)
}
