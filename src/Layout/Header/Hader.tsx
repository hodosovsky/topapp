import cn from 'classnames'
import { HaderProps } from './Header.props '
import styles from './Header.module.css'
import Logo from '../logo.svg'
import { ButtonIcon } from '@/components/ButtonIcon/ButtonIcon'
import { motion } from 'framer-motion'
import { Sidebar } from '../Sidebar/Sidebar'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'

export const Header = ({ className, ...props }: HaderProps): JSX.Element => {
	const [isOpened, setIsOpened] = useState<boolean>(false)

	const router = useRouter()

	useEffect(() => {
		setIsOpened(false)
	}, [router])

	const variants = {
		opened: { opacity: 1, x: 0, transition: { stiffness: 20 } },
		closed: { opacity: 0, x: '100%' },
	}
	return (
		<header className={cn(className, styles.header)} {...props}>
			<Logo />
			<ButtonIcon
				appearence="white"
				icon="menu"
				onClick={() => setIsOpened(true)}
			/>
			<motion.div
				variants={variants}
				initial={'closed'}
				className={styles.mobileMenu}
				animate={isOpened ? 'opened' : 'closed'}
			>
				<Sidebar />
				<ButtonIcon
					className={styles.menuClose}
					appearence="white"
					icon="close"
					onClick={() => setIsOpened(false)}
				/>
			</motion.div>
		</header>
	)
}
